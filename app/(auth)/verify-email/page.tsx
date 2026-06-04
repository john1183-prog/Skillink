'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function VerifyEmailPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="glass-panel rounded-xl p-md space-y-md text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-primary" />
      </motion.div>
      <div>
        <h1 className="font-sans font-black text-headline-md text-on-surface">Check your email</h1>
        <p className="text-body-md text-on-surface-variant mt-xs">We sent a verification link to your inbox. Click it to activate your SkillLink passport.</p>
      </div>
      <Button variant="outline" size="md" className="w-full">Resend verification email</Button>
      <Link href="/login" className="flex items-center justify-center gap-1 text-label-sm text-on-surface-variant hover:text-on-surface">
        <ArrowLeft className="w-3 h-3" /> Back to login
      </Link>
    </motion.div>
  )
}