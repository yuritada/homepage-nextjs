import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

/**
 * The document archive shares the blog's light palette — see `.blog-light` in
 * globals.css — because both are reading surfaces, and an embedded PDF is a white
 * page either way. The scope has to cover the nav and footer, so it lives here.
 */
export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-light min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
