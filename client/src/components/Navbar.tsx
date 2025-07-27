import { Link } from 'react-router-dom'
import { Github, BookOpen } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-github-bg-secondary border-b border-github-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-github-text-primary hover:text-white transition-colors"
          >
            <BookOpen size={24} />
            <span className="font-semibold text-lg">README Generator</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-github-text-secondary hover:text-github-text-primary transition-colors"
            >
              Home
            </Link>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-github-text-secondary hover:text-github-text-primary transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            <Link 
              to="/login" 
              className="btn-secondary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
