const difficulteColor = {
  Facile: 'text-green-400',
  Moyenne: 'text-yellow-400',
  Difficile: 'text-red-400',
}

const tagColors = [
  'bg-indigo-500/20 text-indigo-300',
  'bg-emerald-500/20 text-emerald-300',
  'bg-amber-500/20 text-amber-300',
  'bg-rose-500/20 text-rose-300',
  'bg-cyan-500/20 text-cyan-300',
  'bg-purple-500/20 text-purple-300',
  'bg-orange-500/20 text-orange-300',
]

function Stars({ note }) {
  const full = Math.floor(note)
  const half = note % 1 >= 0.5
  return (
    <span className="text-yellow-400 text-xs">
      {'★'.repeat(full)}
      {half && '½'}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

export default function CircuitCard({ circuit, isSelected, onSelect, onHover }) {
  const isMetropole = circuit.source === 'bordeaux-metropole'

  return (
    <div
      className={`p-3 mx-2 mb-2 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-indigo-500/20 border border-indigo-500/50 shadow-lg shadow-indigo-500/10'
          : 'bg-gray-800/30 border border-transparent hover:bg-gray-700/30 hover:border-gray-600/30'
      }`}
      onClick={() => onSelect(circuit.id)}
      onMouseEnter={() => onHover(circuit.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-sm font-semibold text-white leading-tight">{circuit.name}</h3>
        <Stars note={circuit.note} />
      </div>

      {/* Source badge */}
      <div className="mb-2">
        <span
          className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${
            isMetropole
              ? 'bg-blue-500/20 text-blue-300'
              : 'bg-green-500/20 text-green-300'
          }`}
        >
          {isMetropole ? '🏛️ Bordeaux Métropole' : '👥 Communauté'}
        </span>
      </div>

      {/* Info row */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-400 mb-2">
        <span>{circuit.distance}</span>
        <span>{circuit.duree}</span>
        <span className={difficulteColor[circuit.difficulte]}>{circuit.difficulte}</span>
      </div>
      <div className="flex gap-x-3 text-xs text-gray-500 mb-2">
        <span>{circuit.type}</span>
        <span>{circuit.revetement}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {circuit.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-[10px] px-1.5 py-0.5 rounded ${tagColors[i % tagColors.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
