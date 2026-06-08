'use client'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/lib/store/authStore'

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) })
type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800))
    login({ id: 'new-user', name: data.name, email: data.email, institution: '', department: '', level: '', interests: [] }, 'token-new')
    router.push('/welcome')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-xl p-md space-y-md">
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><Zap className="w-4 h-4 text-on-primary" /></div>
        <div><h1 className="font-sans font-black text-headline-md text-on-surface">Create account</h1><p className="text-label-sm text-on-surface-variant">Start building your verified passport</p></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-sm">
        <Input id="name" type="text" label="Full Name" placeholder="Amara Okonkwo" error={errors.name?.message} {...register('name')} />
        <Input id="email" type="email" label="Email Address" placeholder="you@futa.edu.ng" error={errors.email?.message} {...register('email')} />
        <Input id="password" type="password" label="Password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="w-full">Create Account</Button>
      </form>
      <p className="text-center text-label-sm text-on-surface-variant">Already have an account? <Link href="/login" className="text-primary hover:underline font-semibold">Sign in</Link></p>
    </motion.div>
  )
}