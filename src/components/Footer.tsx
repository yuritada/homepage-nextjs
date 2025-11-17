export default function Footer() {
  return (
    <footer className="bg-surface py-6">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">&copy; 2025 Yuri Tada. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/yuritada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted text-2xl transition-colors hover:text-primary"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://x.com/jkotqmrr5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted text-2xl transition-colors hover:text-primary"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/有里-多田-ab1577364/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted text-2xl transition-colors hover:text-primary"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
