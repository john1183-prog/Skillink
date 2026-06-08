# SkillLink
### From Certificate Holder to Verified Talent

> **MTC Innovation Competition · FUTA Tech-PIC · GIZ-Nigeria · 2025**

---

## The Problem

Over **40%** of Nigerian graduates are underemployed within 2 years of graduation.
Employers can't trust self-declared CVs. Students leave university with certificates but no
verified practical skills, no career direction, and no visibility into real opportunities.

## The Solution

SkillLink builds a **Verified Skill Passport** — skills are earned through AI-assessed
challenges, not typed in. The platform guides students from career discovery → skill gap
analysis → verified assessment → matched opportunities.

> *"Every skill on this passport was earned, not typed."*

---

## Live Demo

🔗 **skilllink.vercel.app**

On the login page, tap **"Enter as Amara (Demo)"** — no signup required.
The app runs fully offline with pre-seeded data for Amara Okonkwo, 300L EEE, FUTA.

---

## Demo Flow (5 Minutes)

| Time | Screen | What You See |
|------|--------|-------------|
| 0:00 | Splash | 3D SkillOrb rotates · Tagline reveals |
| 0:20 | Welcome | "40% underemployed" stat |
| 0:50 | Career Compass | Personality test → constellation reveal |
| 1:30 | Results | Data Analyst — 78% match |
| 2:00 | Skill Gap | Animated radar chart · Gap zones |
| 2:30 | Assessment | Countdown timer · 10 Python questions |
| 3:15 | **THE MOMENT** | Confetti · VERIFIED stamp drops |
| 3:45 | Passport | Verified badge · Readiness ring climbs |
| 4:15 | Opportunities | Google Africa Scholarship — 91% match |
| 4:40 | Roadmap | Animated milestones |
| 5:00 | Close | "Every skill here was earned, not typed." |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 · TypeScript |
| Styling | Tailwind CSS · Kinetic Professionalism design system |
| Animations | Framer Motion (motion) · Three.js |
| AI | Google Gemini 2.0 Flash (Vercel AI SDK) |
| State | Zustand |
| Deploy | Vercel |

---

## Local Setup

```bash
git clone https://github.com/your-username/skilllink
cd skilllink
npm install
cp .env.example .env.local
# Add your Gemini API key to .env.local
npm run dev
```

Open http://localhost:3000

## Vercel Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_GENERATIVE_AI_API_KEY` — from aistudio.google.com (free)
   - `NEXT_PUBLIC_DEMO_MODE` — `true`
4. Deploy

---

## Features

- **AI Career Compass** — Personality + aptitude → matched career paths
- **Skill Gap Analysis** — Radar chart comparing current vs industry skills
- **Verified Assessments** — Timed challenges · Pass to earn badges
- **Skill Passport** — Verified profile that proves competency
- **Opportunity Matching** — Nigerian internships, scholarships, bootcamps
- **AI Assistant** — CV optimizer, cover letter, interview prep via Gemini
- **Dark/Light Mode** — Full theme support, persisted
- **Offline-first** — Fully functional without network in demo mode

---

*Built with ❤️ for the More Than Certificate (MTC) Competition · FUTA · 2025*
