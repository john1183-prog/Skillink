'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { useAuthStore } from '@/lib/store/authStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Button } from '@/components/ui/Button'
import { Github, Linkedin, Globe, Save, ArrowLeft } from 'lucide-react'

export default function EditProfilePage() {
  const router   = useRouter()
  const { user } = useAuthStore()

  const [form, setForm] = useState({
    name:       user?.name ?? 'Amara Okonkwo',
    bio:        'Final-year EEE student passionate about data, embedded systems and building tools that solve real problems.',
    department: 'Electrical & Electronics Engineering',
    level:      '300L',
    gpa:        '4.23',
    github:     'github.com/amara-dev',
    linkedin:   'linkedin.com/in/amaraokonkwo',
    website:    '',
  })

  const [saved, setSaved] = useState(false)

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const save = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); router.push('/profile') }, 1200)
  }

  const Field = ({ label, field, placeholder, icon: Icon }: {
    label: string; field: keyof typeof form; placeholder?: string; icon?: React.ElementType
  }) => (
    <div className="space-y-xs">
      <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />}
        <input
          value={form[field]}
          onChange={handle(field)}
          placeholder={placeholder}
          className={`w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 focus:bg-surface-container-low transition-all ${Icon ? 'pl-9' : ''}`}
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-md pb-xl">
      <FadeSlideIn>
        <button onClick={() => router.push('/profile')}
          className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface text-body-sm transition-colors mb-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </button>
      </FadeSlideIn>

      {/* Personal info */}
      <FadeSlideIn delay={0.05}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Personal Info</h2>

          <Field label="Full Name"    field="name" />

          <div className="space-y-xs">
            <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Bio</label>
            <textarea
              value={form.bio}
              onChange={handle('bio')}
              rows={3}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 focus:bg-surface-container-low transition-all resize-none"
            />
          </div>
        </div>
      </FadeSlideIn>

      {/* Academic */}
      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Academic Details</h2>
          <Field label="Department" field="department" />
          <div className="grid grid-cols-2 gap-sm">
            <Field label="Level" field="level" placeholder="e.g. 300L" />
            <Field label="GPA"   field="gpa"   placeholder="e.g. 4.50" />
          </div>
        </div>
      </FadeSlideIn>

      {/* Social */}
      <FadeSlideIn delay={0.15}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Links</h2>
          <Field label="GitHub"   field="github"   icon={Github}   placeholder="github.com/username" />
          <Field label="LinkedIn" field="linkedin" icon={Linkedin} placeholder="linkedin.com/in/username" />
          <Field label="Website"  field="website"  icon={Globe}    placeholder="yourportfolio.com" />
        </div>
      </FadeSlideIn>

      {/* Save */}
      <FadeSlideIn delay={0.2}>
        <motion.div animate={saved ? { scale: [1, 0.97, 1] } : {}}>
          <Button variant="primary" size="lg" onClick={save}
            className="w-full flex items-center justify-center gap-sm">
            {saved
              ? <><Save className="w-4 h-4" /> Saved!</>
              : <><Save className="w-4 h-4" /> Save Changes</>}
          </Button>
        </motion.div>
      </FadeSlideIn>
    </div>
  )
}
