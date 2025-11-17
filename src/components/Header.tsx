import Navigation from '@/components/Navigation'
import Starfield from '@/components/Starfield'

export default function Header() {
  return (
    <header id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Starfield />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tighter">
          Yuri Tada
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-8 max-w-2xl">
          A Data Science student exploring the universe of technology, from web development to machine learning.
        </p>
        <a
          href="#contact"
          className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold transition-transform hover:scale-105 hover:bg-primary-light shadow-lg"
        >
          Contact Me
        </a>
      </div>
      <Navigation />
    </header>
  )
}
