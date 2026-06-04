import React from 'react'
import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'verified'

interface BadgeProps { children: React.ReactNode; variant?: BadgeVariant; className?: string }

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const base = 'inline-flex items-center gap-1 rounded-full px-sm py-[2px] text-[10px] font-mono font-bold uppercase tracking-wider shrink-0'
  const variants: Record<BadgeVariant, string> = {
    default:  'bg-secondary-container text-on-secondary-container',
    secondary:'bg-surface-container-high text-on-surface-variant',
    success:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    error:    'bg-error-container text-error',
    warning:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    outline:  'border border-outline-variant text-on-surface-variant bg-transparent',
    verified: 'bg-tertiary-container text-on-tertiary-container',
  }
  return <span className={cn(base, variants[variant], className)}>{children}</span>
}

export default Badge
