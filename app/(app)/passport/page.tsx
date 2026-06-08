'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { useSkillStore, computeReadiness } from '@/lib/store/skillStore'
import { ReadinessRing } from '@/components/charts/ReadinessRing'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'
import { StaggerList } from '@/components/animations/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Award, CheckCircle2, Clock, GraduationCap, Target } from 'lucide-react'

export default function PassportPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { verifiedSkills, skillGaps } = useSkillStore()
  const pendingSkills = skillGaps.filter(g => !verifiedSkills.some(v => v.skillName === g.skill))
  const readinessScore = computeReadiness(verifiedSkills)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() ?? 'AO'

  return (
    <div className="max-w-2xl mx-auto space-y-md pb-xl">
      <FadeSlideIn>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-sans font-black text-headline-md text-on-surface">Skill Passport</h1>
            <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Verified competency profile</p>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.1}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-tertiary via-primary to-primary-container" />
          <div className="p-md flex flex-col sm:flex-row items-center gap-md">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <span className="text-2xl font-black text-primary font-mono">{initials}</span>
              </div>
              {verifiedSkills.length > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                  className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-tertiary-container border-2 border-background flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-on-tertiary-container" />
                </motion.div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-sans font-black text-headline-md text-on-surface">{user?.name ?? 'Amara Okonkwo'}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-xs mt-xs">
                <Badge variant="secondary"><GraduationCap className="w-2.5 h-2.5" />{user?.institution?.match(/\(([^)]+)\)/)?.[1] ?? 'FUTA'}</Badge>
                <Badge variant="secondary">{user?.department ?? 'EEE'}</Badge>
                <Badge variant="secondary">{user?.level ?? '300L'}</Badge>
              </div>
              <p className="text-label-sm text-on-surface-variant font-mono mt-sm">
                {verifiedSkills.length} verified · {pendingSkills.length} pending
              </p>
            </div>
            <div className="shrink-0"><ReadinessRing score={Math.round(readinessScore)} /></div>
          </div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={0.2}>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-card overflow-hidden">
          <div className="px-md pt-md pb-sm border-b border-outline-variant/10 flex items-center justify-between">
            <div>
              <h3 className="font-mono text-label-md text-on-surface uppercase tracking-wider font-bold">Verified Skills</h3>
              <p className="text-label-sm text-on-surface-variant mt-0.5">Proven through timed assessment</p>
            </div>
            <Badge variant="verified"><CheckCircle2 className="w-3 h-3" />{verifiedSkills.length}</Badge>
          </div>
          {verifiedSkills.length === 0 ? (
            <div className="p-lg flex flex-col items-center text-center gap-sm">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <Target className="w-6 h-6 text-on-surface-variant" />
              </div>
              <p className="text-body-md text-on-surface-variant">No verified skills yet.</p>
              <Button variant="outline" size="sm" onClick={() => router.push('/skills/assessment/python')}>
                Take first assessment
              </Button>
            </div>
          ) : (
            <div className="p-md space-y-sm">
              <StaggerList>
                {verifiedSkills.map(skill => (
                  <motion.div key={skill.skillId} whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-sm bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-sm">
                      <div className="w-9 h-9 rounded-lg bg-tertiary-container/20 border border-tertiary-container/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-on-tertiary-container" />
                      </div>
                      <div>
                        <p className="font-semibold text-body-md text-on-surface">{skill.skillName}</p>
                        <p className="text-label-sm text-on-surface-variant font-mono">{skill.proficiency} · {skill.verifiedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-sm shrink-0">
                      <span className="font-black text-xl text-primary font-mono">{skill.score}%</span>
                      <Badge variant="verified">✓</Badge>
                    </div>
                  </motion.div>
                ))}
              </StaggerList>
            </div>
          )}
        </div>
      </FadeSlideIn>

      {pendingSkills.length > 0 && (
        <FadeSlideIn delay={0.3}>
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-card overflow-hidden">
            <div className="px-md pt-md pb-sm border-b border-outline-variant/10">
              <h3 className="font-mono text-label-md text-on-surface uppercase tracking-wider font-bold">Skills to Verify</h3>
            </div>
            <div className="p-md space-y-sm">
              <StaggerList>
                {pendingSkills.slice(0,4).map((gap, idx) => (
                  <div key={gap.skill} className="flex items-center justify-between p-sm bg-surface-container rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-sm flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-on-surface-variant" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-body-md text-on-surface truncate">{gap.skill}</p>
                        <div className="flex items-center gap-xs mt-0.5">
                          <div className="h-1 w-20 bg-surface-container-high rounded-full overflow-hidden">
                            <motion.div className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }} animate={{ width: `${gap.current}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }} />
                          </div>
                          <span className="text-[10px] font-mono text-on-surface-variant">{gap.current}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={gap.priority === 'high' ? 'error' : gap.priority === 'medium' ? 'warning' : 'secondary'}>
                      {gap.priority}
                    </Badge>
                  </div>
                ))}
              </StaggerList>
            </div>
          </div>
        </FadeSlideIn>
      )}
    </div>
  )
}