import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-md px-margin-mobile text-center">
      <div className="font-mono text-[80px] font-black text-primary/20 leading-none">404</div>
      <h1 className="text-headline-md font-black text-on-surface font-sans -mt-sm">Page not found</h1>
      <p className="text-body-md text-on-surface-variant max-w-sm">This page does not exist. Your verified skills are still safe.</p>
      <Link href="/dashboard" className="bg-primary text-on-primary rounded-DEFAULT px-md py-sm font-semibold transition-all">Back to Dashboard</Link>
    </div>
  )
}
