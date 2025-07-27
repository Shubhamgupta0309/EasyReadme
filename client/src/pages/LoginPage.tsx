const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-github-text-primary mb-4 text-center">Sign In</h1>
        <p className="text-github-text-secondary text-center mb-6">
          Authentication will be implemented in Phase 4 with Firebase.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-github-text-primary mb-2">
              Email
            </label>
            <input 
              type="email" 
              className="input-field w-full" 
              placeholder="your@email.com"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-github-text-primary mb-2">
              Password
            </label>
            <input 
              type="password" 
              className="input-field w-full" 
              placeholder="••••••••"
              disabled
            />
          </div>
          
          <button className="btn-primary w-full" disabled>
            Sign In (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
