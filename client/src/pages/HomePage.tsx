import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Zap, FileText, Star, AlertCircle } from 'lucide-react'
import apiService from '../services/api'

const HomePage = () => {
  const navigate = useNavigate()
  const [repoUrl, setRepoUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl.trim()) return
    
    setIsLoading(true)
    setError('')
    
    try {
      console.log('🔍 Analyzing repository:', repoUrl)
      const result = await apiService.analyzeRepository(repoUrl)
      console.log('📊 Analysis result received:', result)
      
      if (result.success) {
        // Store analysis results in sessionStorage for results page
        console.log('💾 Storing analysis result in sessionStorage')
        sessionStorage.setItem('analysisResult', JSON.stringify(result))
        console.log('✅ Analysis result stored, navigating to results')
        navigate('/results')
      } else {
        console.log('❌ Analysis failed:', result.error)
        setError(result.error || 'Analysis failed')
      }
    } catch (err) {
      console.error('❌ Analysis failed:', err)
      setError((err as Error).message || 'Failed to analyze repository. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isValidGitHubUrl = (url: string): boolean => {
    const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
    return githubPattern.test(url.trim())
  }

  return (
    <div className="min-h-screen bg-github-canvas">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-github-canvas to-github-canvas-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Zap className="text-github-green" size={20} />
              <span className="text-github-text-muted uppercase tracking-wider text-sm font-medium">AI-Powered Documentation</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <FileText className="text-github-blue" size={20} />
              <span className="text-github-text-muted uppercase tracking-wider text-sm font-medium">README Generator</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Star className="text-yellow-400" size={20} />
              <span className="text-github-text-muted uppercase tracking-wider text-sm font-medium">Professional Results</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-github-text mb-6">
              Generate Perfect
              <span className="block text-github-blue">README Files</span>
            </h1>
            
            <p className="text-xl text-github-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your GitHub repositories with AI-generated documentation. 
              Analyze your code, understand your project, and create comprehensive READMEs instantly.
            </p>

            {/* Repository URL Input */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-github-text-muted" size={20} />
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-github-border rounded-md text-github-text placeholder-github-text-muted focus:outline-none focus:ring-2 focus:ring-github-blue focus:border-transparent text-lg transition-colors"
                    disabled={isLoading}
                  />
                </div>
                
                {/* Validation Messages */}
                {repoUrl && !isValidGitHubUrl(repoUrl) && (
                  <div className="flex items-center text-github-danger text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    Please enter a valid GitHub repository URL
                  </div>
                )}
                
                {error && (
                  <div className="flex items-center text-github-danger text-sm bg-github-danger-subtle border border-github-danger-muted rounded-lg p-3">
                    <AlertCircle size={16} className="mr-1" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!repoUrl.trim() || !isValidGitHubUrl(repoUrl) || isLoading}
                  className="w-full bg-github-success hover:bg-github-success-emphasis disabled:bg-github-neutral-muted disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing Repository...</span>
                    </>
                  ) : (
                    <>
                      <Search className="text-white" size={24} />
                      <span>Analyze & Generate README</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-github-canvas-subtle border border-github-border rounded-lg p-6 hover:border-github-blue transition-colors duration-200">
              <div className="bg-github-success rounded-lg p-3 w-fit mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-2">
                Smart Analysis
              </h3>
              <p className="text-github-text-muted">
                AI analyzes your code structure, dependencies, and documentation to understand your project deeply.
              </p>
            </div>

            <div className="bg-github-canvas-subtle border border-github-border rounded-lg p-6 hover:border-github-blue transition-colors duration-200">
              <div className="bg-github-blue rounded-lg p-3 w-fit mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-2">
                Professional Quality
              </h3>
              <p className="text-github-text-muted">
                Generate comprehensive READMEs with proper formatting, badges, and sections that follow best practices.
              </p>
            </div>

            <div className="bg-github-canvas-subtle border border-github-border rounded-lg p-6 hover:border-github-blue transition-colors duration-200">
              <div className="bg-github-accent-emphasis rounded-lg p-3 w-fit mb-4">
                <FileText className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-2">
                Instant Results
              </h3>
              <p className="text-github-text-muted">
                Get your professional README in seconds. Copy, customize, and commit directly to your repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
