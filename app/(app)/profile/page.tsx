'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { useSkillStore, computeReadiness } from '@/lib/store/skillStore'
import { useCareerStore } from '@/lib/store/careerStore'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Github, Linkedin, GraduationCap, MapPin, Edit2,
  CheckCircle, Clock, ChevronRight, Award, Target
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { verifiedSkills, skillGaps } = useSkillStore()
  const { selectedPath } = useCareerStore()

  const readiness  = computeReadiness(verifiedSkills)
  const initials   = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AO'
  const firstName  = user?.name?.split(' ')[0] ?? 'Amara'
  const lastName   = user?.name?.split(' ').slice(1).join(' ') ?? 'Okonkwo'

  const stats = [
    { label: 'Verified',  value: verifiedSkills.length, color: 'text-primary' },
    { label: 'Skill Gaps', value: skillGaps.filter(g => !verifiedSkills.some(v => v.skillName === g.skill)).length, color: 'text-error' },
    { label: 'Readiness', value: `${readiness}%`, color: 'text-tertiary' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-md pb-xl">

      {/* Header card */}
      <FadeSlideIn>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-card">
          {/* Gradient banner */}
          <div className="h-20 bg-gradient-to-r from-tertiary/80 via-primary to-primary-container relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="px-md pb-md">
            {/* Avatar overlapping banner */}
            <div className="flex items-end justify-between -mt-8 mb-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary border-4 border-surface-container-lowest flex items-center justify-center shadow-glow-sm">
                <span className="text-xl font-black text-on-primary font-mono">{initials}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/profile/edit')}
                className="flex items-center gap-xs">
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
            </div>

            {/* Name + meta */}
            <h1 className="font-sans font-black text-title-lg text-on-surface">{firstName} {lastName}</h1>
            <div className="flex flex-wrap items-center gap-sm mt-xs text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                EEE 300L
              </span>
              <span className="flex items-center gap-xs">
                <MapPin className="w-3.5 h-3.5" />
                FUTA, Akure
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-sm">
              Final-year EEE student passionate about data, embedded systems and building tools that solve real problems.
            </p>

            {/* Social links */}
            <div className="flex gap-sm mt-sm">
              <a href="#" className="flex items-center gap-xs text-label-md text-on-surface-variant hover:text-on-surface transition-colors px-sm py-xs rounded-lg bg-surface-container hover:bg-surface-container-high">
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a href="#" className="flex items-center gap-xs text-label-md text-on-surface-variant hover:text-on-surface transition-colors px-sm py-xs rounded-lg bg-surface-container hover:bg-surface-container-high">
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </FadeSlideIn>

      {/* Stats row */}
      <FadeSlideIn delay={0.08}>
        <div className="grid grid-cols-3 gap-sm">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-sm text-center">
              <p className={`font-black text-2xl font-mono ${color}`}>{value}</p>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </FadeSlideIn>

      {/* Career goal */}
      <FadeSlideIn delay={0.12}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <div className="flex items-center justify-between mb-sm">
            <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Career Goal</h2>
            <Link href="/career-compass/test">
              <span className="text-label-sm text-primary hover:underline">Retake</span>
            </Link>
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-body-md text-on-surface">
                {selectedPath?.title ?? 'Data Analyst'}
              </p>
              <p className="text-body-sm text-on-surface-variant">
                {selectedPath?.company ?? 'Various Nigerian tech companies'}
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-sm">
            <div className="flex justify-between text-label-sm text-on-surface-variant mb-xs">
              <span>Readiness</span>
              <span className="text-primary font-semibold">{readiness}%</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary"
                initial={{ width: 0 }}
                animate={{ width: `${readiness}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </FadeSlideIn>

      {/* Verified skills */}
      <FadeSlideIn delay={0.16}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
          <div className="flex items-center justify-between mb-sm">
            <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider">Verified Skills</h2>
            <Link href="/passport">
              <span className="text-label-sm text-primary hover:underline flex items-center gap-xs">
                Passport <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {verifiedSkills.length === 0 ? (
            <div className="text-center py-md">
              <Award className="w-8 h-8 text-on-surface-variant mx-auto mb-sm opacity-50" />
              <p className="text-body-sm text-on-surface-variant">No verified skills yet.</p>
              <Link href="/skills/gap-analysis">
                <span className="text-label-sm text-primary hover:underline mt-xs block">Start your first assessment</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-xs">
              {verifiedSkills.map((skill) => (
                <div key={skill.skillName}
                  className="flex items-center justify-between p-sm bg-surface-container rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="text-body-md font-medium text-on-surface">{skill.skillName}</p>
                      <p className="text-label-sm text-on-surface-variant">
                        Verified {new Date(skill.verifiedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <Badge variant="verified">{skill.score}%</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeSlideIn>

      {/* Pending skills */}
      {skillGaps.filter(g => !verifiedSkills.some(v => v.skillName === g.skill)).length > 0 && (
        <FadeSlideIn delay={0.2}>
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-card">
            <h2 className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Pending Skills</h2>
            <div className="space-y-xs">
              {skillGaps
                .filter(g => !verifiedSkills.some(v => v.skillName === g.skill))
                .map((gap) => (
                  <Link key={gap.skill} href="/skills/gap-analysis">
                    <div className="flex items-center justify-between p-sm bg-surface-container rounded-lg border border-outline-variant/10 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-sm">
                        <Clock className="w-4 h-4 text-on-surface-variant shrink-0" />
                        <p className="text-body-md text-on-surface">{gap.skill}</p>
                      </div>
                      <div className="flex items-center gap-sm">
                        <Badge variant={gap.priority === 'high' ? 'error' : gap.priority === 'medium' ? 'warning' : 'secondary'}>
                          {gap.priority}
                        </Badge>
                        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant" />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </FadeSlideIn>
      )}

      {/* Settings shortcut */}
      <FadeSlideIn delay={0.24}>
        <Link href="/settings">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md flex items-center justify-between hover:border-primary/20 transition-colors group">
            <p className="text-body-md font-medium text-on-surface">Account & Settings</p>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
          </div>
        </Link>
      </FadeSlideIn>

    </div>
  )
}
