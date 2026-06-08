'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'

export default function AccountSettingsPage() {
  const router   = useRouter()
  const { user, logout } = useAuthStore()

  const [form, setForm] = useState({
    name:      user?.name  ?? 'Amara Okonkwo',
    email:     user?.email ?? 'amara@futa.edu.ng',
    phone:     '+234 810 000 0000',
    language:  'English',
    timezone:  'WAT (UTC+1)',
  })

  const [saved, setSaved] = useState(false)
  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const Field = ({ label, field, type = 'text' }: { label: string; field: keyof typeof form; type?: string }) => (
    <div className="space-y-xs">
      <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={handle(field)}
        className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs text-body-md text-on-surface focus:outline-none focus:border-primary/60 focus:bg-surface-container-low transition-all"
      />
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-md pb-xl">
      <FadeSlideIn>
        <button onClick={() => router.push('/settings')} className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface text-body-sm transition-colors mb-xs">
          <ArrowLeft className="w-4 h-4" /> Settings
        </button>
      </FadeSlideIn>

      <FadeSlideIn delay={0.06}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Personal Info</h2>
          <Field label="Full Name" field="name" />
          <Field label="Email Address" field="email" type="email" />
          <Field label="Phone Number" field="phone" type="tel" />
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.12}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Preferences</h2>
          <div className="space-y-xs">
            <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Language</label>
            <select value={form.language} onChange={handle('language')}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs text-body-md text-on-surface focus:outline-none focus:border-primary/60 transition-all">
              <option>English</option>
              <option>Yoruba</option>
              <option>Igbo</option>
              <option>Hausa</option>
            </select>
          </div>
          <div className="space-y-xs">
            <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Timezone</label>
            <select value={form.timezone} onChange={handle('timezone')}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs text-body-md text-on-surface focus:outline-none focus:border-primary/60 transition-all">
              <option>WAT (UTC+1)</option>
              <option>GMT (UTC+0)</option>
            </select>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.18}>
        <Button variant="primary" size="lg" onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); router.push('/settings') }, 1200) }}
          className="w-full flex items-center justify-center gap-sm">
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </FadeSlideIn>

      <FadeSlideIn delay={0.22}>
        <div className="bg-surface-container-lowest border border-error/20 rounded-xl p-md shadow-card">
          <h2 className="font-mono text-label-md text-error uppercase tracking-wider mb-sm">Danger Zone</h2>
          <p className="text-body-sm text-on-surface-variant mb-sm">Deleting your account is permanent and cannot be undone.</p>
          <button onClick={() => { logout(); router.push('/login') }}
            className="flex items-center gap-xs text-error text-label-md hover:underline">
            <Trash2 className="w-3.5 h-3.5" /> Delete Account
          </button>
        </div>
      </FadeSlideIn>
    </div>
  )
}
