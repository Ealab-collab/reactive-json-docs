# 📦 npm Publication Guide - @ea-lab/reactive-json-docs

## 🎯 Objective

Publish only the Reactive-JSON documentation (`public/rjbuild/docs/`) on npm to make it easily accessible to LLMs.

## ✅ Ready to Publish

This project is configured to publish only the documentation files:

### Package Configuration:
- ✅ **Package name**: `@ea-lab/reactive-json-docs`
- ✅ **Content**: Only documentation files from `public/rjbuild/docs/`
- ✅ **Automation**: Validation script with safety checks
- ✅ **Lightweight**: No React dependencies, optimized for LLM parsing

## 🚀 Super Simple Publication

### Method 1: Automated Script (Recommended)
```bash
./publish-docs.sh
```

### Method 2: Via npm script
```bash
npm run publish-docs
```

### Method 3: Direct Command
```bash
npm publish --access public
```

## 📋 Automatic Checks

The `publish-docs.sh` script automatically checks:
- ✅ Existence of `public/rjbuild/docs/` directory
- ✅ Presence of `index.yaml` file
- ✅ Display of files to be published
- ✅ Confirmation request before publication

## 📦 What Will Be Published

```
@ea-lab/reactive-json-docs/
├── public/rjbuild/docs/
│   ├── index.yaml
│   ├── core/
│   │   ├── action/
│   │   ├── element/
│   │   ├── example/
│   │   └── reaction/
│   └── chartjs/
└── README-npm.md
```

## 🔧 To Update the Version

1. Modify version in `package.json`:
```json
{
  "version": "0.1.2"
}
```

2. Republish:
```bash
./publish-docs.sh
```

## 📚 Usage After Publication

Once published, users can install the package:

```bash
npm install @ea-lab/reactive-json-docs
```

### Instructions for LLM Users

When working with an LLM, you can provide these instructions:

**For ChatGPT/Claude/etc.:**
> "I have installed the npm package `@ea-lab/reactive-json-docs` which contains the complete Reactive-JSON documentation in YAML format. The main entry point is at `node_modules/@ea-lab/reactive-json-docs/public/rjbuild/docs/`."

... followed by your prompt.

**For file-based interactions:**
1. Navigate to `node_modules/@ea-lab/reactive-json-docs/public/rjbuild/docs/`
2. Upload or reference the YAML files you need.

## ⚠️ Important

- The package contains **only** the documentation, not the React source code
- React dependencies are not included (lightweight package)
- Optimized for LLM parsing with clear YAML structure 