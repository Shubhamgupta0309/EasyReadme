import { useState } from 'react'
import { Search, Zap, FileText, Star } from 'lucide-react'

const HomePage = () => {
  const [repoUrl, setRepoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl.trim()) return
    
    setIsLoading(true)
    // TODO: Phase 2 - Add API call
    console.log('Analyzing repository:', repoUrl)
    
    // Simulate loading for now
    setTimeout(() => {
      setIsLoading(false)
      // TODO: Navigate to results page
    }, 2000)
  }

  const validateGitHubUrl = (url: string) => {
    const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
    return githubPattern.test(url)
  }

  const isValidUrl = validateGitHubUrl(repoUrl)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-github-text-primary mb-4">
          AI-Powered README Generator
        </h1>
        <p className="text-xl text-github-text-secondary mb-8 max-w-2xl mx-auto">
          Transform your GitHub repositories with professional README files. 
          Simply paste a repository link and get a comprehensive, AI-generated README in seconds.
        </p>
        
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2 text-github-text-secondary">
            <Zap className="text-github-green" size={20} />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2 text-github-text-secondary">
            <FileText className="text-github-blue" size={20} />
            <span>Professional Format</span>
          </div>
          <div className="flex items-center space-x-2 text-github-text-secondary">
            <Star className="text-yellow-400" size={20} />
            <span>Free Forever</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="card max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="repo-url" className="block text-sm font-medium text-github-text-primary mb-2">
              GitHub Repository URL
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-github-text-muted" size={20} />
              <input
                id="repo-url"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="input-field w-full pl-10"
                required
              />
            </div>
            {repoUrl && !isValidUrl && (
              <p className="text-red-400 text-sm mt-2">
                Please enter a valid GitHub repository URL
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!isValidUrl || isLoading}
            className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Analyzing Repository...</span>
              </div>
            ) : (
              'Generate README'
            )}
          </button>
        </form>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-github-blue rounded-lg flex items-center justify-center mx-auto mb-4">
            <Search className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-github-text-primary mb-2">Repository Analysis</h3>
          <p className="text-github-text-secondary">
            Automatically scans your repository structure, dependencies, and code to understand your project
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-github-green rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-github-text-primary mb-2">AI Generation</h3>
          <p className="text-github-text-secondary">
            Powered by advanced AI to create comprehensive, professional README content tailored to your project
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-github-text-primary mb-2">Quality Scoring</h3>
          <p className="text-github-text-secondary">
            Get a quality score and actionable recommendations to improve your repository's professionalism
          </p>
        </div>
      </div>

      {/* Example Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-github-text-primary mb-4">Example Usage</h2>
        <div className="bg-github-bg rounded-lg p-4 font-mono text-sm">
          <div className="text-github-text-muted mb-2"># Example repository URLs:</div>
          <div className="text-github-blue">https://github.com/facebook/react</div>
          <div className="text-github-blue">https://github.com/microsoft/vscode</div>
          <div className="text-github-blue">https://github.com/vercel/next.js</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
