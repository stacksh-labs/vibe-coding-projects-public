const difficulteColor = {
  Facile: 'text-green-400',
  Moyenne: 'text-yellow-400',
  Difficile: 'text-red-400',
}

function Stars({ note }) {
  const full = Math.floor(note)
  const half = note % 1 >= 0.5
  return (
    <span className="text-yellow-400">
      {'★'.repeat(full)}
      {half && '½'}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span className="text-gray-400 ml-1 text-xs">({note}/5)</span>
    </span>
  )
}

export default function DetailPanel({ circuit, onClose }) {
  if (!circuit) return null

  const isMetropole = circuit.source === 'bordeaux-metropole'
  const [lat, lon] = circuit.waypoints[0]
  const osmUrl = `https://www.openstreetmap.org/#map=13/${lat}/${lon}`

  return (
    <div className="border-t border-gray-700/50 p-4 space-y-3" style={{ background: '#0f172a' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-white">{circuit.name}</h2>
          <span
            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 ${
              isMetropole
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-green-500/20 text-green-300'
            }`}
          >
            {isMetropole ? '🏛️ Bordeaux Métropole' : '👥 Communauté'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300 transition-colors text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Note */}
      <Stars note={circuit.note} />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-800/50 rounded p-2">
          <div className="text-gray-500 mb-0.5">Distance</div>
          <div className="text-white font-medium">{circuit.distance}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-2">
          <div className="text-gray-500 mb-0.5">Durée</div>
          <div className="text-white font-medium">{circuit.duree}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-2">
          <div className="text-gray-500 mb-0.5">Difficulté</div>
          <div className={`font-medium ${difficulteColor[circuit.difficulte]}`}>{circuit.difficulte}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-2">
          <div className="text-gray-500 mb-0.5">Type de vélo</div>
          <div className="text-white font-medium">{circuit.type}</div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded p-2 text-xs">
        <div className="text-gray-500 mb-0.5">Revêtement</div>
        <div className="text-white">{circuit.revetement}</div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed">{circuit.description}</p>

      {/* OSM Link */}
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        Voir sur OpenStreetMap ↗
      </a>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {circuit.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
