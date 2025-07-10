# Reactive-JSON Installation Guide (Vite + React)

> **Tip**: In the interactive version of this documentation, a button is available to automatically copy the initialization prompt. Copy it and paste it into Cursor to start the step-by-step assistant.

## ⚠️ Important Rule

**DO NOT SKIP STEPS** unless explicitly requested by the user. Each step is critical for the proper functioning of the project and must be executed in the defined order.

## Table of Contents

1. [Collecting User Information](#1-collecting-user-information)
2. [Documentation Repositories Setup](#2-documentation-repositories-setup)
3. [Cursor Workspace Configuration](#3-cursor-workspace-configuration)
4. [Vite Project Initialization](#4-vite-project-initialization)
5. [Dependencies Installation](#5-dependencies-installation)
6. [Cursor Rules Creation](#6-cursor-rules-creation)
7. [Generated Project Cleanup](#7-generated-project-cleanup)
8. [Basic Configuration with ReactiveJsonRoot](#8-basic-configuration-with-reactivejsonroot)
9. [Final Verification](#9-final-verification)

---

## 1. Collecting User Information

Ask the user for:

- **Project name**
- **TypeScript?** (yes/no)
- **Documentation repositories location** (absolute path)

Remember:

| Variable | Description |
| -------- | ----------- |
| `<project_name>` | Project name |
| `<use_typescript>` | `true` or `false` |
| `<docs_location>` | Absolute path for repositories |

---

## 2. Documentation Repositories Setup

```bash
cd <docs_location>
git clone https://github.com/Ealab-collab/reactive-json.git
git clone https://github.com/Ealab-collab/reactive-json-docs.git
```

> These repositories are used **only** for Cursor to index the documentation and will **not** be included in the final project.

If repositories are already cloned, proceed directly to step 3.

---

## 3. Cursor Workspace Configuration

**Manual action required!**

1. Open `File > Add Folder to Workspace`
2. Add `<docs_location>/reactive-json`
3. Add `<docs_location>/reactive-json-docs`

Make sure these folders appear in the explorer before continuing.

---

## 4. Vite Project Initialization

```bash
# With TypeScript
npm create vite@latest <project_name> -- --template react-ts

# With JavaScript
npm create vite@latest <project_name> -- --template react

cd <project_name>
```

---

## 5. Dependencies Installation

```bash
npm install
npm install @ea-lab/reactive-json bootstrap react-bootstrap axios clsx dnd-kit-sortable-tree html-react-parser js-yaml jsonpath lodash
```

---

## 6. Cursor Rules Creation

Copy rules from documentation repositories **before** any code modification:

```bash
# Create rules directory
mkdir -p .cursor/rules

# Copy rules from reactive-json
cp -r <docs_location>/reactive-json/.cursor/rules/* .cursor/rules/

# Copy and merge rules from reactive-json-docs
cp -r <docs_location>/reactive-json-docs/.cursor/rules/* .cursor/rules/
```

These rules contain all the necessary directives to work effectively with reactive-json, including:
- Required documentation rules
- Component creation rules
- Code language rules
- And other project-specific rules

---

## 7. Generated Project Cleanup

Remove unnecessary files:

- `src/App.css`
- `src/index.css` (keep only base styles)
- `public/vite.svg`
- `src/assets/react.svg`

Modify `src/main.tsx` (or `src/main.jsx`):

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
```

---

## 8. Basic Configuration with ReactiveJsonRoot

`src/App.tsx`:

```typescript
import { ReactiveJsonRoot } from '@ea-lab/reactive-json'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return <ReactiveJsonRoot dataUrl="/config.yaml" dataFetchMethod="GET" />
}

export default App
```

`public/config.yaml`:

```yaml
renderView:
  - type: h1
    content: "Ready to start!"
```

---

## 9. Final Verification

```bash
npm run dev
```

If the "Ready to start!" message appears without errors, the installation is complete! You can start developing your application with Reactive-JSON. 