export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="w-4/5 max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center">
          <p>&copy; 2025 多田有里. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a 
              href="https://github.com/yuritada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-2xl transition-colors hover:text-[#6c63ff]"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://x.com/jkotqmrr5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-2xl transition-colors hover:text-[#6c63ff]"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/有里-多田-ab1577364/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-2xl transition-colors hover:text-[#6c63ff]"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}