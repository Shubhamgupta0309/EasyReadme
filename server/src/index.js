import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js';
import aiRoutes from './routes/ai.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'README Generator API',
    version: '3.0.0',
    phase: 'Phase 3 - AI Integration Complete',
    features: [
      'Repository analysis',
      'GitHub API integration',
      'Quality scoring',
      'File structure analysis',
      'AI-powered README generation',
      'Multiple template options',
      'Smart README previews'
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '3.0.0',
    uptime: process.uptime(),
    ai_enabled: process.env.GEMINI_API_KEY ? true : false
  });
});

// API Routes
app.use('/api', analyzeRoutes);
app.use('/api/ai', aiRoutes);

// Placeholder for Phase 3 - Now using AI routes
// Keep for backward compatibility
app.post('/api/generate', (req, res) => {
  res.json({
    message: 'README generation moved to /api/ai/generate-readme',
    phase: 'Phase 3 - AI Integration Complete',
    redirect: '/api/ai/generate-readme'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
