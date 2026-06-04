'use client'
import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-DEFAULT transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container hover:shadow-glow-sm',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary/5',
    ghost:   'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
  }
  const sizes = {
    sm: 'px-sm py-xs text-label-sm',
    md: 'px-md py-sm text-body-md',
    lg: 'px-lg py-md text-body-lg',
  }
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...(props as object)}
    >
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-xs" /> : null}
      {children}
    </motion.button>
  )
}

export default Button
