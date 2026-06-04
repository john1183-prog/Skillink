'use client'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Zap, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/lib/store/authStore'
import { DEMO } from '@/lib/demo/demoConfig'

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800))
    login({ id: 'user-1', name: 'Student', email: data.email, institution: 'FUTA', department: 'EEE', level: '300L', interests: [] }, 'token-1')
    router.push('/dashboard')
  }

  const demoLogin = () => {
    login({ id: 'demo-futa-001', name: DEMO.student.name, email: DEMO.student.email, institution: DEMO.student.institution, department: DEMO.student.department, level: DEMO.student.level, interests: ['Data Science', 'AI/ML'] }, 'demo-token')
    router.push('/dashboard')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-xl p-md space-y-md">
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><Zap className="w-4 h-4 text-on-primary" /></div>
        <div><h1 className="font-sans font-black text-headline-md text-on-surface">Welcome back</h1><p className="text-label-sm text-on-surface-variant">Sign in to your SkillLink passport</p></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-sm">
        <Input id="email" type="email" label="Email Address" placeholder="amara@futa.edu.ng" error={errors.email?.message} autoComplete="email" {...register('email')} />
        <Input id="password" type="password" label="Password" placeholder="••••••••" error={errors.password?.message} autoComplete="current-password" {...register('password')} />
        <div className="flex justify-end"><Link href="/forgot-password" className="text-label-sm text-primary hover:underline">Forgot password?</Link></div>
        <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="w-full">Sign In</Button>
      </form>

      <div className="relative flex items-center gap-sm">
        <div className="flex-1 h-px bg-outline-variant/30" /><span className="text-label-sm text-on-surface-variant font-mono">OR</span><div className="flex-1 h-px bg-outline-variant/30" />
      </div>

      <Button type="button" variant="outline" size="md" className="w-full" onClick={demoLogin}>
        <Sparkles className="w-4 h-4 mr-xs" /> Enter as Amara (Demo)
      </Button>

      <p className="text-center text-label-sm text-on-surface-variant">
        No account? <Link href="/signup" className="text-primary hover:underline font-semibold">Create one</Link>
      </p>
    </motion.div>
  )
}