export default function FilterBar({ filters, onFiltersChange }) {
  const update = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const btnClass = (key, value) =>
    `px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
      filters[key] === value
        ? 'bg-indigo-500 text-white'
        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
    }`

  return (
    <div className="p-3 space-y-3 border-b border-gray-700/50">
      {/* Source */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Source</div>
        <div className="flex gap-1.5 flex-wrap">
          <button className={btnClass('source', 'all')} onClick={() => update('source', 'all')}>Tous</button>
          <button className={btnClass('source', 'bordeaux-metropole')} onClick={() => update('source', 'bordeaux-metropole')}>Métropole</button>
          <button className={btnClass('source', 'communaute')} onClick={() => update('source', 'communaute')}>Communauté</button>
        </div>
      </div>

      {/* Difficulté */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Difficulté</div>
        <div className="flex gap-1.5 flex-wrap">
          <button className={btnClass('difficulte', 'all')} onClick={() => update('difficulte', 'all')}>Tous</button>
          <button className={btnClass('difficulte', 'Facile')} onClick={() => update('difficulte', 'Facile')}>Facile</button>
          <button className={btnClass('difficulte', 'Moyenne')} onClick={() => update('difficulte', 'Moyenne')}>Moyenne</button>
          <button className={btnClass('difficulte', 'Difficile')} onClick={() => update('difficulte', 'Difficile')}>Difficile</button>
        </div>
      </div>

      {/* Type */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Type</div>
        <div className="flex gap-1.5 flex-wrap">
          <button className={btnClass('type', 'all')} onClick={() => update('type', 'all')}>Tous</button>
          <button className={btnClass('type', 'VTC')} onClick={() => update('type', 'VTC')}>VTC</button>
          <button className={btnClass('type', 'VTT')} onClick={() => update('type', 'VTT')}>VTT</button>
        </div>
      </div>

      {/* Durée max */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Durée max</span>
          <span className="text-xs text-indigo-400 font-medium">{filters.dureeMax}h</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={filters.dureeMax}
          onChange={(e) => update('dureeMax', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}
