'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Eye, EyeOff, Shield, Smartphone, Monitor, LogOut } from 'lucide-react'

const SESSIONS = [
  { device: 'Android — Chrome',    location: 'Akure, NG', time: 'Active now',     current: true },
  { device: 'Windows — Firefox',  location: 'Lagos, NG',  time: '2 hours ago',    current: false },
]

export default function SecuritySettingsPage() {
  const router = useRouter()
  const [showCurrent,  setShowCurrent]  = useState(false)
  const [showNew,      setShowNew]      = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)
  const [twoFA,        setTwoFA]        = useState(false)
  const [saved,        setSaved]        = useState(false)

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })

  const PasswordField = ({
    label, field, show, toggle
  }: { label: string; field: keyof typeof pw; show: boolean; toggle: () => void }) => (
    <div className="space-y-xs">
      <label className="block font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={pw[field]}
          onChange={e => setPw(p => ({ ...p, [field]: e.target.value }))}
          className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-sm py-xs pr-10 text-body-md text-on-surface focus:outline-none focus:border-primary/60 focus:bg-surface-container-low transition-all"
        />
        <button onClick={toggle} type="button"
          className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-md pb-xl">
      <FadeSlideIn>
        <button onClick={() => router.push('/settings')} className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface text-body-sm transition-colors mb-xs">
          <ArrowLeft className="w-4 h-4" /> Settings
        </button>
      </FadeSlideIn>

      {/* Change password */}
      <FadeSlideIn delay={0.06}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card space-y-md">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Change Password</h2>
          <PasswordField label="Current Password" field="current" show={showCurrent} toggle={() => setShowCurrent(p => !p)} />
          <PasswordField label="New Password"     field="next"    show={showNew}     toggle={() => setShowNew(p => !p)} />
          <PasswordField label="Confirm Password" field="confirm" show={showConfirm} toggle={() => setShowConfirm(p => !p)} />

          <Button variant="primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500) }}
            className="w-full flex items-center justify-center gap-sm">
            <Shield className="w-4 h-4" />
            {saved ? 'Password Updated!' : 'Update Password'}
          </Button>
        </div>
      </FadeSlideIn>

      {/* 2FA */}
      <FadeSlideIn delay={0.12}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <Smartphone className="w-5 h-5 text-on-surface-variant" />
              <div>
                <p className="font-medium text-body-md text-on-surface">Two-Factor Authentication</p>
                <p className="text-body-sm text-on-surface-variant">SMS or authenticator app</p>
              </div>
            </div>
            {/* Toggle */}
            <motion.button
              onClick={() => setTwoFA(p => !p)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${twoFA ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <motion.div
                animate={{ x: twoFA ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow"
              />
            </motion.button>
          </div>
          <AnimatePresence>
            {twoFA && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="text-body-sm text-primary mt-sm overflow-hidden">
                2FA is enabled. You'll receive a code on your registered phone number when signing in.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </FadeSlideIn>

      {/* Active sessions */}
      <FadeSlideIn delay={0.18}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Active Sessions</h2>
          <div className="space-y-xs">
            {SESSIONS.map((s, i) => (
              <div key={i} className={`flex items-center gap-sm p-sm rounded-lg ${s.current ? 'bg-primary/5 border border-primary/20' : 'bg-surface-container border border-outline-variant/10'}`}>
                <Monitor className="w-4 h-4 text-on-surface-variant shrink-0" />
                <div className="flex-1">
                  <p className="text-body-md font-medium text-on-surface">{s.device}</p>
                  <p className="text-label-sm text-on-surface-variant">{s.location} · {s.time}</p>
                </div>
                {s.current
                  ? <span className="text-label-sm text-primary font-semibold">Current</span>
                  : <button className="text-label-sm text-error hover:underline"><LogOut className="w-3.5 h-3.5" /></button>}
              </div>
            ))}
          </div>
          <button className="mt-sm text-label-sm text-error hover:underline w-full text-left">
            Sign out of all other sessions
          </button>
        </div>
      </FadeSlideIn>
    </div>
  )
}
