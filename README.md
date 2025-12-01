# Tiktak Frontend

A modern React application for managing Burger's orders, built with TypeScript, Vite, and a comprehensive tech stack.

## 🚀 Features

- ⚡ **Fast Development** - Vite-powered build system with HMR
- 🎨 **Modern UI** - Tailwind CSS for styling
- 🔐 **Authentication** - Complete auth flow (login, register, password reset)
- 🌍 **Internationalization** - i18next support for multiple languages
- 📱 **PWA Support** - Progressive Web App with service workers
- 🧪 **Testing** - Vitest for unit and integration tests
- 🐳 **Docker Ready** - Containerized with Nginx for production
- 🔄 **State Management** - Redux Toolkit + React Query
- 🛡️ **Type Safety** - Full TypeScript support
- 🎯 **Route Guards** - Protected routes with auth/guest guards

## 🎯 Boilerplate Features

This is a production-ready boilerplate template with:

- ✅ **Complete Development Setup** - VS Code settings, ESLint, Prettier, EditorConfig
- ✅ **CI/CD Ready** - GitHub Actions workflows for testing and Docker builds
- ✅ **Environment Management** - Template files for all environments
- ✅ **Docker Support** - Dockerfile and docker-compose.yml included
- ✅ **Pre-commit Hooks** - Setup scripts for Husky and lint-staged
- ✅ **Comprehensive Documentation** - README, SETUP, CONTRIBUTING, and customization guides
- ✅ **Type Safety** - Full TypeScript configuration with strict mode
- ✅ **Testing Infrastructure** - Vitest with coverage reporting

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn** package manager

## 🛠️ Tech Stack

### Core
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4

### State Management & Data Fetching
- **Redux Toolkit** 2.3.0
- **React Query (TanStack Query)** 5.59.16
- **Axios** 1.7.7

### UI & Styling
- **Tailwind CSS** 4.1.17
- **Lucide React** 0.555.0 (Icons)
- **React Select** 5.10.2
- **React Toastify** 11.0.5

### Forms & Validation
- **Formik** 2.4.9
- **Yup** 1.7.1

### Routing & Navigation
- **React Router DOM** 7.9.6

### Internationalization
- **i18next** 25.6.3
- **react-i18next** 16.3.5
- **i18next-browser-languagedetector** 8.0.0

### PWA
- **vite-plugin-pwa** 1.2.0
- **register-service-worker** 1.7.2

### Testing
- **Vitest** 4.0.14
- **@vitest/coverage-v8** 4.0.14
- **jsdom** 27.2.0

### Utilities
- **date-fns** 4.1.0

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FE
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment files:
```bash
# Copy the template
cp env.template .env.development

# Edit .env.development with your configuration
```

Required environment variables:
```env
VITE_HOST_API_URL=your_api_url
VITE_HOST_API_VERSION=your_api_version
APP_ENV=development
```

> 📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 🚀 Development

### Start Development Server

**Linux/Mac:**
```bash
npm run dev
```

**Windows:**
```bash
npm run dev_win
```

The application will be available at `http://localhost:3005`

### Other Environments

**QA Environment:**
```bash
# Linux/Mac
npm run qa

# Windows
npm run qa_win
```

**Production Mode (Local):**
```bash
# Linux/Mac
npm run prod

# Windows
npm run prod_win
```

## 🏗️ Build

### Development Build
```bash
# Linux/Mac
npm run build:dev

# Windows
npm run build:dev_win
```

### QA Build
```bash
# Linux/Mac
npm run build:qa

# Windows
npm run build:qa_win
```

### Production Build
```bash
# Linux/Mac
npm run build:prod

# Windows
npm run build:prod_win
```

Build output will be in the `dist/` directory.

## 🧪 Testing

