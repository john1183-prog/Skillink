'use client'
import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, type, id, ...props }, ref) => {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="flex flex-col gap-xs w-full">
      {label && (
        <label htmlFor={id} className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={isPassword && show ? 'text' : type}
          className={cn(
            'w-full bg-surface-container border border-outline-variant rounded-DEFAULT px-md py-sm',
            'text-body-md text-on-surface placeholder:text-on-surface-variant/50',
            'focus:outline-none focus:border-primary focus:shadow-glow-sm transition-all',
            error ? 'border-error focus:border-error focus:shadow-none' : '',
            isPassword ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-label-sm text-error font-mono">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
