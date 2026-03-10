import { useState, useEffect } from 'react'

const STORAGE_KEY = 'teddygram_posts'
const LIKES_KEY = 'teddygram_likes'

const DEMO_POSTS = [
  {
    id: 'demo-1',
    author: 'Léa',
    teddyName: 'Câlin',
    description: 'Câlin est mon ours en peluche depuis que j\'ai 2 ans ! Il a une oreille un peu abîmée parce que je le serrais trop fort la nuit. Il sent la lavande et il m\'accompagne partout, même en vacances ! 🐻',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 12,
  },
  {
    id: 'demo-2',
    author: 'Tom',
    teddyName: 'Dino',
    description: 'Dino c\'est mon dinosaure en peluche vert fluo ! Je l\'ai eu pour mon anniversaire et il est ÉNORME. Il roule avec moi quand je lis des BD. Il adore les bandes dessinées autant que moi je crois ! 🦕',
    imageUrl: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600&h=600&fit=crop',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 8,
  },
  {
    id: 'demo-3',
    author: 'Zoé',
    teddyName: 'Princesse',
    description: 'Princesse est une licorne rose avec des étoiles dorées ! Elle brille dans le noir, c\'est magique ! Je lui raconte tous mes secrets le soir avant de dormir. Elle garde mes rêves en sécurité ✨🦄',
    imageUrl: 'https://images.unsplash.com/photo-1608501947097-86951ad73fea?w=600&h=600&fit=crop',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 21,
  },
  {
    id: 'demo-4',
    author: 'Hugo',
    teddyName: 'Croc',
    description: 'Croc est un crocodile en peluche avec de grandes dents en velcro ! Quand j\'étais petit j\'avais peur des crocodiles, alors papa m\'a offert Croc pour que je n\'aie plus peur. Maintenant on est meilleurs amis ! 🐊',
    imageUrl: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=600&h=600&fit=crop',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 5,
  },
  {
    id: 'demo-5',
    author: 'Emma',
    teddyName: 'Mimi',
    description: 'Mimi est un lapin blanc avec des oreilles super longues et un nœud papillon rose. Elle adore faire semblant de boire le thé avec moi ! On a des goûters ensemble tous les après-midi 🐰☕',
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=600&h=600&fit=crop',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 17,
  },
]

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return null
}

function loadLikes() {
  try {
    const stored = localStorage.getItem(LIKES_KEY)
    if (stored) return new Set(JSON.parse(stored))
  } catch {
    // ignore parse errors
  }
  return new Set()
}

export function usePosts() {
  const [posts, setPosts] = useState(() => {
    const saved = loadFromStorage()
    return saved ?? DEMO_POSTS
  })

  const [likedPostIds, setLikedPostIds] = useState(() => loadLikes())

  // Persist posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      // ignore quota errors
    }
  }, [posts])

  // Persist likes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify([...likedPostIds]))
    } catch {
      // ignore quota errors
    }
  }, [likedPostIds])

  function addPost({ author, teddyName, description, imageUrl }) {
    const newPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author: author.trim(),
      teddyName: teddyName.trim(),
      description: description.trim(),
      imageUrl,
      date: new Date().toISOString(),
      likes: 0,
    }
    setPosts(prev => [newPost, ...prev])
    return newPost
  }

  function toggleLike(postId) {
    const alreadyLiked = likedPostIds.has(postId)

    setLikedPostIds(prev => {
      const next = new Set(prev)
      if (alreadyLiked) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: alreadyLiked ? Math.max(0, post.likes - 1) : post.likes + 1 }
          : post
      )
    )
  }

  return { posts, likedPostIds, addPost, toggleLike }
}
