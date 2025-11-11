'use client'

import { JSX, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
  website?: string // honeypot field (should be empty)
}

export default function Contact(): JSX.Element {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    // basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, msg: 'Please fill name, email and message.' })
      return
    }

    // honeypot check
    if (form.website && form.website.trim() !== '') {
      setStatus({ ok: false, msg: 'Spam detected.' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ ok: true, msg: data.message || 'Message sent.' })
        setForm({ name: '', email: '', subject: '', message: '', website: '' })
      } else {
        setStatus({ ok: false, msg: data.error || 'Failed to send.' })
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Network error.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-20" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold text-fg">Contact</h2>
      <p className="text-muted-foreground mt-2 max-w-2xl">Want to work together or have a question? Send a message below.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="glass p-6 rounded-lg" aria-label="Contact form">
          <label className="text-sm text-muted-foreground">Name</label>
          <Input value={form.name} onChange={update('name')} aria-label="Name" required />

          <label className="mt-3 text-sm text-muted-foreground">Email</label>
          <Input value={form.email} onChange={update('email')} aria-label="Email" type="email" required />

          <label className="mt-3 text-sm text-muted-foreground">Subject</label>
          <Input value={form.subject} onChange={update('subject')} aria-label="Subject" />

          <label className="mt-3 text-sm text-muted-foreground">Message</label>
          <Textarea value={form.message} onChange={update('message')} aria-label="Message" required rows={6} />

          {/* honeypot field - visually hidden */}
          <input type="text" name="website" value={form.website} onChange={(e) => setForm(f => ({...f, website: e.target.value}))} className="sr-only" tabIndex={-1} autoComplete="off" />

          <div className="mt-4 flex items-center gap-3">
            <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send message'}</Button>
            <a className="cta-outline inline-flex items-center" href="mailto:anuragjena14@gmail.com">Email directly</a>
          </div>

          {status && (
            <div className={`mt-4 text-sm ${status.ok ? 'text-green-600' : 'text-destructive'}`} role="status">
              {status.msg}
            </div>
          )}
        </form>

        <div className="glass p-6 rounded-lg">
          <h3 className="text-lg font-medium text-fg">Reach me</h3>
          <p className="mt-2 text-sm text-muted-foreground">Email: <a href="mailto:anuragjena14@gmail.com" className="hover:underline">anuragjena14@gmail.com</a></p>
          <p className="mt-4 text-sm text-muted-foreground">Or connect via GitHub / LinkedIn — links in the header.</p>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-fg">Availability</h4>
            <p className="text-sm text-muted-foreground mt-1">Open to internships and junior-mid level roles. Response time ~2 business days.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
