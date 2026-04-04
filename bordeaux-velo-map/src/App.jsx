import { useState, useMemo } from 'react'
import { circuits } from './data/circuits'
import Sidebar from './components/Sidebar'
import MapView from './components/MapView'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [filters, setFilters] = useState({
    source: 'all',
    difficulte: 'all',
    type: 'all',
    dureeMax: 10,
  })

  const filtered = useMemo(() => {
    return circuits.filter((c) => {
      if (filters.source !== 'all' && c.source !== filters.source) return false
      if (filters.difficulte !== 'all' && c.difficulte !== filters.difficulte) return false
      if (filters.type !== 'all' && c.type !== filters.type) return false
      if (c.dureeH > filters.dureeMax) return false
      return true
    })
  }, [filters])

  const selected = circuits.find((c) => c.id === selectedId) || null

  return (
    <div className="flex h-screen w-screen" style={{ background: '#1a1a2e' }}>
      {/* Sidebar */}
      <div className="flex flex-col w-[380px] min-w-[380px] max-md:w-full max-md:min-w-0 max-md:h-[50vh]" style={{ background: '#16213e' }}>
        <Sidebar
          circuits={filtered}
          allCircuits={circuits}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
          filters={filters}
          onFiltersChange={setFilters}
          selected={selected}
        />
      </div>
      {/* Map */}
      <div className="flex-1 max-md:h-[50vh]">
        <MapView
          circuits={filtered}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  )
}
