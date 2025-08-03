import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Github, BookOpen, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState<any>(null)
  const [showDropdown, setShowDropdown] = React.useState(false)

  React.useEffect(() => {
    // Check for logged in user
    const currentUser = localStorage.getItem('readme_current_user')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }

    // Listen for login/logout events
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('readme_current_user')
      setUser(updatedUser ? JSON.parse(updatedUser) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('readme_current_user')
    setUser(null)
    setShowDropdown(false)
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-github-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-github-text hover:text-github-blue transition-colors"
          >
            <BookOpen size={24} />
            <span className="font-semibold text-lg">README Generator</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-github-text-muted hover:text-github-text transition-colors"
            >
              Home
            </Link>
            
            <a 
              href="https://github.com/Shubhamgupta0309/EasyReadme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-github-text-muted hover:text-github-text transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-white border border-github-border hover:border-github-blue rounded-md px-3 py-1.5 transition-colors"
                >
                  <User size={16} className="text-github-text-muted" />
                  <span className="text-sm text-github-text font-medium">{user.name}</span>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-github-border rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-github-border">
                      <p className="text-sm font-medium text-github-text">{user.name}</p>
                      <p className="text-xs text-github-text-muted">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-github-text hover:bg-github-canvas-subtle flex items-center space-x-2 transition-colors"
                    >
                      <LogOut size={14} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-github-success hover:bg-github-success-emphasis text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
