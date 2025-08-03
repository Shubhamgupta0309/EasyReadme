import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo-key');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateREADME(repositoryData, options = {}) {
    try {
      const {
        template = 'comprehensive',
        includeInstallation = true,
        includeUsage = true,
        includeContributing = true,
        includeLicense = true,
        customSections = []
      } = options;

      const prompt = this.buildPrompt(repositoryData, {
        template,
        includeInstallation,
        includeUsage,
        includeContributing,
        includeLicense,
        customSections
      });

      console.log('🤖 Generating README with Gemini AI...');
      
      // For demo purposes, if no API key is provided, return a mock response
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'demo-key') {
        return this.generateMockREADME(repositoryData, options);
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        content: text,
        metadata: {
          model: 'gemini-pro',
          timestamp: new Date().toISOString(),
          template: template,
          tokenCount: text.length,
          options: options
        }
      };

    } catch (error) {
      console.error('❌ AI Generation Error:', error);
      
      // Fallback to mock README if AI fails
      console.log('🔄 Falling back to template-based README...');
      return this.generateMockREADME(repositoryData, options);
    }
  }

  buildPrompt(repoData, options) {
    // Handle both nested and direct data structures
    const repository = repoData?.data?.repository || repoData?.repository;
    const analysis = repoData?.data?.analysis || repoData?.analysis;
    
    console.log('🔍 Building prompt with repository:', repository?.name);
    console.log('📊 Analysis data:', analysis?.files);
    
    return `
Generate a professional, comprehensive README.md file for this GitHub repository:

## Repository Information:
- Name: ${repository?.name || 'Unknown'}
- Full Name: ${repository?.fullName || 'Unknown'}
- Description: ${repository?.description || 'No description provided'}
- Primary Language: ${repository?.language || 'Unknown'}
- Topics/Tags: ${repository?.topics?.join(', ') || 'None'}
- License: ${repository?.license || 'No license specified'}
- Stars: ${repository?.stars || 0}
- Forks: ${repository?.forks || 0}
- Created: ${repository?.createdAt || 'Unknown'}
- Last Updated: ${repository?.updatedAt || 'Unknown'}

## Technical Analysis:
- Languages Used: ${Object.entries(analysis?.languages || {}).map(([lang, percentage]) => `${lang} (${percentage}%)`).join(', ') || 'Not specified'}
- Has Package.json: ${analysis?.files?.hasPackageJson ? 'Yes' : 'No'}
- Has Docker: ${analysis?.files?.hasDockerfile ? 'Yes' : 'No'}
- Has Tests: ${analysis?.files?.hasTests ? 'Yes' : 'No'}
- Has CI/CD: ${analysis?.files?.hasCI ? 'Yes' : 'No'}
- Has License: ${analysis?.files?.hasLicense ? 'Yes' : 'No'}
- Has README: ${analysis?.files?.hasReadme ? 'Yes' : 'No'}
- Total Files: ${analysis?.files?.totalFiles || 0}
- Total Folders: ${analysis?.files?.totalFolders || 0}
- File Types: ${Object.entries(analysis?.files?.fileTypes || {}).map(([type, count]) => `${type}: ${count}`).join(', ') || 'None'}

## Template Requirements:
- Template Style: ${options.template}
- Include Installation: ${options.includeInstallation}
- Include Usage Examples: ${options.includeUsage}
- Include Contributing Guidelines: ${options.includeContributing}
- Include License Section: ${options.includeLicense}
- Custom Sections: ${options.customSections.join(', ') || 'None'}

## Instructions:
Create a README.md that follows these guidelines:
1. Use proper Markdown formatting with headers, code blocks, and badges
2. Include relevant badges for the technology stack
3. Write clear, professional descriptions
4. Add practical installation and usage instructions
5. Include appropriate emojis to make it visually appealing
6. Structure it logically with a table of contents for longer READMEs
7. Make it engaging and informative for potential contributors
8. Include placeholder text where specific project details aren't available
9. Ensure it follows GitHub README best practices

Generate ONLY the README.md content, no additional explanations.
Generate ONLY the README.md content, no additional explanations.
`;
  }

  generateMockREADME(repoData, options) {
    // Handle both nested and direct data structures
    const repository = repoData?.data?.repository || repoData?.repository;
    const analysis = repoData?.data?.analysis || repoData?.analysis;
    
    console.log('📝 Generating mock README for repository:', repository?.name);
    console.log('🎨 Using template:', options.template);
    
    // Route to different template generators based on selected template
    switch(options.template) {
      case 'minimal':
        return this.generateMinimalTemplate(repository, analysis, options);
      case 'developer':
        return this.generateDeveloperTemplate(repository, analysis, options);
      case 'user':
        return this.generateUserTemplate(repository, analysis, options);
      case 'comprehensive':
      default:
        return this.generateComprehensiveTemplate(repository, analysis, options);
    }
  }

  generateComprehensiveTemplate(repository, analysis, options) {
    const repoName = repository?.name || 'My Awesome Project';
    const description = repository?.description || `${repoName} - A comprehensive and feature-rich project built with modern technologies.`;
    const primaryLang = repository?.language || 'Not specified';
    const hasTests = analysis?.files?.hasTests;
    const hasDocker = analysis?.files?.hasDockerfile;
    const hasPackageJson = analysis?.files?.hasPackageJson;
    const totalFiles = analysis?.files?.totalFiles || 0;
    const hasLicense = analysis?.files?.hasLicense;

    const badges = options.includeBadges ? this.generateBadges(repository, analysis) : '';
    const toc = options.includeTOC ? this.generateTableOfContents(options) : '';
    
    const content = `# ${repoName}

${badges}

${description}

${toc}

${options.includeFeatures ? `## ✨ Features

- 🚀 **High Performance**: Optimized for speed and efficiency
- 🎨 **Modern UI/UX**: Beautiful and intuitive user interface
- 🔧 **Highly Configurable**: Extensive customization options
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🛡️ **Security First**: Built with security best practices
- 🌐 **Cross-Platform**: Compatible with multiple platforms
- 📊 **Analytics Ready**: Built-in analytics and monitoring

` : ''}## 🛠️ Technology Stack

- **Primary Language:** ${primaryLang}
${analysis?.languages ? Object.entries(analysis.languages).slice(0, 5).map(([lang, percentage]) => `- **${lang}:** ${percentage}%`).join('\n') : ''}
${hasDocker ? '- **Containerization:** Docker & Docker Compose' : ''}
${hasTests ? '- **Testing:** Comprehensive test suite with automated testing' : ''}
${hasPackageJson ? '- **Package Management:** NPM/Yarn with dependency management' : ''}

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0 or higher)
- npm or yarn package manager
${hasDocker ? '- Docker and Docker Compose' : ''}
- Git for version control

${options.includeInstallation ? this.generateInstallationSection(hasPackageJson, hasDocker) : ''}

${options.includeUsage ? this.generateUsageSection(primaryLang) : ''}

${options.includeProjectStructure ? `## 📁 Project Structure

\`\`\`
${repoName}/
${Object.entries(analysis?.files?.fileTypes || {}).map(([type, count]) => `├── *.${type}              # ${count} ${type} files`).join('\n')}
${hasPackageJson ? '├── package.json        # Dependencies and scripts' : ''}
${hasDocker ? '├── Dockerfile          # Container configuration' : ''}
${hasLicense ? '├── LICENSE             # License information' : ''}
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation (${totalFiles} total files)
\`\`\`

` : ''}${options.includeStats ? `## 📊 Repository Statistics

| Metric | Value |
|--------|-------|
| **Total Files** | ${totalFiles} |
| **Total Folders** | ${analysis?.files?.totalFolders || 0} |
| **Languages** | ${Object.keys(analysis?.languages || {}).length || 'Not detected'} |
| **GitHub Stars** | ${repository?.stars || 0} ⭐ |
| **Forks** | ${repository?.forks || 0} 🍴 |
| **Created** | ${repository?.createdAt ? new Date(repository.createdAt).toLocaleDateString() : 'Unknown'} |
| **Last Updated** | ${repository?.updatedAt ? new Date(repository.updatedAt).toLocaleDateString() : 'Unknown'} |

` : ''}${options.includeContributing ? `## 🤝 Contributing

We welcome and appreciate contributions from the community! Here's how you can contribute:

### Getting Started
1. **Fork** the repository on GitHub
2. **Clone** your forked repository locally
3. **Create** a new feature branch (\`git checkout -b feature/amazing-feature\`)
4. **Make** your changes and commit them (\`git commit -m 'Add amazing feature'\`)
5. **Push** to your branch (\`git push origin feature/amazing-feature\`)
6. **Submit** a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🧪 Testing

Run the test suite to ensure everything works correctly:

\`\`\`bash
# Run all tests
${hasPackageJson ? 'npm test' : 'python -m pytest'}

# Run tests with coverage
${hasPackageJson ? 'npm run test:coverage' : 'python -m pytest --cov'}

# Run specific test file
${hasPackageJson ? 'npm test -- specific-test.js' : 'pytest specific_test.py'}
\`\`\`

` : ''}${options.includeLicense ? `## 📜 License

This project is licensed under the **${repository?.license || 'MIT'}** License. See the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability limitations
- ❌ Warranty limitations

` : ''}## 🙏 Acknowledgments

