import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DevApp } from "./hull/DevApp";
import { ReactiveJsonRoot } from "@ea-lab/reactive-json/dist/engine/ReactiveJsonRoot";

const appRootElements = document.querySelectorAll("reactive-json");

appRootElements.forEach((element) => {
    // Use this to change the fetch method.
    const maybeMethod = element.dataset?.method;

    if (element.dataset.dev) {
        // Use the development app with the router.
        // TODO: when not in dev, it's better to not import App to remove
        // useless dependencies from the bundle.
        const root = ReactDOM.createRoot(element);

        // Do not use StrictMode because it makes useReducer call twice,
        // and this breaks dev environments for some functionality such as addData.
        // This is because the reducer is not a pure function (we edit directly
        // the data instead of cloning it.)
        // root.render(
        //     <React.StrictMode>
        //         <DevApp/>
        //     </React.StrictMode>
        // );
        root.render(<DevApp rjBuildFetchMethod={maybeMethod} />);

        return;
    }

    // Production app.
    // Get data included in the root element.
    const headersForRjBuild_asElements = element.querySelectorAll("data-source-request-header");
    const headersForRjBuild = headersForRjBuild_asElements.length ? {} : undefined;

    headersForRjBuild_asElements.forEach((headerElement, key, parent) => {
        const headerField = headerElement?.dataset?.headerField;
        const headerValue = headerElement?.dataset?.headerValue;

        if (!headerField || !headerValue) {
            return;
        }

        headersForRjBuild[headerField] = headerValue;
    });

    const root = ReactDOM.createRoot(element);

    root.render(
        <React.StrictMode>
            <ReactiveJsonRoot
                rjBuildFetchMethod={maybeMethod}
                rjBuildUrl={element.dataset.url}
                headersForRjBuild={headersForRjBuild}
            />
        </React.StrictMode>
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
