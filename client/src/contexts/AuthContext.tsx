import React from 'react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Get stored users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userSession = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          createdAt: foundUser.createdAt
        }
        
        setUser(userSession)
        localStorage.setItem('user', JSON.stringify(userSession))
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false // User already exists
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, this should be hashed
        name,
        createdAt: new Date().toISOString()
      }
      
      // Save to localStorage
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // Auto-login the new user
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
      
      setUser(userSession)
      localStorage.setItem('user', JSON.stringify(userSession))
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