- 👥 **Contributors**: Thanks to all the amazing contributors who made this project possible
- 🌟 **Community**: Grateful for the open-source community's support and feedback
- 📚 **Libraries**: Built with incredible open-source libraries and frameworks
- 💡 **Inspiration**: Inspired by industry best practices and modern development standards

${options.includeSupport ? `## 📞 Support & Contact

Need help or have questions? We're here to assist!

- 📧 **Email**: [support@example.com](mailto:support@example.com)
- 🐛 **Bug Reports**: [GitHub Issues](${repository?.url || '#'}/issues)
- 💬 **Discussions**: [GitHub Discussions](${repository?.url || '#'}/discussions)
- 📖 **Documentation**: [Project Wiki](${repository?.url || '#'}/wiki)
- 💼 **Professional Support**: Available for enterprise customers

` : ''}

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [${repository?.fullName?.split('/')[0] || 'the development team'}](https://github.com/${repository?.fullName?.split('/')[0] || 'developer'})

*${repoName} - Building the future, one commit at a time.*

</div>
`;

    return {
      success: true,
      content: content,
      metadata: {
        model: 'comprehensive-template',
        timestamp: new Date().toISOString(),
        template: 'comprehensive',
        tokenCount: content.length,
        options: options,
        note: 'Generated using comprehensive template with full feature set.'
      }
    };
  }

  generateMinimalTemplate(repository, analysis, options) {
    const repoName = repository?.name || 'My Project';
    const description = repository?.description || `${repoName} - A clean and simple project.`;
    const primaryLang = repository?.language || 'Not specified';
    
    const content = `# ${repoName}

${description}

## Installation

\`\`\`bash
git clone ${repository?.url || 'your-repo-url'}
cd ${repoName.toLowerCase().replace(/\s+/g, '-')}
${primaryLang === 'JavaScript' || analysis?.files?.hasPackageJson ? 'npm install' : '# Follow language-specific setup'}
\`\`\`

## Usage

\`\`\`bash
${primaryLang === 'JavaScript' || analysis?.files?.hasPackageJson ? 'npm start' : '# Run according to your project type'}
\`\`\`

## License

${repository?.license || 'MIT'} License
`;

    return {
      success: true,
      content: content,
      metadata: {
        model: 'minimal-template',
        timestamp: new Date().toISOString(),
        template: 'minimal',
        tokenCount: content.length,
        options: options,
        note: 'Generated using minimal template with essential sections only.'
      }
    };
  }

  generateDeveloperTemplate(repository, analysis, options) {
    const repoName = repository?.name || 'Developer Project';
    const description = repository?.description || `${repoName} - A technical project for developers.`;
    const primaryLang = repository?.language || 'Not specified';
    const hasTests = analysis?.files?.hasTests;
    const hasDocker = analysis?.files?.hasDockerfile;
    const hasPackageJson = analysis?.files?.hasPackageJson;

    const content = `# ${repoName}

${description}

## 🏗️ Architecture

This project follows modern software architecture principles with a focus on:
- **Modularity**: Clean separation of concerns
- **Scalability**: Designed to handle growth
- **Maintainability**: Easy to understand and modify
- **Testing**: Comprehensive test coverage

## 🛠️ Development Setup

### Prerequisites
- ${primaryLang} development environment
${hasDocker ? '- Docker and Docker Compose' : ''}
${hasPackageJson ? '- Node.js and npm' : ''}

### Installation
\`\`\`bash
git clone ${repository?.url || 'your-repo-url'}
cd ${repoName.toLowerCase().replace(/\s+/g, '-')}
${hasPackageJson ? 'npm install' : '# Install dependencies'}
${hasDocker ? 'docker-compose up -d' : ''}
\`\`\`

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Run tests: \`${hasTests ? (hasPackageJson ? 'npm test' : 'pytest') : 'Run your tests'}\`
4. Submit PR

## 🧪 Testing

${hasTests ? `
\`\`\`bash
# Run all tests
${hasPackageJson ? 'npm test' : 'python -m pytest'}

# Run with coverage
${hasPackageJson ? 'npm run test:coverage' : 'pytest --cov'}

# Run specific tests
${hasPackageJson ? 'npm test -- --grep "pattern"' : 'pytest -k "pattern"'}
\`\`\`
` : 'Testing framework not detected. Please add tests for better code quality.'}

