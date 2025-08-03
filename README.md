# EasyReadme 📚

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![AI](https://img.shields.io/badge/AI_Powered-FF6B6B?style=flat-square&logo=openai&logoColor=white)

> **Transform any GitHub repository into a professional README with AI-powered intelligence**

EasyReadme is an intelligent README generator that analyzes your GitHub repositories and creates beautiful, comprehensive documentation using advanced AI templates. Say goodbye to manual README writing and hello to professional documentation in seconds.

## ✨ Features

- 🤖 **AI-Powered Generation**: Google Gemini AI integration for intelligent content creation
- 🎨 **4 Professional Templates**: Minimal, Comprehensive, Developer-Focused, and User-Friendly
- 🔧 **Dynamic Customization**: Template-specific section options with real-time preview
- 📊 **Smart Analysis**: Automatic repository analysis including languages, structure, and dependencies
- 🚀 **Real-time Processing**: Instant README generation with live template switching
- 💾 **Export Options**: Download as Markdown or copy to clipboard
- 🎯 **Context-Aware**: Adapts content based on project type and technology stack
- 📱 **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Technology Stack

**Frontend:**
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and builds
- **TailwindCSS** for modern, responsive styling
- **Lucide React** for beautiful icons

**Backend:**
- **Node.js & Express** for robust API development
- **Google Gemini AI** for intelligent content generation
- **GitHub API** integration for repository analysis
- **CORS** configured for secure cross-origin requests

**Development:**
- **ESLint & Prettier** for code quality
- **Hot Module Replacement** for rapid development
- **Environment-based configuration** for deployment flexibility

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git for version control
- Google Gemini API key (optional, has fallback templates)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shubhamgupta0309/EasyReadme.git
cd EasyReadme

# Install dependencies for both client and server
npm install
cd client && npm install
cd ../server && npm install
```

### Environment Setup

```bash
# Server environment (.env in server folder)
cd server
cp .env.example .env

# Add your Google Gemini API key (optional)
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### Development

```bash
# Start the backend server (from server folder)
cd server
npm run dev

# Start the frontend client (from client folder, new terminal)
cd client
npm run dev
```

🎉 **That's it!** Visit `http://localhost:5173` to start generating amazing READMEs!

## 📖 How to Use

### 1. **Analyze Repository**
- Enter any public GitHub repository URL
- Click "Analyze Repository" 
- Our AI analyzes structure, languages, and dependencies

### 2. **Choose Your Style**
- **Minimal**: Clean and simple for basic projects
- **Comprehensive**: Full-featured for professional projects
- **Developer**: Technical focus for open-source projects
- **User-Friendly**: End-user focused with examples and FAQs

### 3. **Customize Sections**
- Select which sections to include
- Each template offers relevant customization options
- Real-time preview of your choices

### 4. **Generate & Export**
- Click "Generate README" for AI-powered content
- Copy to clipboard or download as `.md` file
- Perfect formatting ready for your repository

## 📁 Project Structure

```
EasyReadme/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   └── contexts/         # React contexts
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── server/                   # Node.js backend API
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── services/         # Business logic services
│   │   └── index.js          # Server entry point
│   ├── .env.example          # Environment template
│   └── package.json          # Backend dependencies
├── package.json              # Root package configuration
└── README.md                 # This file
```

## 🎯 Template Showcase

### 🔹 **Minimal Template**
Perfect for simple projects and quick documentation
- Essential sections only (Installation, Usage, License)
- Clean, no-clutter design
- Fast generation

### 🔹 **Comprehensive Template**  
Professional documentation for serious projects
- Full feature set with badges and statistics
- Table of contents and detailed sections
- Perfect for open-source projects

### 🔹 **Developer Template**
Technical focus for developer audiences
- Architecture and development workflow
- Testing and deployment guides
- API documentation sections

### 🔹 **User-Friendly Template**
End-user focused with emphasis on usability
- Step-by-step guides and examples
- FAQ and troubleshooting sections
- Beginner-friendly language

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes and test thoroughly
5. Commit with clear messages: `git commit -m "feat: add amazing feature"`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request with a detailed description

### Contribution Ideas
- 🎨 New template designs
- 🔧 Additional customization options
- 🌍 Internationalization support
- 📱 Mobile app version
- 🔌 IDE integrations

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder to your preferred platform
```

### Backend (Railway/Heroku)
```bash
cd server
# Add your environment variables to the platform
# Deploy with auto-detected Node.js buildpack
```

## 📊 Repository Statistics

![GitHub stars](https://img.shields.io/github/stars/Shubhamgupta0309/EasyReadme?style=social)
![GitHub forks](https://img.shields.io/github/forks/Shubhamgupta0309/EasyReadme?style=social)
![GitHub issues](https://img.shields.io/github/issues/Shubhamgupta0309/EasyReadme)
![GitHub license](https://img.shields.io/github/license/Shubhamgupta0309/EasyReadme)

## 🔮 Roadmap

- [ ] **GitHub App Integration** - One-click README updates
- [ ] **Custom Template Builder** - Create your own templates
- [ ] **Multi-language Support** - Generate READMEs in different languages
- [ ] **Version History** - Track README changes over time
- [ ] **Team Collaboration** - Share and collaborate on templates
- [ ] **API Documentation** - Auto-generate API docs from code

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed

## 🙏 Acknowledgments

- 🤖 **Google Gemini AI** for powering intelligent content generation
- 🎨 **TailwindCSS** for beautiful, responsive styling
- ⚛️ **React Team** for the amazing frontend framework
- 🚀 **GitHub API** for repository analysis capabilities
- 💎 **Open Source Community** for inspiration and feedback

## 📞 Support & Contact

Need help or have questions? We're here to assist!

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Shubhamgupta0309/EasyReadme/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Shubhamgupta0309/EasyReadme/discussions)
- 📧 **Email**: [shubhamgupta0309@example.com](mailto:shubhamgupta0309@example.com)
- 🌐 **Portfolio**: [Your Portfolio Website](https://your-portfolio-link.com)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Shubham Gupta](https://github.com/Shubhamgupta0309)

*EasyReadme - Making documentation beautiful, one README at a time.* ✨

</div>

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
