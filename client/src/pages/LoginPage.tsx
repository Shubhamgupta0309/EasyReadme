import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  // Simple authentication functions using localStorage
  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('readme_users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    
    if (user) {
      const userSession = { id: user.id, email: user.email, name: user.name }
      localStorage.setItem('readme_current_user', JSON.stringify(userSession))
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('readme_users') || '[]')
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this should be hashed
      name,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('readme_users', JSON.stringify(users))
    
    // Auto-login
    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name }
    localStorage.setItem('readme_current_user', JSON.stringify(userSession))
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (isLogin) {
        // Login logic
        const success = await login(email, password)
        if (success) {
          setSuccess('Login successful! Redirecting...')
          setTimeout(() => navigate('/'), 1500)
        } else {
          setError('Invalid email or password')
        }
      } else {
        // Register logic
        if (!name.trim()) {
          setError('Please enter your name')
          setIsLoading(false)
          return
        }
        
        const success = await register(email, password, name)
        if (success) {
          setSuccess('Account created successfully! Redirecting...')
          setTimeout(() => navigate('/'), 1500)
        } else {
          setError('User with this email already exists')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setEmail('')
    setPassword('')
    setName('')
  }

  return (
    <div className="min-h-screen bg-github-canvas flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home Link */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-github-text-muted hover:text-github-blue transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="bg-github-canvas-subtle border border-github-border rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-github-text mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-github-text-muted">
              {isLogin ? 'Enter your credentials to access your account' : 'Join README Generator today'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-github-text mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-github-border rounded-md text-github-text placeholder-github-text-muted focus:outline-none focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-github-text mb-2">
                Email address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-github-border rounded-md text-github-text placeholder-github-text-muted focus:outline-none focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-github-text mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 bg-white border border-github-border rounded-md text-github-text placeholder-github-text-muted focus:outline-none focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-github-text-muted hover:text-github-text"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center text-github-danger text-sm bg-github-danger-subtle border border-github-danger-muted rounded-lg p-3">
                <XCircle size={16} className="mr-2" />
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center text-github-success text-sm bg-github-success-subtle border border-github-success-muted rounded-lg p-3">
                <CheckCircle size={16} className="mr-2" />
                {success}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-github-success hover:bg-github-success-emphasis disabled:bg-github-neutral-muted disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-github-text-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={toggleMode}
                className="text-github-blue hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-github-accent-subtle border border-github-accent-muted rounded-lg">
            <p className="text-sm text-github-text text-center">
              <strong>Demo Mode:</strong> This uses localStorage for demonstration. 
              In production, proper authentication would be implemented with secure password hashing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
