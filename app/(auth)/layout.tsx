import React from 'react'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 ambient-glow-primary opacity-20 blur-3xl pointer-events-none" />
      <div className="w-full max-w-md z-10">{children}</div>
    </div>
  )
}