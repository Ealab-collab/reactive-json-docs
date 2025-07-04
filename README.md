# reactive-json-docs

Documentation project for *[reactive-json](https://github.com/Ealab-collab/reactive-json)* (`@ea-lab/reactive-json`),
a React-based library that transforms JSON (or YAML) into HTML markup.

This project serves as the complete documentation hub for *reactive-json* and its ecosystem,
providing structured YAML documentation files optimized for LLM parsing and developer reference.

## The gist

Two npm packages are available:

**📚 Documentation Package** (this project):
```bash
npm install @ea-lab/reactive-json-docs
```

**⚛️ Main Library Package**:
```bash
npm install @ea-lab/reactive-json
```

The documentation package is optimized for LLMs and development tools, while the main library package is what you use in your React applications.

The complete documentation repository can be found at: [reactive-json-docs](https://github.com/Ealab-collab/reactive-json-docs).

You can also run the documentation website locally with `npm start` to browse the interactive documentation.

## Project structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The usual commands can be found in the annex [README-CRA.md](README-CRA.md).

> 💡 **Community contribution welcome**: We'd love to migrate this project to [Vite](https://vitejs.dev) for better performance and developer experience!

The following is the specific documentation for the *reactive-json-docs* project.

### Documentation directory `/public/rjbuild`

This directory contains the structured documentation files for *reactive-json*.

The `/public/rjbuild/docs` directory contains the main documentation in YAML format:
- **Core components**: Actions, form elements, HTML elements, special components
- **Integrations**: Chart.js and other plugin documentation  
- **Examples**: Complete use cases and implementation demos
- **Reactions**: Reactivity system and event handling

These YAML files are the structured documentation that powers both the web interface
and the npm package for LLM consumption.

### Pages directory `/public/rjbuild/pages`

Contains the website pages:
- `home.yaml` - Website homepage
- `docs.yaml` - Documentation browser index page
- `home-docs/` - Styling guides for this documentation project only

### Hull `/src/hull`

Contains the code that powers the documentation website interface.

This includes the React components that render the documentation browser,
component demos, and interactive examples.

The documentation website provides a user-friendly interface to browse
all available reactive-json components and their usage examples.

## Publishing Documentation

This project can publish its documentation as an npm package. See [PUBLICATION-GUIDE.md](PUBLICATION-GUIDE.md) for details.

## Development

Run the documentation website locally:
```bash
npm start
```

Build the documentation website:
```bash
npm run build
```

The documentation files in `/public/rjbuild/docs` are the source of truth
for all reactive-json component documentation.
