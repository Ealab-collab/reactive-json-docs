# Reactive-JSON Installation Guide (Vite + React)

> **Tip**: In the interactive version of this documentation, a button is available to automatically copy the initialization prompt. Copy it and paste it into Cursor to start the step-by-step assistant.

## ⚠️ Important Rules

**NEVER SKIP STEPS** unless explicitly requested by the user. Each step is critical for the proper functioning of the project and must be executed in the defined chronological order.

When user feedback is required, wait for it and do not continue until this feedback is given.

Adapt commands according to the execution environment (Windows, Ubuntu, Mac...).

## Table of Contents

1. [Project Directory Confirmation](#1-project-directory-confirmation)
2. [Collecting User Information](#2-collecting-user-information)
3. [Documentation Repositories Setup](#3-documentation-repositories-setup)
4. [Cursor Workspace Configuration](#4-cursor-workspace-configuration)
5. [Vite Project Initialization](#5-vite-project-initialization)
6. [Project Structure Verification](#6-project-structure-verification)
7. [Dependencies Installation](#7-dependencies-installation)
8. [Cursor Project Rules Creation](#8-cursor-project-rules-creation)
9. [Generated Project Cleanup](#9-generated-project-cleanup)
10. [Basic Configuration with ReactiveJsonRoot](#10-basic-configuration-with-reactivejsonroot)
11. [Routing Configuration (Optional)](#11-routing-configuration-optional)
12. [Final Verification](#12-final-verification)

## Chronological Steps

### 1. Project Directory Confirmation

**Action:** Show the user if the IDE is opened in the directory where the project will
be initialized, then ask for confirmation:

- Execute the command:
  ```bash
  pwd
  ```
- Show the user this info:
  > **IMPORTANT: Directory Confirmation Required**
  > 
  > **Current directory:** `[Display the result of pwd command]`
  > 
  > **This directory will become your project root.** All project files will be created here.
- Ask the user for confirmation:
  > **Do you confirm that this is the correct location before continuing?** If the location is wrong,
  > please open in your IDE the location where the project will be created and restart the
  > installation procedure.
- User feedback required.
- When user confirms, note the project directory as `<project_dir>` and go to the next step.

---

### 2. Collecting User Information

**Action:** Ask the user for the following information:

- **TypeScript**: Ask if the user wants to use TypeScript (yes/no)
- **Documentation repositories location**: Absolute path where to clone reactive-json and reactive-json-docs repositories. When the user gives a relative path, convert it to absolute
and ask for confirmation.

**Important:** For documentation location, **NEVER** place them in the current project directory. Propose by default: `~/cursor-docs/` or let the user specify another location outside the current project.

**Variables to remember:**
- `<use_typescript>`: true/false based on the answer
- `<docs_location>`: Absolute path for repositories (must be outside current directory)

**Validation:** Verify that `<docs_location>` is not within the current project directory.
When invalid, ask again the location with valid suggestions.

---

### 3. Documentation Repositories Setup

**Action:** Clone the required documentation repositories

**Commands to execute:**

```bash
mkdir -p <docs_location>
cd <docs_location>
git clone https://github.com/Ealab-collab/reactive-json.git
git clone https://github.com/Ealab-collab/reactive-json-docs.git
```

**Important:** Explain to the user that these repositories are **only** for Cursor to index the documentation and will **not** be included in the final project.

**Note:** If the user indicates that the repositories are already cloned, proceed directly to step 4 (Cursor Workspace Configuration) as it is essential to add the folders to the workspace even if they already exist.

---

### 4. Cursor Workspace Configuration

**Action:** Ask the user to add repositories to the workspace

**Instructions to give to the user:**

> **IMPORTANT: Manual Action Required**
> 
> Before continuing, you must add the cloned repositories to your Cursor workspace:
> 
> 1. Go to `File > Add Folder to Workspace`
> 2. Add the folder `<docs_location>/reactive-json`
> 3. Add the folder `<docs_location>/reactive-json-docs`
> 
> **Confirm that this step is completed before continuing.**

---

### 5. Vite Project Initialization

**Action:** Create the project with Vite in the current directory

**Commands to execute:**

```bash
# Return to project directory
cd <project_dir>

# If TypeScript
npm create vite@latest . -- --template react-ts

# If JavaScript
npm create vite@latest . -- --template react
```

---

### 6. Project Structure Verification

**Action:** Verify the project structure is correct

**Commands to execute:**

```bash
ls -la
```

**Verification checklist:**

1. **package.json** must be at the root of the current directory
2. **src/** folder must be present
3. **public/** folder must be present  
4. **The reactive-json and reactive-json-docs repositories must NOT be in this directory** (they should only be in the workspace)

**Instructions:**

> **IMPORTANT: Project Structure Verification**
> 
> Please verify the following:
> 
> ✅ `package.json` is at the root of your current directory  
> ✅ `src/` and `public/` folders are present  
> ✅ `reactive-json/` and `reactive-json-docs/` folders are NOT in this directory  
> 
> If any of these conditions are not met, **STOP** and resolve the issues before continuing.

---

### 7. Dependencies Installation

**Action:** Install required packages

**Commands to execute:**

```bash
npm install
npm install @ea-lab/reactive-json bootstrap react-bootstrap axios clsx dnd-kit-sortable-tree html-react-parser js-yaml jsonpath lodash
```

---

### 8. Cursor Project Rules Creation

**Action:** Copy Cursor rules from documentation repositories

**IMPORTANT:** This step must be done **immediately after installing dependencies** so that Cursor applies the rules during all subsequent code modifications.

**Instructions:**

1. Create the `.cursor/rules/` folder in your project:
```bash
mkdir -p .cursor/rules
```

2. Copy and merge rules from documentation repositories:
```bash
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

### 9. Generated Project Cleanup

**Action:** Remove/clean files generated by Vite

**Files to delete:**
- `src/App.css`
- `src/index.css` (keep only base styles)
- `public/vite.svg`
- `src/assets/react.svg`

**Files to modify:**

**`src/main.tsx` (or `src/main.jsx`):**

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Import Bootstrap styles for reactive-json
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
```

**IMPORTANT**: do not use <StrictMode>. Reactive-JSON doesn't work with it for now!

---

### 10. Basic Configuration with ReactiveJsonRoot

**Action:** Configure the base component with an external YAML file

**IMPORTANT:** Always use an external YAML file for configuration. Never pass configuration directly in props.

**`src/App.tsx` (or `src/App.jsx`):**

```javascript
import { ReactiveJsonRoot } from '@ea-lab/reactive-json'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return <ReactiveJsonRoot dataUrl="/config.yaml" dataFetchMethod="GET" />
}

export default App
```

**`public/config.yaml`:**

```yaml
renderView:
  - type: h1
    content: "Ready to start!"
```

---

### 11. Routing Configuration (Optional)

**Action:** Ask the user if they want to add routing for application organization

**Question to ask:**

> **Optional: React Router Setup**
> 
> Do you want to add React Router (react-router-dom) to organize your application with multiple pages/routes?
> 
> This is useful if you plan to create a multi-page application.
> 
> **Answer: Yes/No**

**If YES, execute the following:**

**Install react-router-dom:**
```bash
npm install react-router-dom
# If TypeScript
npm install --save-dev @types/react-router-dom
```

**Create routing structure:**

**`src/components/Navigation.tsx` (or `.jsx`):**
```javascript
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    // Add or remove items here according to your needs
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My App
        </Link>
        
        <div className="navbar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

**`src/config/routes.ts` (or `.js`):**
```javascript
export const routeMapping = [
  { path: '/', rjbuild: '/pages/home.yaml' },
  // Add or remove routes here according to your needs
  // Example: { path: '/about', rjbuild: '/pages/about.yaml' }
]
```

**Update `src/App.tsx` (or `.jsx`):**
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactiveJsonRoot } from '@ea-lab/reactive-json'
import { routeMapping } from './config/routes'
import Navigation from './components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="container">
          <Routes>
            {routeMapping.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ReactiveJsonRoot
                    dataUrl={route.rjbuild}
                    dataFetchMethod="GET"
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
```

**Create page configuration:**
```bash
mkdir -p public/pages
mkdir -p src/config
```

**`public/pages/home.yaml`:**
```yaml
renderView:
  - type: h1
    content: "Welcome to your React + Reactive-JSON app!"
  - type: p
    content: "Your routing is now configured with a navigation bar. You can add more pages in src/pages/ and routes in the App component."
```

**If NO, keep the simple configuration from step 10.**

---

### 12. Final Verification

**Action:** Launch development server

```bash
npm run dev
```

If the server starts without errors and you see the expected message in your browser, the installation is successful. You can start developing your application with reactive-json.

**Expected results:**
- **Without routing:** "Ready to start!" message
- **With routing:** "Welcome to your React + Reactive-JSON app!" message with a navigation bar at the top of the page allowing navigation between pages 