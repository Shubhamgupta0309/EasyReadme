import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'README Generator API', 
    version: '1.0.0',
    phase: 'Phase 1 - Basic Setup Complete'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Placeholder routes for future phases
app.get('/api/analyze', (req, res) => {
  res.json({ 
    message: 'Repository analysis endpoint - Coming in Phase 2',
    phase: 'Phase 2'
  });
});

app.post('/api/generate', (req, res) => {
  res.json({ 
    message: 'README generation endpoint - Coming in Phase 3',
    phase: 'Phase 3'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 README Generator API v1.0.0`);
  console.log(`🎯 Phase 1: Basic setup complete!`);
});
