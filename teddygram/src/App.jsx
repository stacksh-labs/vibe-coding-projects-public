import { useState, useEffect } from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'
import PostForm from './components/PostForm'
import { usePosts } from './hooks/usePosts'

export default function App() {
  const { posts, likedPostIds, addPost, toggleLike } = usePosts()
  const [showForm, setShowForm] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  // Fermer la modal avec Escape
  useEffect(() => {
    if (!showForm) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') setShowForm(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showForm])

  // Bloquer le scroll quand la modal est ouverte
  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showForm])

  function handleSubmit(formData) {
    addPost(formData)
    setShowSuccessBanner(true)
    setTimeout(() => setShowSuccessBanner(false), 3500)
  }

  return (
    <div className="min-h-screen font-nunito">
      <Header onNewPostClick={() => setShowForm(true)} />

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Bannière de succès */}
        {showSuccessBanner && (
          <div
            role="status"
            aria-live="polite"
            className="mb-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-3xl px-5 py-4 flex items-center gap-3 shadow-lg animate-pop"
          >
            <span className="text-2xl">🎉</span>
            <span>Ta peluche est maintenant dans le feed ! Tout le monde peut la voir !</span>
          </div>
        )}

        {/* Compteur de posts */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-gray-700 flex items-center gap-2">
            <span>🌟</span>
            <span>
              {posts.length} peluche{posts.length !== 1 ? 's' : ''} partagée{posts.length !== 1 ? 's' : ''}
            </span>
          </h2>
          <span className="text-xs text-gray-400 font-semibold bg-white rounded-full px-3 py-1 shadow-sm">
            📱 Feed
          </span>
        </div>

        {/* Feed de posts */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <span className="text-7xl animate-float">🧸</span>
            <h3 className="text-2xl font-black text-gray-600">Aucune peluche pour l&apos;instant !</h3>
            <p className="text-gray-400 font-semibold max-w-xs">
              Sois le premier à partager ta peluche préférée avec tout le monde !
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mt-2 text-base"
            >
              📸 Partager ma peluche
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPostIds.has(post.id)}
                onToggleLike={toggleLike}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bouton flottant (mobile) */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full bg-gradient-to-br from-teddy-pink to-teddy-purple text-white shadow-fun-lg flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 z-40"
        aria-label="Créer un nouveau post"
      >
        📸
      </button>

      {/* Modal formulaire */}
      {showForm && (
        <PostForm
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
