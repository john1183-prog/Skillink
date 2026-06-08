export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-md">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant animate-pulse">Loading SkillLink</p>
    </div>
  )
}
