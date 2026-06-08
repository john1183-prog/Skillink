import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

const SYSTEM_PROMPTS: Record<string, string> = {
  cv: `You are SkillLink's AI Career Coach for Nigerian university students. You specialize in helping FUTA students (particularly EEE students) with CV optimization for Nigerian tech companies like Flutterwave, Paystack, Kuda, and Andela. Be specific, practical, and encouraging. Format your response clearly with numbered points.`,
  coverletter: `You are SkillLink's AI Career Coach helping Nigerian students write compelling cover letters for tech roles at Nigerian companies. Be professional, specific, and concise. Keep cover letters under 250 words.`,
  interview: `You are SkillLink's AI Interview Coach preparing Nigerian university students for tech interviews at companies like Flutterwave, Paystack, and Nigerian fintech firms. Provide specific model answers tailored to EEE/engineering backgrounds.`,
}

export async function POST(req: NextRequest) {
  try {
    const { messages, type = 'cv' } = await req.json()
    const systemPrompt = SYSTEM_PROMPTS[type] ?? SYSTEM_PROMPTS.cv

    const result = await streamText({
      model: google('gemini-2.0-flash-exp'),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('AI stream error:', error)
    return new Response(
      JSON.stringify({ error: 'AI service unavailable. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}