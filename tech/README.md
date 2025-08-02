# 🚀 TechInRent - LinkedIn Account Rental Platform

<div align="center">

![TechInRent Logo](public/logo.png)

**The World's Leading LinkedIn Renting Service Platform**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🌐 Live Demo](https://techinrent.com) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/Ishantp01/tech_in_rent/issues) • [✨ Request Feature](https://github.com/Ishantp01/tech_in_rent/issues)

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 About

TechInRent is a revolutionary platform that connects LinkedIn account providers with businesses seeking to expand their professional outreach. Our secure marketplace enables:

- **For Businesses (Takers)**: Rent verified LinkedIn accounts to scale lead generation, expand professional networks, and accelerate business growth
- **For Individuals (Providers)**: Monetize your LinkedIn account by providing it for business outreach while maintaining complete security and control

### 🌟 Why TechInRent?

- **Trusted Marketplace**: Verified accounts with real connections and engagement
- **Secure Process**: Advanced security measures protecting both providers and takers
- **Scalable Solutions**: From individual accounts to enterprise-level packages
- **Global Reach**: Serving businesses worldwide with 24/7 support

## ✨ Features

### 🔥 Core Features

- **Dual User Experience**: Separate interfaces for account providers and renters
- **Advanced Account Filtering**: Filter by industry, connections, account age, and pricing
- **Real-time Analytics**: Track performance and engagement metrics
- **Secure Payment Processing**: Multiple payment options with escrow protection
- **24/7 Customer Support**: Dedicated support team for all users

### 🛡️ Security Features

- **Account Verification**: Multi-step verification process for all accounts
- **Privacy Protection**: Advanced privacy controls and data encryption
- **Secure Authentication**: JWT-based authentication with role-based access
- **Audit Trails**: Complete activity logging and monitoring

### 📱 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App**: Installable PWA with offline capabilities
- **Performance Optimized**: Lazy loading, code splitting, and caching strategies
- **SEO Optimized**: Server-side rendering and meta optimization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with Hooks and Context API
- **Build Tool**: Vite 7.0.6 for lightning-fast development
- **Styling**: TailwindCSS 3.4.17 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **File Upload**: Multer for handling file uploads
- **Email Service**: Nodemailer for transactional emails
- **Environment**: dotenv for configuration management

### Development Tools
- **Linting**: ESLint with React-specific rules
- **Code Formatting**: Prettier for consistent code style
- **Version Control**: Git with conventional commits
- **Package Manager**: npm with lock file for reproducible builds

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0 or higher)
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ishantp01/tech_in_rent.git
   cd tech_in_rent
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd tech
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm run dev

   # Terminal 2: Start frontend development server
   cd tech
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📦 Installation

### Detailed Installation Steps

#### 1. Frontend Setup

```bash
cd tech
npm install

# Available scripts:
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### 2. Backend Setup

```bash
cd server
npm install

# Available scripts:
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm run test         # Run test suite
```

#### 3. Database Setup

```bash
# Start MongoDB service
mongod

# Create database and collections (automatic on first run)
```

#### 4. Environment Configuration

Create `.env` files in both `tech` and `server` directories:

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5050
VITE_APP_NAME=TechInRent
VITE_APP_URL=http://localhost:5173
```

**Backend (.env)**
```env
PORT=5050
MONGODB_URI=mongodb://localhost:27017/techinrent
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

## 🎮 Usage

### For Account Providers

1. **Registration**: Sign up and verify your LinkedIn account
2. **Profile Setup**: Complete your provider profile with account details
3. **Pricing**: Set your rental rates (daily, weekly, monthly)
4. **Approval**: Wait for account verification and approval
5. **Earnings**: Start earning from approved rental requests

### For Account Renters (Takers)

1. **Browse Accounts**: Filter and search available LinkedIn accounts
2. **Select Package**: Choose rental duration and features
3. **Secure Payment**: Complete payment through secure checkout
4. **Access Credentials**: Receive account access details
5. **Campaign Management**: Use the account for your outreach campaigns

### Admin Dashboard

- **User Management**: Manage providers and renters
- **Account Verification**: Review and approve LinkedIn accounts
- **Analytics**: Monitor platform performance and metrics
- **Support**: Handle customer inquiries and disputes

## 📁 Project Structure

```
tech_in_rent/
├── tech/                          # Frontend React application
│   ├── public/                    # Static assets
│   │   ├── logo.png              # Application logo
│   │   ├── manifest.json         # PWA manifest
│   │   └── robots.txt            # SEO robots file
│   ├── src/                      # Source code
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   │   │   ├── Hero.jsx         # Landing page hero section
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   └── Footer.jsx       # Footer component
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Main dashboard
│   │   │   ├── Login.jsx        # Authentication page
│   │   │   └── Admin.jsx        # Admin dashboard
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── use-toast.js     # Toast notification hook
│   │   │   └── use-mobile.jsx   # Mobile detection hook
│   │   ├── lib/                 # Utility functions
│   │   │   ├── utils.js         # General utilities
│   │   │   └── api.js           # API client functions
│   │   ├── assets/              # Images and static files
│   │   ├── types.js             # Type definitions (JSDoc)
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # TailwindCSS configuration
│   └── eslint.config.js         # ESLint configuration
├── server/                       # Backend Node.js application
│   ├── config/                  # Configuration files
│   │   └── db.js               # Database connection
│   ├── models/                  # MongoDB models
│   │   ├── User.js             # User model
│   │   ├── Account.js          # LinkedIn account model
│   │   └── Rental.js           # Rental transaction model
│   ├── routes/                  # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── accounts.js         # Account management routes
│   │   └── rentals.js          # Rental management routes
│   ├── middleware/              # Express middleware
│   │   ├── auth.js             # Authentication middleware
│   │   └── validation.js       # Request validation
│   ├── utils/                   # Utility functions
│   │   ├── email.js            # Email service
│   │   └── encryption.js       # Data encryption
│   ├── server.js               # Server entry point
│   └── package.json            # Backend dependencies
├── README.md                    # Project documentation
└── .gitignore                   # Git ignore rules
```

## 🔌 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
POST /api/auth/logout            # User logout
GET  /api/auth/profile           # Get user profile
PUT  /api/auth/profile           # Update user profile
```

