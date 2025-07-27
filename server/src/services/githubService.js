import axios from 'axios';

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.token = process.env.GITHUB_TOKEN;
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'README-Generator/1.0.0',
        ...(this.token && { 'Authorization': `token ${this.token}` })
      }
    });
  }

  /**
   * Parse GitHub URL to extract owner and repo
   */
  parseGitHubUrl(url) {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)\/?$/;
    const match = url.match(regex);
    
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    
    return {
      owner: match[1],
      repo: match[2].replace('.git', '')
    };
  }

  /**
   * Get repository basic information
   */
  async getRepository(owner, repo) {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Repository not found or is private');
      }
      throw new Error(`Failed to fetch repository: ${error.message}`);
    }
  }

  /**
   * Get repository contents (files and folders)
   */
  async getContents(owner, repo, path = '') {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/contents/${path}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch contents: ${error.message}`);
    }
  }

  /**
   * Get repository languages
   */
  async getLanguages(owner, repo) {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/languages`);
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch languages:', error.message);
      return {};
    }
  }

  /**
   * Get repository commits (for activity analysis)
   */
  async getCommits(owner, repo, limit = 10) {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/commits`, {
        params: { per_page: limit }
      });
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch commits:', error.message);
      return [];
    }
  }

  /**
   * Get repository README content
   */
  async getReadme(owner, repo) {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/readme`);
      return {
        exists: true,
        content: response.data,
        size: response.data.size
      };
    } catch (error) {
      return {
        exists: false,
        content: null,
        size: 0
      };
    }
  }

  /**
   * Comprehensive repository analysis
   */
  async analyzeRepository(url) {
    const { owner, repo } = this.parseGitHubUrl(url);
    
    console.log(`🔍 Analyzing repository: ${owner}/${repo}`);
    
    try {
      // Fetch all data in parallel
      const [
        repoData,
        contents,
        languages,
        commits,
        readme
      ] = await Promise.all([
        this.getRepository(owner, repo),
        this.getContents(owner, repo),
        this.getLanguages(owner, repo),
        this.getCommits(owner, repo, 5),
        this.getReadme(owner, repo)
      ]);

      // Analyze file structure
      const fileAnalysis = this.analyzeFileStructure(contents);
      
      // Calculate repository score
      const score = this.calculateRepoScore({
        repo: repoData,
        files: fileAnalysis,
        languages,
        commits,
        readme
      });

      // Generate warnings
      const warnings = this.generateWarnings({
        repo: repoData,
        files: fileAnalysis,
        readme,
        commits
      });

      return {
        success: true,
        data: {
          repository: {
            name: repoData.name,
            fullName: repoData.full_name,
            description: repoData.description,
            url: repoData.html_url,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            language: repoData.language,
            topics: repoData.topics || [],
            license: repoData.license?.name || null,
            createdAt: repoData.created_at,
            updatedAt: repoData.updated_at,
            isPrivate: repoData.private
          },
          analysis: {
            languages,
            files: fileAnalysis,
            commits: commits.length,
            lastCommit: commits[0]?.commit?.author?.date || null,
            readme
          },
          score,
          warnings
        }
      };
    } catch (error) {
      console.error('Analysis error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Analyze file structure for common patterns
   */
  analyzeFileStructure(contents) {
    const files = contents.filter(item => item.type === 'file');
    const folders = contents.filter(item => item.type === 'dir');
    
    const fileNames = files.map(f => f.name.toLowerCase());
    const folderNames = folders.map(f => f.name.toLowerCase());
    
    return {
      hasReadme: fileNames.some(name => name.startsWith('readme')),
      hasLicense: fileNames.some(name => name.startsWith('license')),
      hasPackageJson: fileNames.includes('package.json'),
      hasDockerfile: fileNames.includes('dockerfile'),
      hasGitignore: fileNames.includes('.gitignore'),
      hasCI: folderNames.includes('.github') || fileNames.some(name => 
        name.includes('.yml') || name.includes('.yaml')
      ),
      hasTests: folderNames.some(name => 
        name.includes('test') || name.includes('spec')
      ) || fileNames.some(name => 
        name.includes('test') || name.includes('spec')
      ),
      totalFiles: files.length,
      totalFolders: folders.length,
      fileTypes: this.getFileTypes(files)
    };
  }

  /**
   * Get file types distribution
   */
  getFileTypes(files) {
    const types = {};
    files.forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext && ext !== file.name.toLowerCase()) {
        types[ext] = (types[ext] || 0) + 1;
      }
    });
    return types;
  }

  /**
   * Calculate repository quality score (1-10)
   */
  calculateRepoScore({ repo, files, languages, commits, readme }) {
    let score = 0;
    
    // Basic repository info (2 points)
    if (repo.description) score += 1;
    if (repo.topics && repo.topics.length > 0) score += 1;
    
    // Documentation (3 points)
    if (readme.exists) score += 2;
    if (files.hasLicense) score += 1;
    
    // Code quality indicators (2 points)
    if (files.hasGitignore) score += 0.5;
    if (files.hasTests) score += 1;
    if (files.hasCI) score += 0.5;
    
    // Activity and maintenance (2 points)
    if (commits.length > 0) score += 1;
    const lastCommitDate = new Date(commits[0]?.commit?.author?.date);
    const daysSinceLastCommit = (Date.now() - lastCommitDate) / (1000 * 60 * 60 * 24);
    if (daysSinceLastCommit < 30) score += 1;
    else if (daysSinceLastCommit < 90) score += 0.5;
    
    // Popularity (1 point)
    if (repo.stargazers_count > 0) score += 0.5;
    if (repo.forks_count > 0) score += 0.5;
    
    return Math.min(Math.round(score * 10) / 10, 10);
  }

  /**
   * Generate warnings for repository issues
   */
  generateWarnings({ repo, files, readme, commits }) {
    const warnings = [];
    
    if (repo.private) {
      warnings.push({
        type: 'privacy',
        message: 'Repository is private - limited analysis available'
      });
    }
    
    if (!readme.exists) {
      warnings.push({
        type: 'documentation',
        message: 'No README file found - consider adding project documentation'
      });
    }
    
    if (!files.hasLicense) {
      warnings.push({
        type: 'legal',
        message: 'No license file found - consider adding a license'
      });
    }
    
    if (commits.length > 0) {
      const lastCommitDate = new Date(commits[0]?.commit?.author?.date);
      const daysSinceLastCommit = (Date.now() - lastCommitDate) / (1000 * 60 * 60 * 24);
      
      if (daysSinceLastCommit > 365) {
        warnings.push({
          type: 'maintenance',
          message: 'Repository appears inactive - last commit over 1 year ago'
        });
      } else if (daysSinceLastCommit > 90) {
        warnings.push({
          type: 'maintenance',
          message: 'Repository may need maintenance - last commit over 3 months ago'
        });
      }
    }
    
    if (!files.hasTests) {
      warnings.push({
        type: 'quality',
        message: 'No test files detected - consider adding tests'
      });
    }
    
    return warnings;
  }
}

export default GitHubService;
