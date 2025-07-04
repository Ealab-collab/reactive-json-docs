#!/bin/bash

echo "🚀 Publishing @ea-lab/reactive-json-docs to npm"
echo ""

# Check if documentation folder exists
if [ ! -d "public/rjbuild/docs" ]; then
  echo "❌ Error: Directory public/rjbuild/docs does not exist"
    exit 1
fi

echo "✅ Documentation folder found"

# Check if index.yaml exists
if [ ! -f "public/rjbuild/docs/index.yaml" ]; then
    echo "❌ Error: index.yaml file does not exist"
    exit 1
fi

echo "✅ index.yaml file found"

# Display files that will be published
echo ""
echo "📦 Files to be published:"
echo "   - public/rjbuild/docs/ (complete documentation)"
echo "   - README-npm.md (usage guide)"
echo ""

# Ask for confirmation
read -p "Continue with publication? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Publishing..."
    npm run publish-docs
    echo "✅ Publication complete!"
    echo ""
    echo "📚 Your package is now available:"
    echo "   npm install @ea-lab/reactive-json-docs"
else
    echo "❌ Publication cancelled"
fi 