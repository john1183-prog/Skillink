'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

function SkillOrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let angle = 0

    const PHI = (1 + Math.sqrt(5)) / 2
    const vertices = [
      [1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],
      [0,PHI,1/PHI],[0,PHI,-1/PHI],[0,-PHI,1/PHI],[0,-PHI,-1/PHI],
      [1/PHI,0,PHI],[-1/PHI,0,PHI],[1/PHI,0,-PHI],[-1/PHI,0,-PHI],
      [PHI,1/PHI,0],[PHI,-1/PHI,0],[-PHI,1/PHI,0],[-PHI,-1/PHI,0],
    ].map(v => { const l = Math.sqrt(v[0]**2+v[1]**2+v[2]**2); return v.map(x => x/l*80) as [number,number,number] })

    const edges: [number,number][] = []
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i+1; j < vertices.length; j++) {
        const d = Math.sqrt((vertices[i][0]-vertices[j][0])**2+(vertices[i][1]-vertices[j][1])**2+(vertices[i][2]-vertices[j][2])**2)
        if (d > 95 && d < 125) edges.push([i,j])
      }
    }

    const project = (v: [number,number,number], rx: number, ry: number) => {
      const [x,y,z] = v
      const y2 = y*Math.cos(rx) - z*Math.sin(rx)
      const z2 = y*Math.sin(rx) + z*Math.cos(rx)
      const x2 = x*Math.cos(ry) + z2*Math.sin(ry)
      const z3 = -x*Math.sin(ry) + z2*Math.cos(ry)
      const fov = 300, pz = z3 + 250
      return { x: x2*fov/pz, y: y2*fov/pz, z: z3 }
    }

    const render = () => {
      if (!canvas || !ctx) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width/2, cy = canvas.height/2
      const rx = Math.sin(angle * 0.3) * 0.4
      const ry = angle * 0.5

      const projected = vertices.map(v => project(v as [number,number,number], rx, ry))

      edges.forEach(([i,j]) => {
        const a = projected[i], b = projected[j]
        const avgZ = (a.z + b.z) / 2
        const alpha = Math.max(0.1, Math.min(0.8, (avgZ + 100) / 200))
        ctx.beginPath()
        ctx.moveTo(cx + a.x, cy + a.y)
        ctx.lineTo(cx + b.x, cy + b.y)
        ctx.strokeStyle = `rgba(0, 56, 209, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      projected.forEach(p => {
        const alpha = Math.max(0.2, Math.min(1, (p.z + 100) / 200))
        ctx.beginPath()
        ctx.arc(cx + p.x, cy + p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(185, 195, 255, ${alpha})`
        ctx.fill()
      })

      // Glow particles
      for (let i = 0; i < 8; i++) {
        const t = (angle * 0.3 + i * Math.PI * 2 / 8)
        const r = 95 + Math.sin(angle + i) * 5
        const px = cx + Math.cos(t) * r * 0.6
        const py = cy + Math.sin(t) * r * 0.4
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(185, 195, 255, ${0.3 + Math.sin(angle * 2 + i) * 0.2})`
        ctx.fill()
      }

      angle += 0.008
      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: 'transparent' }} />
}

export function SkillOrb() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 })

  return (
    <motion.div
      className="w-64 h-64 md:w-80 md:h-80 relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width/2) / rect.width
        const y = (e.clientY - rect.top - rect.height/2) / rect.height
        rotX.set(-y * 8)
        rotY.set(x * 8)
      }}
      onMouseLeave={() => { rotX.set(0); rotY.set(0) }}
      style={{ rotateX: rotX, rotateY: rotY, perspective: 800 }}
    >
      <div className="absolute inset-0 rounded-full ambient-glow-primary opacity-60 blur-2xl" />
      <SkillOrbCanvas />
    </motion.div>
  )
}

export default SkillOrb
