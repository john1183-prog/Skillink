'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuthStore } from '@/lib/store/authStore'
import { Send, FileText, Mail, MessageSquare, Copy, Check, Sparkles, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { FadeSlideIn } from '@/components/animations/FadeSlideIn'

type TabId = 'cv' | 'coverletter' | 'interview'
interface Message { role: 'user' | 'assistant'; content: string }
type History = Record<TabId, Message[]>

const TABS: { id: TabId; label: string; icon: React.ReactNode; badge: string; starterPrompt: string }[] = [
  { id: 'cv', label: 'CV Optimizer', icon: <FileText className="w-3.5 h-3.5" />, badge: 'AI',
    starterPrompt: 'Analyze the profile of Amara Okonkwo — a 300L Electrical Engineering student at FUTA with a verified Python Programming skill and 72% employability readiness. Provide 5 specific, actionable CV improvements to make her competitive for Data Analyst internship roles at Nigerian fintech companies like Flutterwave, Paystack, or Kuda Bank.' },
  { id: 'coverletter', label: 'Cover Letter', icon: <Mail className="w-3.5 h-3.5" />, badge: 'Generate',
    starterPrompt: "Write a professional, compelling cover letter for Amara Okonkwo applying to the Flutterwave Data Analytics Intern role. She is a 300L EEE student at FUTA, has a verified Python skill badge, and a 72% employability readiness score on SkillLink. Make it specific, enthusiastic, and under 250 words." },
  { id: 'interview', label: 'Interview Prep', icon: <MessageSquare className="w-3.5 h-3.5" />, badge: 'Practice',
    starterPrompt: 'Give me the 5 most likely technical and behavioural interview questions for a Data Analyst intern role at a Nigerian fintech company. For each question, provide a model answer tailored to an Electrical Engineering student at FUTA who has just verified Python programming skills. Be specific and practical.' },
]

export default function AIAssistantPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabId>('cv')
  const [history, setHistory] = useState<History>({ cv: [], coverletter: [], interview: [] })
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const initializedTabs = useRef<Set<TabId>>(new Set())
  const currentMessages = history[activeTab]
  const currentTab = TABS.find(t => t.id === activeTab)!

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return
    const userMsg: Message = { role: 'user', content: text }
    const aiMsg: Message = { role: 'assistant', content: '' }
    setHistory(prev => ({ ...prev, [activeTab]: [...prev[activeTab], userMsg, aiMsg] }))
    setStreaming(true)

    try {
      const msgs = [...history[activeTab], userMsg].map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/ai/stream', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, type: activeTab })
      })
      if (!res.ok || !res.body) throw new Error('Stream failed')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n').filter(Boolean)) {
          if (line.startsWith('0:"')) {
            const word = line.slice(3, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"')
            setHistory(prev => {
              const arr = [...prev[activeTab]]
              arr[arr.length - 1] = { ...arr[arr.length - 1], content: arr[arr.length - 1].content + word }
              return { ...prev, [activeTab]: arr }
            })
          }
        }
      }
    } catch {
      setHistory(prev => {
        const arr = [...prev[activeTab]]
        arr[arr.length - 1] = { role: 'assistant', content: '⚡ Offline mode: AI temporarily unavailable. Your verified Python skill and EEE background make you a strong candidate for data analyst roles. Focus on building SQL skills next.' }
        return { ...prev, [activeTab]: arr }
      })
    } finally { setStreaming(false) }
  }, [activeTab, history, streaming])

  useEffect(() => {
    if (!initializedTabs.current.has(activeTab) && history[activeTab].length === 0) {
      initializedTabs.current.add(activeTab)
      const tab = TABS.find(t => t.id === activeTab)!
      sendMessage(tab.starterPrompt)
    }
  // sendMessage is stable within the same activeTab render; intentionally omitted
  // to avoid retriggering on unrelated history updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history, activeTab])

  const handleSubmit = () => { if (input.trim()) { sendMessage(input); setInput('') } }
  const copyMsg = (text: string, idx: number) => { navigator.clipboard.writeText(text); setCopied(idx); setTimeout(() => setCopied(null), 2000) }
  const clearTab = () => { setHistory(prev => ({ ...prev, [activeTab]: [] })); initializedTabs.current.delete(activeTab) }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] max-w-3xl mx-auto w-full">
      <FadeSlideIn className="mb-md shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-sm">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-sans font-black text-headline-md text-on-surface">AI Career Assistant</h1>
              <p className="text-label-sm text-on-surface-variant font-mono">Gemini · Nigerian market calibrated</p>
            </div>
          </div>
          <button onClick={clearTab} className="flex items-center gap-xs text-label-sm text-on-surface-variant hover:text-on-surface p-xs rounded-lg hover:bg-surface-container-high transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </FadeSlideIn>

      <div className="flex gap-xs mb-md shrink-0 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(tab => (
          <motion.button key={tab.id} whileTap={{ scale: 0.96 }} onClick={() => setActiveTab(tab.id)}
            className={cn('flex items-center gap-xs px-sm py-xs rounded-full text-label-sm font-mono font-bold uppercase tracking-wider border shrink-0 transition-all',
              activeTab === tab.id ? 'bg-primary text-on-primary border-primary shadow-glow-sm' : 'bg-surface-container border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high')}>
            {tab.icon} {tab.label}
            <span className={cn('text-[9px] px-1 py-0.5 rounded-full font-bold', activeTab === tab.id ? 'bg-white/20' : 'bg-primary/10 text-primary')}>{tab.badge}</span>
          </motion.button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-sm pr-1 min-h-0 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {currentMessages.map((msg, idx) => (
            <motion.div key={`${activeTab}-${idx}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-xs shrink-0 mt-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
              )}
              <div className={cn('max-w-[82%] rounded-2xl px-md py-sm relative group',
                msg.role === 'user' ? 'bg-primary text-on-primary rounded-br-sm' : 'bg-surface-container border border-outline-variant/20 text-on-surface rounded-bl-sm')}>
                <p className="text-body-md whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                  {streaming && idx === currentMessages.length - 1 && msg.role === 'assistant' && msg.content && (
                    <motion.span className="inline-block w-0.5 h-4 bg-primary/60 ml-0.5 align-middle"
                      animate={{ opacity: [1,0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  )}
                  {streaming && idx === currentMessages.length - 1 && msg.role === 'assistant' && !msg.content && (
                    <span className="inline-flex gap-0.5 items-center ml-1">
                      {[0,1,2].map(i => (
                        <motion.span key={i} className="w-1 h-1 rounded-full bg-primary inline-block"
                          animate={{ scale: [1,1.6,1], opacity: [0.4,1,0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </span>
                  )}
                </p>
                {msg.role === 'assistant' && msg.content && !streaming && (
                  <button onClick={() => copyMsg(msg.content, idx)}
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-surface-container-high border border-outline-variant/30 rounded-full p-1 shadow-sm transition-opacity">
                    {copied === idx ? <Check className="w-3 h-3 text-tertiary" /> : <Copy className="w-3 h-3 text-on-surface-variant" />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="shrink-0 pt-sm border-t border-outline-variant/20 mt-sm">
        <div className="flex gap-sm">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
            placeholder={`Follow up on ${currentTab.label.toLowerCase()}...`} disabled={streaming}
            className="flex-1 bg-surface-container border border-outline-variant/40 rounded-xl px-md py-sm text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:shadow-glow-sm transition-all disabled:opacity-50" />
          <motion.button onClick={handleSubmit} disabled={streaming || !input.trim()} whileTap={{ scale: 0.93 }}
            className="bg-primary text-on-primary rounded-xl px-md disabled:opacity-40 hover:shadow-glow-sm transition-all">
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-[10px] font-mono text-on-surface-variant/30 uppercase tracking-wider text-center mt-xs">SkillLink AI · Context-aware</p>
      </div>
    </div>
  )
}