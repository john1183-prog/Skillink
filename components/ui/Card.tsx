import React from 'react'
import { cn } from '@/lib/utils/cn'

interface CardProps { children: React.ReactNode; className?: string; variant?: 'default' | 'flat' | 'glow' }

export function Card({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-card',
    flat:    'bg-surface-container/40 border border-outline-variant/10 rounded-xl',
    glow:    'bg-surface-container-lowest border border-primary/20 rounded-xl shadow-glow',
  }
  return <div className={cn(variants[variant], className)}>{children}</div>
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-1 p-md pb-0', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('font-mono text-label-md text-on-surface uppercase tracking-wider font-bold', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-label-sm text-on-surface-variant', className)}>{children}</p>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-md pt-sm', className)}>{children}</div>
}

export default Card
