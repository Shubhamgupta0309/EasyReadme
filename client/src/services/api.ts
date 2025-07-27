const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ApiResponse {
  success: boolean;
  error?: string;
  [key: string]: any;
}

interface AnalysisResult {
  success: boolean;
  data?: {
    repository: {
      name: string;
      fullName: string;
      description: string;
      url: string;
      stars: number;
      forks: number;
      language: string;
      topics: string[];
      license: string | null;
      createdAt: string;
      updatedAt: string;
      isPrivate: boolean;
    };
    analysis: {
      languages: Record<string, number>;
      files: {
        hasReadme: boolean;
        hasLicense: boolean;
        hasPackageJson: boolean;
        hasDockerfile: boolean;
        hasGitignore: boolean;
        hasCI: boolean;
        hasTests: boolean;
        totalFiles: number;
        totalFolders: number;
        fileTypes: Record<string, number>;
      };
      commits: number;
      lastCommit: string | null;
      readme: {
        exists: boolean;
        content: any;
        size: number;
      };
    };
    score: number;
    warnings: Array<{
      type: string;
      message: string;
    }>;
  };
  error?: string;
  metadata?: {
    analysisTime: number;
    timestamp: string;
    version: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Repository analysis
  async analyzeRepository(url: string): Promise<AnalysisResult> {
    return this.request('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url }),
    }) as Promise<AnalysisResult>;
  }

  // Validate GitHub URL
  async validateRepository(url: string): Promise<ApiResponse> {
    const params = new URLSearchParams({ url });
    return this.request(`/api/validate?${params}`);
  }

  // Check server health
  async checkHealth(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // Check GitHub API health
  async checkGitHubHealth(): Promise<ApiResponse> {
    return this.request('/api/health');
  }
}

export default new ApiService();
