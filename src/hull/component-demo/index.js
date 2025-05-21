/**
 * Plugin definition for the docs components.
 *
 * This file exposes the referenced components so that
 * we can use them in the rjbuilds.
 *
 * It also contains a navigation tree.
 */
import {DemoContentMapper} from "./element/DemoContentMapper.jsx";
import {Markdown} from "./element/Markdown.jsx";
import {RjBuildDescriber} from "./element/RjBuildDescriber.jsx";
import {Sidebar} from "./element/Sidebar.jsx";

export const demoPlugins = {
    element: {
        DemoContentMapper,
        Markdown,
        RjBuildDescriber,
        Sidebar,
    }
}

export const docsPageNavigation = {
    "/docs": {
        title: "Introduction",
    },
    "/docs/core": {
        title: "Core components",
        items: {
            "/docs/core/html": {
                title: "HTML",
            },
            "/docs/core/accordion": {
                title: "Accordion",
            },
            "/docs/core/dynamic-content": {
                title: "Dynamic content",
            },
        }
    },
    "/docs/chartjs": {
        title: "ChartJS integration",
        items: {
            "/docs/chartjs/overview": {
                title: "Overview",
            },
            "/docs/chartjs/components": {
                title: "ChartJS components",
            },
        }
    }
}
