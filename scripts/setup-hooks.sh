#!/bin/bash

# Setup script for pre-commit hooks
# This script sets up Husky and lint-staged for pre-commit hooks

echo "🔧 Setting up pre-commit hooks..."

# Check if husky is installed
if ! npm list husky > /dev/null 2>&1; then
  echo "📦 Installing Husky..."
  npm install --save-dev husky
fi

# Check if lint-staged is installed
if ! npm list lint-staged > /dev/null 2>&1; then
  echo "📦 Installing lint-staged..."
  npm install --save-dev lint-staged
fi

# Initialize Husky
echo "🚀 Initializing Husky..."
npx husky init

# Create .lintstagedrc.json if it doesn't exist
if [ ! -f .lintstagedrc.json ]; then
  echo "📝 Creating .lintstagedrc.json..."
  cat > .lintstagedrc.json << EOF
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml,css}": [
    "prettier --write"
  ]
}
EOF
fi

# Add pre-commit hook
echo "📌 Adding pre-commit hook..."
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit

echo "✅ Pre-commit hooks setup complete!"
echo ""
echo "The following will run on each commit:"
echo "  - ESLint (with auto-fix)"
echo "  - Prettier (formatting)"
echo ""
echo "To skip hooks, use: git commit --no-verify"

