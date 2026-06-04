'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { GraduationCap } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useOnboardingStore } from '@/lib/store/onboardingStore'
import { DEMO } from '@/lib/demo/demoConfig'

export default function AcademicPage() {
  const router = useRouter()
  const { setAcademicData } = useOnboardingStore()
  const { register, handleSubmit } = useForm({
    defaultValues: { institution: DEMO.isEnabled ? DEMO.student.institution : '', department: DEMO.isEnabled ? DEMO.student.department : '', level: DEMO.isEnabled ? DEMO.student.level : '' }
  })

  const onSubmit = (data: any) => { setAcademicData(data); router.push('/goals') }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-md py-lg">
      <div className="flex items-center gap-sm mb-md">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-primary" /></div>
        <div><h1 className="font-sans font-black text-headline-md text-on-surface">Academic Details</h1><p className="text-label-sm text-on-surface-variant font-mono uppercase tracking-wider">Step 1 of 3</p></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-sm">
        <Input id="institution" type="text" label="Institution" placeholder="Federal University of Technology, Akure" {...register('institution')} />
        <Input id="department" type="text" label="Department" placeholder="Electrical & Electronic Engineering" {...register('department')} />
        <div className="flex flex-col gap-xs">
          <label className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Level</label>
          <select {...register('level')} className="w-full bg-surface-container border border-outline-variant rounded-DEFAULT px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:shadow-glow-sm transition-all">
            {['100L','200L','300L','400L','500L','Graduate'].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <Button type="submit" variant="primary" size="md" className="w-full mt-md">Continue</Button>
      </form>
    </motion.div>
  )
}