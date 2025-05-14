# reactive-json-standalone

Standalone project for *[reactive-json](https://bitbucket.org/ea-lab/reactive-json)*,
a React-based lib that transforms JSON (or YAML) into HTML markup.

This project shows how to use *reactive-json*, and also serves as the
standalone release of reactive-json.

Run the demo app with `npm start`.

Build the standalone assets (JS and CSS) with `npm run build`. The files
will then be available in `/build/static/{css,js}`; copy those files into
your own website project and load them in the appropriate web pages.

## Project structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The usual commands can be found in the annex [README-CRA.md](README-CRA.md).

The following is the specific documentation for the *reactive-json-standalone* project.

### Build directory `/build`

When you build this project with `npm run build`, a demo website is created
in `/build`.

The JS and CSS assets are located in `/build/static`. Copy those files into
your website project and load them. The JS file will work over `<reactive-json>`
HTML tags on the rendered page.

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
assets. You will only need the built CSS and JS files in the `/build/static/[css|js]` directory then.

### Hull `/src/hull`

Contains the code that wraps around the engine of *reactive-json*.

This is what will be executed first right after the `index.js` execution.

Depending on scenarios, the `index.js` will decide what part of the *hull*
will be executed.
