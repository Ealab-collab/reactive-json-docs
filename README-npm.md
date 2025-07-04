# @ea-lab/reactive-json-docs

Complete documentation for Reactive-JSON - LLM-Parsable Format

## 📚 Content

This package contains the complete Reactive-JSON documentation in YAML format, optimized for easy parsing by LLMs:

- **Core Components**: HTML elements, actions & reactions, form elements, special components, etc.
- **Integrations**: Chart.js components and others
- **Examples**: Complete use cases and demos

## 🚀 Installation

```bash
npm install @ea-lab/reactive-json-docs
```

## 📖 Usage

### For LLM Users

Tell your LLM about this package:

> "I have the npm package `@ea-lab/reactive-json-docs` installed, which contains complete documentation for @ea-lab/reactive-json and plugins. The documentation is located in `node_modules/@ea-lab/reactive-json-docs/public/rjbuild/component-doc/`. Can you help me understand how to use Reactive-JSON components?"

### Structure

```
component-doc/
├── index.yaml              # Main index
├── core/
│   ├── action/            # Actions (Hide, Show, Redirect...)
│   ├── element/           # UI Elements
│   │   ├── form/         # Form fields
│   │   ├── html/         # HTML elements
│   │   └── special/      # Special components
│   ├── example/          # Complete examples
│   └── reaction/         # Reactivity system
└── chartjs/              # Chart.js integration
```

## 🤖 LLM-Optimized

- Standardized YAML format
- Complete documentation with examples
- Structured metadata
- Detailed use cases
- Cross-references
