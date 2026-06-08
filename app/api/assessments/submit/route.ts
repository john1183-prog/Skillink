import { NextRequest, NextResponse } from 'next/server'
import { pythonAssessment } from '@/lib/demo/mockData'

export async function POST(req: NextRequest) {
  try {
    const { answers, skillName = 'Python Programming' } = await req.json()
    let correctCount = 0
    pythonAssessment.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correctCount++
    })
    const score = Math.round((correctCount / pythonAssessment.length) * 100)
    return NextResponse.json({
      score, passed: score >= 70, correctCount,
      totalQuestions: pythonAssessment.length, skillName,
      completedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ error: 'Assessment submission failed' }, { status: 500 })
  }
}