## 🚀 Deployment

${hasDocker ? `
### Docker Deployment
\`\`\`bash
docker build -t ${repoName.toLowerCase()} .
docker run -p 3000:3000 ${repoName.toLowerCase()}
\`\`\`
` : ''}

## 📊 Code Quality

- **Linting**: Follow established code style guidelines
- **Type Safety**: ${primaryLang === 'TypeScript' ? 'TypeScript enabled' : 'Consider adding type checking'}
- **Security**: Regular dependency updates and security scans
- **Performance**: Optimized for production environments

## 🤝 Contributing

Please read our contributing guidelines before submitting PRs:

1. Fork the repository
2. Create your feature branch
3. Follow coding standards
4. Add/update tests
5. Submit pull request

## 📚 API Documentation

${options.includeApi ? `
### Core APIs

\`\`\`${primaryLang.toLowerCase()}
// Example API usage
// Add your API examples here
\`\`\`

For detailed API documentation, see [API.md](API.md)
` : 'API documentation coming soon.'}

## 📄 License

${repository?.license || 'MIT'} License - see [LICENSE](LICENSE) file for details.
`;

    return {
      success: true,
      content: content,
      metadata: {
        model: 'developer-template',
        timestamp: new Date().toISOString(),
        template: 'developer',
        tokenCount: content.length,
        options: options,
        note: 'Generated using developer-focused template.'
      }
    };
  }

  generateUserTemplate(repository, analysis, options) {
    const repoName = repository?.name || 'Amazing App';
    const description = repository?.description || `${repoName} - Easy to use and powerful application.`;
    const primaryLang = repository?.language || 'Not specified';
    const hasPackageJson = analysis?.files?.hasPackageJson;

    const content = `# ${repoName} 🎉

