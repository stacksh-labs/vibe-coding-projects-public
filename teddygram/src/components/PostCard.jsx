import { useState } from 'react'

// Palette de couleurs pour les cards (cycling)
const CARD_PALETTES = [
  { border: 'border-pink-200', badge: 'bg-pink-100 text-pink-700', accent: 'text-pink-500' },
  { border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', accent: 'text-purple-500' },
  { border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', accent: 'text-orange-500' },
  { border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', accent: 'text-yellow-600' },
  { border: 'border-green-200', badge: 'bg-green-100 text-green-700', accent: 'text-green-500' },
  { border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', accent: 'text-blue-500' },
]

function formatDate(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

function getInitials(name) {
  return name.slice(0, 1).toUpperCase()
}

const AVATAR_COLORS = [
  'bg-pink-400', 'bg-purple-400', 'bg-orange-400',
  'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-rose-400',
]

function getColorIndex(str) {
  let hash = 0
  for (const ch of str) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff
  return Math.abs(hash)
}

export default function PostCard({ post, isLiked, onToggleLike, index }) {
  const palette = CARD_PALETTES[index % CARD_PALETTES.length]
  const avatarColor = AVATAR_COLORS[getColorIndex(post.author) % AVATAR_COLORS.length]
  const [imgError, setImgError] = useState(false)
  const [likeAnimating, setLikeAnimating] = useState(false)

  function handleLike() {
    setLikeAnimating(true)
    onToggleLike(post.id)
    setTimeout(() => setLikeAnimating(false), 300)
  }

  return (
    <article
      className={`card border-2 ${palette.border}`}
      role="article"
      aria-label={`Post de ${post.author} : ${post.teddyName}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        {!imgError ? (
          <img
            src={post.imageUrl}
            alt={`Photo de ${post.teddyName}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-purple-300">
            <span className="text-6xl">🧸</span>
            <span className="text-sm font-semibold">Photo non disponible</span>
          </div>
        )}

        {/* Badge nom de la peluche */}
        <div className={`absolute bottom-3 left-3 ${palette.badge} px-3 py-1 rounded-full font-bold text-sm shadow-sm backdrop-blur-sm`}>
          🧸 {post.teddyName}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col gap-3">
        {/* Auteur + date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0`}>
              {getInitials(post.author)}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-gray-800 text-sm">{post.author}</span>
              <span className="text-xs text-gray-400 font-medium">{formatDate(post.date)}</span>
            </div>
          </div>

          {/* Bouton like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm transition-all duration-200 border-2 select-none
              ${isLiked
                ? 'bg-pink-50 border-pink-300 text-pink-600 hover:bg-pink-100'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500'
              }
              active:scale-90`}
            aria-label={isLiked ? 'Retirer le j\'adore' : 'J\'adore ce post'}
            aria-pressed={isLiked}
          >
            <span className={`text-base transition-transform duration-200 ${likeAnimating ? 'animate-pop' : ''}`}>
              {isLiked ? '❤️' : '🤍'}
            </span>
            <span>{post.likes}</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed font-medium line-clamp-4">
          {post.description}
        </p>

        {/* Footer */}
        <div className={`flex items-center gap-1.5 text-xs font-bold ${palette.accent} pt-1 border-t border-gray-100`}>
          <span>✨</span>
          <span>J&apos;adore !</span>
          {isLiked && <span className="ml-auto text-pink-400">Tu as aimé ce post ❤️</span>}
        </div>
      </div>
    </article>
  )
}
