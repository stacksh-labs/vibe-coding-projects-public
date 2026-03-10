import { useState, useRef, useCallback } from 'react'

const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

const INITIAL_FORM = {
  author: '',
  teddyName: '',
  description: '',
}

export default function PostForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageDataUrl, setImageDataUrl] = useState(null)
  const [errors, setErrors] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function processImageFile(file) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Le fichier doit être une image (JPG, PNG, GIF…)' }))
      return
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrors(prev => ({ ...prev, image: `L'image ne doit pas dépasser ${MAX_FILE_SIZE_MB} Mo` }))
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      setImagePreview(dataUrl)
      setImageDataUrl(dataUrl)
      setErrors(prev => ({ ...prev, image: '' }))
    }
    reader.readAsDataURL(file)
  }

  function handleFileChange(e) {
    processImageFile(e.target.files[0])
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    processImageFile(e.dataTransfer.files[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validate() {
    const newErrors = {}
    if (!form.author.trim()) newErrors.author = 'Ton prénom est obligatoire 😊'
    if (!form.teddyName.trim()) newErrors.teddyName = 'Le nom de ta peluche est obligatoire 🧸'
    if (!form.description.trim()) newErrors.description = 'Raconte-nous quelque chose sur ta peluche ! ✍️'
    if (!imageDataUrl) newErrors.image = 'Une photo de ta peluche est obligatoire 📸'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitting(true)
    // Small delay for visual feedback
    await new Promise(r => setTimeout(r, 400))
    onSubmit({ ...form, imageUrl: imageDataUrl })
    setSubmitting(false)
    onClose()
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Formulaire de nouveau post"
    >
      {/* Overlay cliquable */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-4xl sm:rounded-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header de la modal */}
        <div className="bg-gradient-to-r from-teddy-pink via-teddy-purple to-teddy-orange p-5 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-black text-white">Partage ta peluche ! 🧸</h2>
            <p className="text-white/80 text-sm font-medium mt-0.5">Montre ta peluche préférée à tout le monde</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-black text-lg transition-colors"
            aria-label="Fermer le formulaire"
          >
            ×
          </button>
        </div>

        {/* Formulaire scrollable */}
        <form onSubmit={handleSubmit} noValidate className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">

          {/* Prénom */}
          <div>
            <label htmlFor="author" className="label">
              Ton prénom 👤
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={form.author}
              onChange={handleChange}
              placeholder="Ex : Léa, Tom, Zoé…"
              className={`input-field ${errors.author ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              maxLength={30}
              autoComplete="given-name"
            />
            {errors.author && (
              <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.author}
              </p>
            )}
          </div>

          {/* Nom peluche */}
          <div>
            <label htmlFor="teddyName" className="label">
              Nom de ta peluche 🧸
            </label>
            <input
              id="teddyName"
              name="teddyName"
              type="text"
              value={form.teddyName}
              onChange={handleChange}
              placeholder="Ex : Câlin, Dino, Princesse…"
              className={`input-field ${errors.teddyName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              maxLength={40}
            />
            {errors.teddyName && (
              <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.teddyName}
              </p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label">Photo de ta peluche 📸</label>
            <div
              className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden
                ${isDragging ? 'border-teddy-purple bg-purple-50 scale-[1.02]' : errors.image ? 'border-red-400 bg-red-50' : 'border-purple-300 bg-purple-50/50 hover:border-teddy-purple hover:bg-purple-50'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
              aria-label="Zone d'upload de photo"
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Prévisualisation"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 hover:opacity-100 bg-white/90 text-purple-700 font-bold px-3 py-1.5 rounded-full text-sm transition-opacity">
                      Changer la photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-2 text-purple-400">
                  <span className="text-4xl">{isDragging ? '✨' : '📷'}</span>
                  <p className="font-bold text-sm text-center px-4">
                    {isDragging ? 'Lâche ta photo !' : 'Clique ou glisse une photo ici'}
                  </p>
                  <p className="text-xs text-purple-300">JPG, PNG, GIF — max {MAX_FILE_SIZE_MB} Mo</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              aria-hidden="true"
              tabIndex={-1}
            />
            {errors.image && (
              <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.image}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">
              Parle-nous de ta peluche ✍️
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Pourquoi c'est ta peluche préférée ? Elle fait quoi de spécial ? Tu l'as depuis quand ?"
              rows={4}
              className={`input-field resize-none ${errors.description ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              maxLength={500}
            />
            <div className="flex justify-between items-start mt-1">
              {errors.description ? (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1">
                  <span>⚠️</span> {errors.description}
                </p>
              ) : <span />}
              <span className="text-xs text-gray-400 font-medium flex-shrink-0">
                {form.description.length}/500
              </span>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-2 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`btn-primary flex-1 flex items-center justify-center gap-2 ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <>
                  <span className="animate-spin text-lg">⏳</span>
                  <span>Publication…</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Publier !</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