### Account Management

```http
GET    /api/accounts             # Get all available accounts
GET    /api/accounts/:id         # Get specific account details
POST   /api/accounts             # Create new account (providers)
PUT    /api/accounts/:id         # Update account details
DELETE /api/accounts/:id         # Delete account
```

### Rental Management

```http
GET    /api/rentals              # Get user's rentals
POST   /api/rentals              # Create new rental
PUT    /api/rentals/:id          # Update rental status
DELETE /api/rentals/:id          # Cancel rental
```

### Admin Endpoints

```http
GET    /api/admin/users          # Get all users
GET    /api/admin/accounts       # Get all accounts for review
PUT    /api/admin/accounts/:id   # Approve/reject accounts
GET    /api/admin/analytics      # Get platform analytics
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd tech
npm run test

# Backend tests
cd server
npm run test

# End-to-end tests
npm run test:e2e
```

### Test Coverage

- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing

## 🚀 Deployment

### Production Build

```bash
# Build frontend
cd tech
npm run build

# The build files will be in the `dist` directory
```

### Environment Setup

1. **Frontend Deployment** (Vercel/Netlify)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Backend Deployment** (Heroku/Railway)
   - Set environment variables
   - Configure MongoDB Atlas connection
   - Deploy from GitHub repository

### Environment Variables

**Production Frontend**
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=TechInRent
VITE_APP_URL=https://your-domain.com
```

**Production Backend**
```env
PORT=5050
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techinrent
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_production_app_password
NODE_ENV=production
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git fork https://github.com/Ishantp01/tech_in_rent.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Link any related issues
   - Ensure all tests pass

### Code Style Guidelines

- **JavaScript**: Follow ESLint configuration
- **React**: Use functional components with hooks
- **CSS**: Use TailwindCSS utility classes
- **Commits**: Follow conventional commit format

### Reporting Issues

When reporting issues, please include:

- **Environment details** (OS, Node.js version, browser)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Error messages** and stack traces

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 TechInRent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🆘 Support

### Getting Help

- **Documentation**: Check our [Wiki](https://github.com/Ishantp01/tech_in_rent/wiki) for detailed guides
- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/Ishantp01/tech_in_rent/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/Ishantp01/tech_in_rent/discussions)
- **Email**: Contact us at support@techinrent.com

### FAQ

**Q: How secure is the platform?**
A: We use industry-standard security measures including JWT authentication, data encryption, and secure payment processing.

**Q: What payment methods are supported?**
A: We support major credit cards, PayPal, and cryptocurrency payments.

**Q: How long does account verification take?**
A: Account verification typically takes 24-48 hours for manual review.

**Q: Can I cancel a rental anytime?**
A: Yes, rentals can be cancelled according to our terms of service with appropriate refund policies.

### Community

- **Discord**: Join our [Discord server](https://discord.gg/techinrent) for real-time chat
- **Twitter**: Follow us [@TechInRent](https://twitter.com/techinrent) for updates
- **LinkedIn**: Connect with us on [LinkedIn](https://linkedin.com/company/techinrent)

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Vite Team** for the lightning-fast build tool
- **TailwindCSS** for the utility-first CSS framework
- **Radix UI** for accessible UI primitives
- **All Contributors** who have helped improve this project

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Ishantp01/tech_in_rent?style=social)
![GitHub forks](https://img.shields.io/github/forks/Ishantp01/tech_in_rent?style=social)
![GitHub issues](https://img.shields.io/github/issues/Ishantp01/tech_in_rent)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ishantp01/tech_in_rent)

---

<div align="center">

**Made with ❤️ by the TechInRent Team**

[Website](https://techinrent.com) • [GitHub](https://github.com/Ishantp01/tech_in_rent) • [Support](mailto:support@techinrent.com)

</div>
