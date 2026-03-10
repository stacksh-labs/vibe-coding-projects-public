export default function Header({ onNewPostClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + titre */}
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-float select-none">🧸</span>
          <div>
            <h1 className="text-2xl font-black gradient-text leading-none tracking-tight">
              Teddygram
            </h1>
            <p className="text-xs text-purple-400 font-semibold leading-none mt-0.5">
              Le réseau des peluches préférées ✨
            </p>
          </div>
        </div>

        {/* Bouton nouveau post (mobile: icône, desktop: texte) */}
        <button
          onClick={onNewPostClick}
          className="btn-primary flex items-center gap-1.5 text-sm"
          aria-label="Créer un nouveau post"
        >
          <span className="text-lg leading-none">📸</span>
          <span className="hidden sm:inline">Partager ma peluche</span>
          <span className="sm:hidden font-bold text-base">+</span>
        </button>
      </div>
    </header>
  )
}
