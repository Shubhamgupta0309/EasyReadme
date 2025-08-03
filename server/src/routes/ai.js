import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// Generate README with AI
router.post('/generate-readme', async (req, res) => {
  try {
    const { repositoryData, options = {} } = req.body;
    
    if (!repositoryData) {
      return res.status(400).json({
        success: false,
        error: 'Repository data is required'
      });
    }

    console.log('🚀 Generating README for:', repositoryData.repository?.name);
    
    const result = await aiService.generateREADME(repositoryData, options);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ README Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate README',
      details: error.message
    });
  }
});

// Get available templates
router.get('/templates', (req, res) => {
  try {
    const templates = aiService.getTemplates();
    res.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('❌ Templates Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates'
    });
  }
});

// Preview README with different options
router.post('/preview', async (req, res) => {
  try {
    const { repositoryData, options = {} } = req.body;
    
    if (!repositoryData) {
      return res.status(400).json({
        success: false,
        error: 'Repository data is required'
      });
    }

    // Add preview flag to options
    const previewOptions = { ...options, preview: true };
    
    const result = await aiService.generateREADME(repositoryData, previewOptions);
    
    // For preview, we might want to truncate or format differently
    const preview = {
      ...result,
      content: result.content.substring(0, 2000) + (result.content.length > 2000 ? '...\n\n*[Preview truncated - full README available after generation]*' : ''),
      isPreview: true
    };
    
    res.json(preview);
    
  } catch (error) {
    console.error('❌ README Preview Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate README preview',
      details: error.message
    });
  }
});

export default router;
