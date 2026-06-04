'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    setError(''); setDone(true)
    setTimeout(() => router.push('/login'), 2500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="glass-panel rounded-xl p-md space-y-md">
      <Link href="/login" className="flex items-center gap-1 text-label-sm text-on-surface-variant hover:text-on-surface">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-primary" /></div>
        <div><h1 className="font-sans font-black text-headline-md text-on-surface">New password</h1></div>
      </div>
      {done ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-md">
          <ShieldCheck className="w-12 h-12 text-on-tertiary-container mx-auto mb-sm" />
          <p className="font-mono text-label-md text-on-tertiary-container uppercase tracking-wider">Password updated</p>
          <p className="text-label-sm text-on-surface-variant mt-xs">Redirecting to login...</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-sm">
          <Input id="password" type="password" label="New Password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          <Input id="confirm" type="password" label="Confirm Password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} error={error} />
          <Button type="submit" variant="primary" size="md" className="w-full">Update Password</Button>
        </form>
      )}
    </motion.div>
  )
}