import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Github, Star, GitFork, Eye, FileText, AlertTriangle, CheckCircle, Download, Copy, Settings, Sparkles, Zap, Loader2 } from 'lucide-react'
import api from '../services/api'

const ResultsPage = () => {
  const [analysisResult, setAnalysisResult] = React.useState<any>(null)
  const [readmeContent, setReadmeContent] = React.useState<string>('')
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [readmeGenerated, setReadmeGenerated] = React.useState(false)
  const [generationOptions, setGenerationOptions] = React.useState({
    template: 'comprehensive',
    includeInstallation: true,
    includeUsage: true,
    includeContributing: true,
    includeLicense: true,
    customSections: []
  })
  const [availableSections, setAvailableSections] = React.useState<any[]>([])
  const [templates, setTemplates] = React.useState<any>({
    comprehensive: {
      name: 'Comprehensive',
      description: 'Detailed README with all sections and features'
    },
    minimal: {
      name: 'Minimal',
      description: 'Clean and simple README with essential information'
    },
    developer: {
      name: 'Developer-Focused',
      description: 'Technical README for developers and contributors'
    },
    user: {
      name: 'User-Friendly',
      description: 'End-user focused with emphasis on usage and examples'
    }
  })
  const [activeTab, setActiveTab] = React.useState<'analysis' | 'readme'>('analysis')
  const [copySuccess, setCopySuccess] = React.useState(false)

  React.useEffect(() => {
    // Get analysis result from sessionStorage
    const result = sessionStorage.getItem('analysisResult')
    console.log('📋 SessionStorage analysisResult:', result)
    
    if (result) {
      const parsedResult = JSON.parse(result)
      console.log('📊 Parsed analysis result:', parsedResult)
      setAnalysisResult(parsedResult)
    } else {
      console.log('❌ No analysis result found in sessionStorage')
    }

    // Load available templates
    loadTemplates()
  }, [])

  // Update available sections when template changes
  React.useEffect(() => {
    if (templates[generationOptions.template]?.availableOptions) {
      setAvailableSections(templates[generationOptions.template].availableOptions)
      
      // Reset generation options to template defaults
      const defaultOptions: any = { template: generationOptions.template }
      templates[generationOptions.template].availableOptions.forEach((option: any) => {
        defaultOptions[option.key] = option.default
      })
      setGenerationOptions((prev: any) => ({ ...prev, ...defaultOptions }))
    }
  }, [generationOptions.template, templates])

  const loadTemplates = async () => {
    try {
      console.log('🎨 Loading templates...')
      const response = await api.getTemplates()
      console.log('📝 Templates response:', response)
      
      if (response.success) {
        setTemplates(response.templates)
        console.log('✅ Templates loaded:', response.templates)
      } else {
        console.log('❌ Failed to load templates:', response.error)
      }
    } catch (error) {
      console.error('❌ Template loading error:', error)
    }
  }

  const generateReadme = async () => {
    if (!analysisResult) {
      console.log('❌ No analysis result available for README generation')
      return
    }

    console.log('🚀 Starting README generation...')
    console.log('📊 Analysis result:', analysisResult)
    console.log('⚙️ Generation options:', generationOptions)

    setIsGenerating(true)
    try {
      const response = await api.generateReadme(analysisResult, generationOptions)
      console.log('📝 README generation response:', response)
      
      if (response.success) {
        setReadmeContent(response.content)
        setReadmeGenerated(true)
        setActiveTab('readme')
        console.log('✅ README generated successfully')
      } else {
        console.error('❌ README generation failed:', response.error)
      }
    } catch (error) {
      console.error('❌ README generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(readmeContent)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadReadme = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${analysisResult?.data?.repository?.name || 'README'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-github-canvas py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-github-text-muted hover:text-github-blue transition-colors mb-8"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
            
            <div className="bg-white border border-github-border rounded-lg p-12 shadow-sm">
              <FileText className="mx-auto text-github-text-muted mb-4" size={48} />
              <h1 className="text-2xl font-bold text-github-text mb-4">No Analysis Found</h1>
              <p className="text-github-text-muted mb-6">
                No repository analysis data found. Please go back and analyze a repository first.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center bg-github-success hover:bg-github-success-emphasis text-white px-4 py-2 rounded-md transition-colors"
              >
                Analyze Repository
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-github-canvas py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-github-text-muted hover:text-github-blue transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-github-text mb-2">Repository Analysis Complete</h1>
          <p className="text-github-text-muted">
            Analysis complete! Now generate your professional README with AI.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-github-border rounded-lg mb-6 shadow-sm">
          <div className="border-b border-github-border">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'analysis'
                    ? 'border-github-blue text-github-blue'
                    : 'border-transparent text-github-text-muted hover:text-github-text'
                }`}
              >
                <Eye className="inline mr-2" size={16} />
                Analysis Results
              </button>
              <button
                onClick={() => setActiveTab('readme')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'readme'
                    ? 'border-github-blue text-github-blue'
                    : 'border-transparent text-github-text-muted hover:text-github-text'
                }`}
              >
                <Sparkles className="inline mr-2" size={16} />
                AI README Generator
              </button>
            </nav>
          </div>

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Repository Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-github-text">Repository Overview</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Repository Name</span>
                      <code className="text-sm bg-github-canvas-subtle px-2 py-1 rounded">
                        {analysisResult?.data?.repository?.name || 'awesome-project'}
                      </code>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Full Name</span>
                      <code className="text-sm bg-github-canvas-subtle px-2 py-1 rounded">
                        {analysisResult?.data?.repository?.fullName || 'user/repo'}
                      </code>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Primary Language</span>
                      <span className="text-github-text font-medium">
                        {analysisResult?.data?.repository?.language || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Stars</span>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500" />
                        <span>{analysisResult?.data?.repository?.stars || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Forks</span>
                      <div className="flex items-center space-x-1">
                        <GitFork size={14} className="text-github-text-muted" />
                        <span>{analysisResult?.data?.repository?.forks || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Total Files</span>
                      <span className="text-github-text font-medium">
                        {analysisResult?.data?.analysis?.files?.totalFiles || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-github-text">Code Quality</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Has README</span>
                      {analysisResult?.data?.analysis?.files?.hasReadme ? (
                        <CheckCircle className="text-github-success" size={16} />
                      ) : (
                        <AlertTriangle className="text-github-attention" size={16} />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Has License</span>
                      {analysisResult?.data?.analysis?.files?.hasLicense ? (
                        <CheckCircle className="text-github-success" size={16} />
                      ) : (
                        <AlertTriangle className="text-github-attention" size={16} />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Has Tests</span>
                      {analysisResult?.data?.analysis?.files?.hasTests ? (
                        <CheckCircle className="text-github-success" size={16} />
                      ) : (
                        <AlertTriangle className="text-github-attention" size={16} />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-github-text">Has CI/CD</span>
                      {analysisResult?.data?.analysis?.files?.hasCI ? (
                        <CheckCircle className="text-github-success" size={16} />
                      ) : (
                        <AlertTriangle className="text-github-attention" size={16} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-github-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-github-text font-medium">Ready to generate your README?</p>
                    <p className="text-github-text-muted text-sm">
                      Use our AI-powered generator to create a professional README.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('readme')}
                    className="bg-github-success hover:bg-github-success-emphasis text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                  >
                    <Sparkles size={16} />
                    <span>Generate README</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* README Generator Tab */}
          {activeTab === 'readme' && (
            <div className="p-6">
              {!readmeGenerated ? (
                <div className="space-y-6">
                  {/* Template Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-github-text mb-4">Choose Your Template</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(templates).map(([key, template]: [string, any]) => (
                        <button
                          key={key}
                          onClick={() => setGenerationOptions({ ...generationOptions, template: key })}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            generationOptions.template === key
                              ? 'border-github-blue bg-github-accent-subtle'
                              : 'border-github-border hover:border-github-border-muted'
                          }`}
                        >
                          <h4 className="font-medium text-github-text mb-1">{template.name}</h4>
                          <p className="text-sm text-github-text-muted">{template.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-github-text mb-4">
                      <Settings className="inline mr-2" size={20} />
                      Customize Sections
                    </h3>
                    <p className="text-sm text-github-text-muted mb-4">
                      Choose which sections to include in your {templates[generationOptions.template]?.name || 'selected'} README template.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {availableSections.length > 0 ? availableSections.map((section: any) => (
                        <div key={section.key} className="space-y-1">
                          <label className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={generationOptions[section.key] || false}
                              onChange={(e) => setGenerationOptions({
                                ...generationOptions,
                                [section.key]: e.target.checked
                              })}
                              className="rounded border-github-border mt-1"
                            />
                            <div className="flex-1">
                              <span className="text-github-text font-medium">{section.label}</span>
                              <p className="text-xs text-github-text-muted">{section.description}</p>
                            </div>
                          </label>
                        </div>
                      )) : (
                        // Fallback for when template sections aren't loaded yet
                        <>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={generationOptions.includeInstallation}
                              onChange={(e) => setGenerationOptions({
                                ...generationOptions,
                                includeInstallation: e.target.checked
                              })}
                              className="rounded border-github-border"
                            />
                            <span className="text-github-text">Installation Instructions</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={generationOptions.includeUsage}
                              onChange={(e) => setGenerationOptions({
                                ...generationOptions,
                                includeUsage: e.target.checked
                              })}
                              className="rounded border-github-border"
                            />
                            <span className="text-github-text">Usage Examples</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={generationOptions.includeContributing}
                              onChange={(e) => setGenerationOptions({
                                ...generationOptions,
                                includeContributing: e.target.checked
                              })}
                              className="rounded border-github-border"
                            />
                            <span className="text-github-text">Contributing Guidelines</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={generationOptions.includeLicense}
                              onChange={(e) => setGenerationOptions({
                                ...generationOptions,
                                includeLicense: e.target.checked
                              })}
                              className="rounded border-github-border"
                            />
                            <span className="text-github-text">License Information</span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={generateReadme}
                      disabled={isGenerating}
                      className="bg-github-success hover:bg-github-success-emphasis disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-3 transition-colors"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Generating README...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={20} />
                          <span>Generate Professional README</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Generated README Display */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-github-text">Your Generated README</h3>
                    <div className="flex space-x-3">
                      <button
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded-md border transition-colors flex items-center space-x-2 ${
                          copySuccess
                            ? 'bg-github-success text-white border-github-success'
                            : 'border-github-border hover:border-github-border-muted text-github-text'
                        }`}
                      >
                        <Copy size={16} />
                        <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={downloadReadme}
                        className="bg-github-blue hover:bg-github-blue-emphasis text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => {
                          setReadmeGenerated(false)
                          setReadmeContent('')
                        }}
                        className="border border-github-border hover:border-github-border-muted text-github-text px-4 py-2 rounded-md transition-colors"
                      >
                        Generate New
                      </button>
                    </div>
                  </div>

                  <div className="bg-github-canvas-subtle border border-github-border rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-github-text">
                      {readmeContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
