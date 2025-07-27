# README Generator

A free AI-powered tool to automatically generate professional README files for GitHub repositories.

## Features

- Analyze GitHub repositories using public API
- AI-generated README content with proper structure
- Repository scoring (1-10) based on quality metrics
- Clean, GitHub-inspired UI
- Firebase authentication for premium features
- Mobile-responsive design

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: Firebase (Authentication)
- **AI**: Google Gemini 1.5 Pro
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

## Development Phases

### Phase 1: ✅ Project Setup + Basic UI
- Project structure
- React app with GitHub-like design
- Homepage with repository input

### Phase 2: 🔄 Backend + GitHub API
- Express server setup
- GitHub API integration
- Repository analysis

### Phase 3: 🔄 AI Integration
- Gemini AI integration
- README generation
- Results page

### Phase 4: 🔄 Authentication
- Firebase Auth setup
- Protected features

### Phase 5: 🔄 Final Polish
- Markdown editor
- Mobile optimization
- Error handling

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Google AI API key

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd readme-generator
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables
```bash
# Copy and fill the environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Start development servers
```bash
npm run dev
```

## Environment Variables

### Server (.env)
```
PORT=5000
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_ADMIN_SDK=path_to_firebase_admin_sdk.json
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/readme-generator](https://github.com/yourusername/readme-generator)
