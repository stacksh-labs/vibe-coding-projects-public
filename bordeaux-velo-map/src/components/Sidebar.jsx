import FilterBar from './FilterBar'
import CircuitCard from './CircuitCard'
import DetailPanel from './DetailPanel'

export default function Sidebar({
  circuits,
  allCircuits,
  selectedId,
  onSelect,
  onHover,
  filters,
  onFiltersChange,
  selected,
}) {
  const metropoleCount = allCircuits.filter((c) => c.source === 'bordeaux-metropole').length
  const communauteCount = allCircuits.filter((c) => c.source === 'communaute').length

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <h1 className="text-lg font-bold text-white tracking-tight">Bordeaux Vélo Map</h1>
        <p className="text-xs text-gray-400 mt-1">
          {circuits.length} circuits | {metropoleCount} Métropole | {communauteCount} Communauté
        </p>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFiltersChange={onFiltersChange} />

      {/* Circuit list */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-2">
        {circuits.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            Aucun circuit ne correspond aux filtres
          </div>
        ) : (
          circuits.map((c) => (
            <CircuitCard
              key={c.id}
              circuit={c}
              isSelected={selectedId === c.id}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel circuit={selected} onClose={() => onSelect(null)} />
      )}
    </>
  )
}
