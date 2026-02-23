import { useEffect } from 'react'

// Content blocks for the specialty cards.
const specialties = [
  {
    title: 'Baguette au levain',
    emoji: '🥖',
    text: 'Croûte dorée, mie légère et goût authentique grâce à un levain naturel maîtrisé.'
  },
  {
    title: 'Viennoiseries',
    emoji: '🥐',
    text: 'Des couches fondantes et croustillantes façonnées à la main chaque matin.'
  },
  {
    title: 'Pâtisseries',
    emoji: '🎂',
    text: 'Des créations gourmandes, équilibrées et préparées sur place avec soin.'
  },
  {
    title: 'Produits salés',
    emoji: '🥗',
    text: 'Quiches, sandwiches et recettes de saison pour vos pauses déjeuner.'
  }
]

function App() {
  useEffect(() => {
    // Observe sections and reveal them progressively on scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const animated = document.querySelectorAll('[data-fade]')
    animated.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="text-cocoa">
      <header className="relative min-h-[78vh] overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/35 to-cocoa/70" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-16 text-cream sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-parchment/90">Caudéran, Bordeaux</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Boulangerie Philippe Camon
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-parchment sm:text-lg">
            Artisan boulanger depuis toujours — Four à bois, levain, passion
          </p>
          <a
            href="#nous-trouver"
            className="mt-10 inline-flex w-fit items-center rounded-full border border-wheat/70 bg-wheat px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ember transition hover:bg-cream"
          >
            Nous trouver
          </a>
        </div>
      </header>

      <main>
        <section data-fade className="fade-section mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
          <h2 className="font-serif text-4xl text-ember sm:text-5xl">Notre histoire</h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cocoa/90">
            Philippe Camon est un vrai artisan boulanger. Dans son atelier de quartier à Caudéran, il façonne
            chaque journée autour de gestes précis, d’un levain vivant et d’un vieux four au feu de bois visible
            depuis la boutique. Ici, tout est fait maison : pains, viennoiseries, pâtisseries et produits salés.
          </p>
        </section>

        <section data-fade className="fade-section bg-parchment/70 py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
            <h2 className="font-serif text-4xl text-ember sm:text-5xl">Nos spécialités</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {specialties.map((item) => (
                <article key={item.title} className="rounded-2xl bg-cream p-6 shadow-warm transition hover:-translate-y-1">
                  <p className="text-4xl" aria-hidden="true">
                    {item.emoji}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-ember">{item.title}</h3>
                  <p className="mt-3 text-cocoa/85">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-fade className="fade-section mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
          <h2 className="font-serif text-4xl text-ember sm:text-5xl">Notre savoir-faire</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-wheat/40 bg-cream p-6">
              <h3 className="font-serif text-2xl text-ember">Four à bois traditionnel</h3>
              <p className="mt-3 text-cocoa/85">
                Une cuisson vivante au feu de bois, pour des pains au caractère unique et une croûte généreuse.
              </p>
            </article>
            <article className="rounded-2xl border border-wheat/40 bg-cream p-6">
              <h3 className="font-serif text-2xl text-ember">Levain naturel</h3>
              <p className="mt-3 text-cocoa/85">
                Un temps long respecté pour développer les arômes, améliorer la conservation et révéler la mie.
              </p>
            </article>
            <article className="rounded-2xl border border-wheat/40 bg-cream p-6">
              <h3 className="font-serif text-2xl text-ember">100% fait maison</h3>
              <p className="mt-3 text-cocoa/85">
                Toutes les recettes sont réalisées sur place, du pétrissage à la finition, sans compromis.
              </p>
            </article>
          </div>
        </section>

        <section id="nous-trouver" data-fade className="fade-section bg-cocoa py-20 text-cream">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:px-16">
            <div>
              <h2 className="font-serif text-4xl text-wheat sm:text-5xl">Nous trouver</h2>
              <p className="mt-6 text-lg text-parchment">69 Avenue Charles de Gaulle, 33200 Bordeaux, France</p>
              <p className="mt-2 text-parchment/90">Quartier Caudéran, Bordeaux</p>
              <a
                className="mt-8 inline-flex rounded-full bg-wheat px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ember transition hover:bg-cream"
                href="https://www.google.com/maps/dir/?api=1&destination=69+Avenue+Charles+de+Gaulle,+33200+Bordeaux,+France"
                target="_blank"
                rel="noreferrer"
              >
                Itinéraire
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-wheat/30 shadow-warm">
              <iframe
                title="Carte Boulangerie Philippe Camon"
                src="https://www.google.com/maps?q=69+Avenue+Charles+de+Gaulle,+33200+Bordeaux,+France&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[320px]"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2a1b14] px-6 py-8 text-center text-sm text-parchment sm:px-10">
        <p className="font-serif text-xl text-wheat">Boulangerie Philippe Camon</p>
        <p className="mt-2">69 Avenue Charles de Gaulle, 33200 Bordeaux, France</p>
        <p className="mt-2">© {new Date().getFullYear()} Boulangerie Philippe Camon. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default App
