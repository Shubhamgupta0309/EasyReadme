import express from 'express';
import GitHubService from '../services/githubService.js';

const router = express.Router();
const githubService = new GitHubService();

/**
 * POST /api/analyze
 * Analyze a GitHub repository
 */
router.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Repository URL is required'
      });
    }

    // Validate GitHub URL format
    const githubUrlRegex = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!githubUrlRegex.test(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid GitHub repository URL format'
      });
    }

    console.log(`📊 Starting analysis for: ${url}`);
    
    const startTime = Date.now();
    const result = await githubService.analyzeRepository(url);
    const analysisTime = Date.now() - startTime;
    
    if (result.success) {
      console.log(`✅ Analysis completed in ${analysisTime}ms`);
      console.log(`📈 Repository score: ${result.data.score}/10`);
      
      res.json({
        ...result,
        metadata: {
          analysisTime,
          timestamp: new Date().toISOString(),
          version: '2.0.0'
        }
      });
    } else {
      console.log(`❌ Analysis failed: ${result.error}`);
      res.status(400).json(result);
    }
    
  } catch (error) {
    console.error('Analysis endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during repository analysis'
    });
  }
});

/**
 * GET /api/analyze/validate
 * Validate GitHub URL without full analysis
 */
router.get('/validate', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL parameter is required'
      });
    }

    const githubUrlRegex = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!githubUrlRegex.test(url)) {
      return res.json({
        success: false,
        valid: false,
        error: 'Invalid GitHub repository URL format'
      });
    }

    try {
      const { owner, repo } = githubService.parseGitHubUrl(url);
      const repoData = await githubService.getRepository(owner, repo);
      
      res.json({
        success: true,
        valid: true,
        repository: {
          name: repoData.name,
          fullName: repoData.full_name,
          description: repoData.description,
          isPrivate: repoData.private,
          stars: repoData.stargazers_count,
          language: repoData.language
        }
      });
    } catch (error) {
      res.json({
        success: false,
        valid: false,
        error: error.message
      });
    }
    
  } catch (error) {
    console.error('Validation endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during URL validation'
    });
  }
});

/**
 * GET /api/analyze/health
 * Check GitHub API health and rate limits
 */
router.get('/health', async (req, res) => {
  try {
    const response = await githubService.api.get('/rate_limit');
    const rateLimit = response.data.rate;
    
    res.json({
      success: true,
      github: {
        authenticated: !!githubService.token,
        rateLimit: {
          limit: rateLimit.limit,
          remaining: rateLimit.remaining,
          reset: new Date(rateLimit.reset * 1000).toISOString()
        }
      },
      server: {
        status: 'operational',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check GitHub API health'
    });
  }
});

export default router;
