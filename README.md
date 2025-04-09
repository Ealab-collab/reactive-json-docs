# reactive-json

A REACT-based lib that transforms JSON (or YAML) into HTML markup.

This lib lessens the need to write JS code for building frontend apps.

With *reactive-json*, build your apps and forms frontend, embed them into your websites,
and make them interactive with your backend.

## Project structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The usual commands can be found in the annex [README-CRA.md](README-CRA.md).

The following is the specific documentation for the *reactive-json* project.

### Public directory `/public`

This directory contains the *reactive-json* demo website files.

In the `index.html` file, you will get a basic implementation of what is expected
in the HTML page to have *reactive-json* loaded in it (especially the `<reactive-json>` tag).

In the `/public/pages` directory, you will find YAML files. Those files are the real
structure and content that *reactive-json* consumes to build the HTML markup. Yes!
*reactive-json* can also read YAML files, because it's way easier for a human to write
and read than JSON.

Regarding the `/public` directory overall, you can use this directory if you want to
experiment on this lib. The files in this directory will be available in a simple
web app accessible after launching the server with the `npm start` command.
You will have to edit the routing in the `/src/DevApp.js` file
to use your own page definitions.

Otherwise—that is if you don't need those demo pages, e.g. because you want to use
*reactive-json* as a lib in your own website—simply omit to copy them to your website
assets. You will only need the built CSS and JS files in the `/build/[css|js]` directory then.

### Components `/src/component`

This is where the extensible code is located.

We provided a basic set of components that people will mostly need.
Those components usually wrap around famous third-party libs such as
*React-Bootstrap* and *Chart.js*.

Of course, you can add your own components, by following the same pattern.

#### Actions `/src/component/action`

Action components are special components that may be
used within the `actions:` section of an **element** component.

Actions **do** something **when** conditions are met.

#### Elements `/src/component/element`

Element components are the main structural components that will display anything.

They may be HTML markup (`html`), interactive (`form`), graphic charts (`chart`),
and anything that displays or not (`special`).

When adding your own elements, you must register them in the `View` component.

#### Hooks `/src/component/hook`

Contains reusable hooks, in the React sense.

#### Reaction functions `/src/component/reaction`

Reaction components are functions that are like the `action` components,
but they **do** something **in response** to an **event**.

The reaction components must be registered in the `ReactOnEvent` component.

### Utilities `utilities`

Generic reusable code.

### Engine `/src/engine`

Contains the core functionality of *reactive-json*.

Usually, you won't need to edit its content. (But feel free to inspect it if you
want to contribute!)

### Hull `/src/hull`

Contains the code that wraps around the engine.

This is what will be executed first right after the `index.js` execution.

Depending on scenarios, the `index.js` will decide what part of the *hull*
will be executed.

The most important file is `AppRoot.jsx`, as it's the real *reactive-json* root.
The rest is for the developer convenience; this is for the demo website.