${description}

## ✨ What makes this special?

- **Easy to Use**: No complicated setup required
- **Fast**: Get started in minutes
- **Reliable**: Built with best practices
- **Well Supported**: Active community and regular updates

## 🚀 Quick Start

Getting started is super easy! Just follow these simple steps:

### Step 1: Get the code
\`\`\`bash
git clone ${repository?.url || 'your-repo-url'}
cd ${repoName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

### Step 2: Install
\`\`\`bash
${hasPackageJson ? 'npm install' : '# Follow setup instructions for your platform'}
\`\`\`

### Step 3: Run
\`\`\`bash
${hasPackageJson ? 'npm start' : '# Start the application'}
\`\`\`

That's it! 🎊 Your application should now be running.

## 📱 How to Use

### Basic Usage
1. **Open** the application in your browser
2. **Follow** the on-screen instructions
3. **Enjoy** using ${repoName}!

### Tips & Tricks
- 💡 **Tip 1**: Use keyboard shortcuts for faster navigation
- 💡 **Tip 2**: Check the settings for customization options
- 💡 **Tip 3**: Don't forget to save your work regularly

## 🆘 Need Help?

### Common Questions

**Q: How do I get started?**
A: Just follow the Quick Start guide above!

**Q: Something's not working?**
A: Check our troubleshooting section or create an issue.

**Q: Can I customize this?**
A: Absolutely! Check the configuration options.

### Get Support
- 📧 **Email us**: support@example.com
- 💬 **Chat**: Join our community Discord
- 🐛 **Report bugs**: [GitHub Issues](${repository?.url || '#'}/issues)
- 📖 **Documentation**: Check our detailed guides

## 🌟 Examples

Here are some cool things you can do:

### Example 1: Basic Usage
\`\`\`bash
# Simple example
${hasPackageJson ? 'npm run example' : '# Run basic example'}
\`\`\`

### Example 2: Advanced Features
\`\`\`bash
# Advanced example with options
${hasPackageJson ? 'npm run advanced-example' : '# Run advanced example'}
\`\`\`

## 🎯 What's Next?

- ⭐ **Star this repo** if you found it helpful
- 🔔 **Watch** for updates and new features
- 🤝 **Share** with friends who might find this useful
- 💝 **Contribute** to make it even better

## 📜 License

This project is licensed under the ${repository?.license || 'MIT'} License.

---

<div align="center">

**Thanks for using ${repoName}!** ❤️

Made with 💙 by [${repository?.fullName?.split('/')[0] || 'the team'}](https://github.com/${repository?.fullName?.split('/')[0] || 'developer'})

</div>
`;

    return {
      success: true,
      content: content,
      metadata: {
        model: 'user-template',
        timestamp: new Date().toISOString(),
        template: 'user',
        tokenCount: content.length,
        options: options,
        note: 'Generated using user-friendly template with emphasis on ease of use.'
      }
    };
  }

  generateBadges(repository, analysis) {
    const badges = [];
    
    // Language badge
    if (repository?.language) {
      badges.push(`![${repository.language}](https://img.shields.io/badge/${repository.language}-blue?style=flat-square&logo=${repository.language.toLowerCase()})`);
    }
    
    // License badge
    if (repository?.license) {
      badges.push(`![License](https://img.shields.io/badge/license-${repository.license}-green.svg?style=flat-square)`);
    }
    
    // GitHub badges
    if (repository?.fullName) {
      badges.push(`![Stars](https://img.shields.io/github/stars/${repository.fullName}?style=flat-square)`);
      badges.push(`![Forks](https://img.shields.io/github/forks/${repository.fullName}?style=flat-square)`);
      badges.push(`![Issues](https://img.shields.io/github/issues/${repository.fullName}?style=flat-square)`);
    }
    
    // Tech stack badges
    if (analysis?.files?.hasDocker) {
      badges.push(`![Docker](https://img.shields.io/badge/docker-enabled-blue?style=flat-square&logo=docker)`);
    }
    
    if (analysis?.files?.hasTests) {
      badges.push(`![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)`);
    }
    
    return badges.join(' ');
  }

  generateTableOfContents(options) {
    const sections = [
      '- [✨ Features](#-features)',
      '- [🛠️ Technology Stack](#️-technology-stack)'
    ];
    
    if (options.includeInstallation) {
      sections.push('- [🚀 Installation](#-installation)');
    }
    
    if (options.includeUsage) {
      sections.push('- [📖 Usage](#-usage)');
    }
    
    sections.push('- [📁 Project Structure](#-project-structure)');
    
    if (options.includeContributing) {
      sections.push('- [🤝 Contributing](#-contributing)');
      sections.push('- [🧪 Running Tests](#-running-tests)');
    }
    
    if (options.includeLicense) {
      sections.push('- [📜 License](#-license)');
    }
    
    sections.push('- [📞 Support](#-support)');
    
    return `## 📚 Table of Contents

${sections.join('\n')}

`;
  }

  generateInstallationSection(hasPackageJson, hasDocker) {
    if (hasDocker && hasPackageJson) {
      return `## 🚀 Installation

### Using Docker (Recommended)

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Build and run with Docker
docker-compose up -d
\`\`\`

### Manual Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
npm install

# Start the application
npm start
\`\`\`
`;
    } else if (hasPackageJson) {
      return `## 🚀 Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
npm install

# Start the application
npm start
\`\`\`
`;
    } else {
      return `## 🚀 Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Follow the setup instructions in your preferred environment
\`\`\`
`;
    }
  }

  generateUsageSection(primaryLang) {
    const examples = {
      'JavaScript': `\`\`\`javascript
import { MyAwesomeProject } from './src/index.js';

const project = new MyAwesomeProject();
project.run();
\`\`\``,
      'Python': `\`\`\`python
from src import main

# Run the application
main.run()
\`\`\``,
      'Java': `\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Run the application
        Application.start();
    }
}
\`\`\``,
      'TypeScript': `\`\`\`typescript
import { Application } from './src/app';

const app = new Application();
app.start();
\`\`\``
    };

    return `## 📖 Usage

${examples[primaryLang] || examples['JavaScript']}

### Basic Example

Here's a simple example of how to use this project:

\`\`\`bash
# Start the application
npm run dev

# Visit http://localhost:3000 in your browser
\`\`\`
`;
  }

  // Template variations
  getTemplates() {
    return {
      'minimal': {
        name: 'Minimal',
        description: 'Clean and simple README with essential information',
        sections: ['description', 'installation', 'usage', 'license'],
        availableOptions: [
          { key: 'includeInstallation', label: 'Installation Instructions', description: 'Basic setup and installation guide', default: true },
          { key: 'includeUsage', label: 'Usage Examples', description: 'Simple usage examples and commands', default: true },
          { key: 'includeLicense', label: 'License Information', description: 'License details and terms', default: true },
          { key: 'includeBasicInfo', label: 'Basic Project Info', description: 'Project description and key details', default: true }
        ]
      },
      'comprehensive': {
        name: 'Comprehensive',
        description: 'Detailed README with all sections and features',
        sections: ['description', 'features', 'installation', 'usage', 'structure', 'contributing', 'license', 'support'],
        availableOptions: [
          { key: 'includeFeatures', label: 'Features Section', description: 'Detailed feature list and capabilities', default: true },
          { key: 'includeInstallation', label: 'Installation Instructions', description: 'Comprehensive setup guide', default: true },
          { key: 'includeUsage', label: 'Usage Examples', description: 'Detailed usage examples and tutorials', default: true },
          { key: 'includeProjectStructure', label: 'Project Structure', description: 'File and folder organization', default: true },
          { key: 'includeContributing', label: 'Contributing Guidelines', description: 'How to contribute to the project', default: true },
          { key: 'includeLicense', label: 'License Information', description: 'License details and terms', default: true },
          { key: 'includeSupport', label: 'Support & Contact', description: 'Help and contact information', default: true },
          { key: 'includeStats', label: 'Repository Statistics', description: 'GitHub stats and metrics', default: true },
          { key: 'includeBadges', label: 'Status Badges', description: 'Build status and quality badges', default: true },
          { key: 'includeTOC', label: 'Table of Contents', description: 'Navigation table of contents', default: true }
        ]
      },
      'developer': {
        name: 'Developer-Focused',
        description: 'Technical README for developers and contributors',
        sections: ['description', 'architecture', 'installation', 'development', 'testing', 'contributing', 'api'],
        availableOptions: [
          { key: 'includeArchitecture', label: 'Architecture Overview', description: 'System architecture and design patterns', default: true },
          { key: 'includeInstallation', label: 'Development Setup', description: 'Development environment setup', default: true },
          { key: 'includeTesting', label: 'Testing Guidelines', description: 'Testing frameworks and procedures', default: true },
          { key: 'includeContributing', label: 'Contributing Guidelines', description: 'Development workflow and standards', default: true },
          { key: 'includeAPI', label: 'API Documentation', description: 'API reference and examples', default: true },
          { key: 'includeDeployment', label: 'Deployment Guide', description: 'Production deployment instructions', default: true },
          { key: 'includeCodeQuality', label: 'Code Quality', description: 'Linting, formatting, and quality standards', default: true },
          { key: 'includeDevelopmentWorkflow', label: 'Development Workflow', description: 'Git workflow and development process', default: true }
        ]
      },
      'user': {
        name: 'User-Friendly',
        description: 'End-user focused with emphasis on usage and examples',
        sections: ['description', 'features', 'installation', 'usage', 'examples', 'faq', 'support'],
        availableOptions: [
          { key: 'includeFeatures', label: 'Key Features', description: 'What makes this app special', default: true },
          { key: 'includeQuickStart', label: 'Quick Start Guide', description: 'Get started in 3 easy steps', default: true },
          { key: 'includeUsage', label: 'How to Use', description: 'Step-by-step usage instructions', default: true },
          { key: 'includeExamples', label: 'Examples & Demos', description: 'Practical examples and use cases', default: true },
          { key: 'includeFAQ', label: 'FAQ Section', description: 'Frequently asked questions', default: true },
          { key: 'includeSupport', label: 'Get Help', description: 'Support channels and community', default: true },
          { key: 'includeTips', label: 'Tips & Tricks', description: 'Pro tips for better usage', default: true },
          { key: 'includeTroubleshooting', label: 'Troubleshooting', description: 'Common issues and solutions', default: true }
        ]
      }
    };
  }
}

export default new AIService();
