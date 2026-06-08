'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Mail } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-xl p-md space-y-md">
      <Link href="/login" className="flex items-center gap-1 text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
        <ArrowLeft className="w-3 h-3" /> Back to login
      </Link>
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><Mail className="w-4 h-4 text-primary" /></div>
        <div><h1 className="font-sans font-black text-headline-md text-on-surface">Reset password</h1><p className="text-label-sm text-on-surface-variant">We'll send a reset link to your email</p></div>
      </div>
      {sent ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-md">
          <p className="font-mono text-label-md text-tertiary uppercase tracking-wider">Check your inbox</p>
          <p className="text-body-md text-on-surface-variant mt-xs">Reset link sent to {email}</p>
        </motion.div>
      ) : (
        <div className="space-y-sm">
          <Input id="email" type="email" label="Email Address" placeholder="amara@futa.edu.ng" value={email} onChange={e => setEmail(e.target.value)} />
          <Button variant="primary" size="md" className="w-full" onClick={() => email && setSent(true)}>Send Reset Link</Button>
        </div>
      )}
    </motion.div>
  )
}