Run tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run coverage
```

## 📁 Project Structure

```
src/
├── __tests__/          # Test files
├── common/             # Common types and enums
│   ├── enums/          # Enum definitions
│   └── types/          # TypeScript type definitions
├── components/         # Reusable UI components
│   ├── button/
│   ├── forms/          # Form components (input, textarea, checkbox, autocomplete)
│   ├── modal/
│   ├── tabs/
│   ├── toast/
│   └── ...
├── configs/            # Configuration files
│   ├── api.ts          # API endpoints
│   ├── common.ts       # Common constants
│   ├── dateTime.ts     # Date/time configuration
│   ├── env.ts          # Environment variables
│   └── keys.ts         # Storage keys
├── guards/             # Route guards
│   ├── auth/           # Authentication guard
│   └── guest/          # Guest guard
├── hooks/              # Custom React hooks
│   ├── useAuth/
│   ├── useCustomRouter/
│   ├── useGlobalLoading/
│   └── ...
├── layouts/            # Layout components
│   ├── auth/           # Authentication layout
│   ├── compact/        # Compact layout
│   └── main/           # Main layout
├── locales/            # Internationalization
│   ├── i18n.ts         # i18n configuration
│   └── translations/   # Translation files
│       ├── en.json
│       └── vn.json
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgotPassword/
│   │   └── resetPassword/
│   ├── home/
│   ├── 403/
│   ├── 404/
│   └── 500/
├── routes/             # Routing configuration
│   ├── index.tsx       # Main router
│   ├── paths.ts        # Route paths
│   └── sections/       # Route sections
├── services/           # API services
│   └── auth/           # Authentication service
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   │   ├── appSlice.ts
│   │   └── userSlice.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── axiosClient/    # Axios configuration and interceptors
│   ├── dateTime/       # Date/time utilities
│   ├── storage/        # LocalStorage utilities
│   └── ...
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@hooks/` → `src/hooks/`
- `@utils/` → `src/utils/`
- `@services/` → `src/services/`
- `@store/` → `src/store/`
- `@configs/` → `src/configs/`
- `@routes/` → `src/routes/`
- `@layouts/` → `src/layouts/`
- `@guards/` → `src/guards/`
- `@locales/` → `src/locales/`
- `@types/` → `src/common/types/`
- `@enums/` → `src/common/enums/`

### Environment Variables

Required environment variables:

- `VITE_HOST_API_URL` - Backend API URL
- `VITE_HOST_API_VERSION` - API version

## 🐳 Docker

### Build Docker Image

```bash
docker build \
  --build-arg VITE_HOST_API_URL=your_api_url \
  --build-arg VITE_HOST_API_VERSION=your_api_version \
  -t tiktak-frontend .
```

### Run Docker Container

```bash
docker run -p 80:80 tiktak-frontend
```

The application will be available at `http://localhost`

## 🔐 Authentication

The application includes a complete authentication system:

- **Login** - User authentication
- **Register** - New user registration
- **Forgot Password** - Password recovery
- **Reset Password** - Password reset with token
- **Protected Routes** - Auth guard for protected pages
- **Guest Routes** - Guest guard for public-only pages

## 🌍 Internationalization

The app supports multiple languages through i18next:

- English (en) - Default
- Vietnamese (vn)

Translation files are located in `src/locales/translations/`

## 📱 Progressive Web App (PWA)

The application is configured as a PWA with:

- Service worker for offline support
- App manifest for installability
- Cache management with version tracking
- Auto-update functionality

## 🎨 Styling

The project uses **Tailwind CSS** for styling. Configuration is in `tailwind.config.js`.

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript type checking is performed during build:
```bash
npm run build
```

## 🔄 State Management

- **Redux Toolkit** - Global application state
- **React Query** - Server state and caching

### Redux Slices

- `appSlice` - Application-level state
- `userSlice` - User authentication state

## 🧩 Key Features

### Custom Hooks

- `useAuth` - Authentication state and methods
- `useCustomRouter` - Enhanced router functionality
- `useGlobalLoading` - Global loading state management
- `useToast` - Toast notification helper
- `useTranslate` - Translation helper

### Components

- Form components (Input, Textarea, Checkbox, Autocomplete)
- UI components (Button, Modal, Tabs, Toast)
- Layout components (Auth, Main, Compact)
- Utility components (Loading Spinner, Empty State, Error Boundary)

## 🚨 Error Handling

- Error boundaries for React error catching
- Axios interceptors for API error handling
- Toast notifications for user feedback
- Error pages (403, 404, 500)

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 📚 Additional Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines and code standards
- **[BOILERPLATE_GUIDE.md](./BOILERPLATE_GUIDE.md)** - Guide for customizing this boilerplate
- **[CHANGELOG.md](./CHANGELOG.md)** - Project changelog

## 🛠️ Development Tools Setup

### VS Code (Recommended)

The project includes VS Code settings and recommended extensions:
- Open the project in VS Code
- Install recommended extensions when prompted
- Settings are automatically applied from `.vscode/settings.json`

### Pre-commit Hooks (Optional)

Set up pre-commit hooks to run linting and formatting automatically:

**Linux/Mac:**
```bash
chmod +x scripts/setup-hooks.sh
./scripts/setup-hooks.sh
```

**Windows (PowerShell):**
```powershell
.\scripts\setup-hooks.ps1
```

Or manually:
```bash
npm install --save-dev husky lint-staged
npx husky init
```

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Copy `env.template` to `.env.development`
- [ ] Configure environment variables
- [ ] Start dev server (`npm run dev`)
- [ ] (Optional) Set up pre-commit hooks
- [ ] (Optional) Install VS Code recommended extensions

## 📞 Support

For issues and questions, please contact the development team.

---

Built with ❤️ using React, TypeScript, and Vite

**This is a boilerplate template** - Customize it for your project needs! See [BOILERPLATE_GUIDE.md](./BOILERPLATE_GUIDE.md) for customization instructions.
