import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type Payload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string // honeypot
}

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10
const clients: Record<string, { count: number; first: number }> = {}

function rateLimit(ip: string) {
  const now = Date.now()
  const rec = clients[ip] || { count: 0, first: now }
  if (now - rec.first > RATE_LIMIT_WINDOW) {
    clients[ip] = { count: 1, first: now }
    return true
  }
  rec.count += 1
  clients[ip] = rec
  return rec.count <= RATE_LIMIT_MAX
}

function getIp(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()

  return 'unknown'
}

async function sendWithSMTP(to: string, from: string, subject: string, text: string, replyTo?: string) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = (process.env.SMTP_SECURE === 'true') || false

  if (!host || !user || !pass) throw new Error('SMTP not configured')

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // TLS options can be added if needed:
    // tls: { rejectUnauthorized: false },
  })

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    replyTo: replyTo || from,
  })

  return info
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit' }, { status: 429 })
  }

  let body: Payload = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const subject = (body.subject || '').trim()
  const message = (body.message || '').trim()
  const website = (body.website || '').trim() // honeypot

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (website) {
    // honeypot filled -> treat as spam
    return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
  }

  const to = process.env.CONTACT_TO_EMAIL || 'anuragjena14@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com'
  const subjectLine = subject ? `${subject} — ${name}` : `New contact from ${name}`

  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendWithSMTP(to, from, subjectLine, text, email)
    } else {
      // no SMTP configured — dev fallback: log to server console
      console.log('[contact] SMTP not configured — logging payload:', { name, email, subject, message })
    }

    return NextResponse.json({ message: 'Message sent' })
  } catch (err: any) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
