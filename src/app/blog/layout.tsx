import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

/**
 * Everything under /blog runs on a light palette — see `.blog-light` in
 * globals.css. The scope has to cover the nav and the footer as well as the
 * article, so it lives in the layout rather than on each page.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-light min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
