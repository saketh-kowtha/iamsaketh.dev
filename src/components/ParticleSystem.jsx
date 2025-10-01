import { useParticles } from '../hooks/useParticles'

export default function ParticleSystem({ id = 'bonfire-canvas' }) {
  useParticles(id, 50)
  return <canvas id={id} className="absolute inset-0" />
}

