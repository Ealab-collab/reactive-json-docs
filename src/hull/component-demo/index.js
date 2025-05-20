/**
 * Plugin definition for the demo components.
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

export const demoPageNavigation = {
    "/demo": {
        title: "Introduction",
    },
    "/demo/core": {
        title: "Core components",
        items: {
            "/demo/core/html": {
                title: "HTML",
            },
            "/demo/core/accordion": {
                title: "Accordion",
            },
            "/demo/core/dynamic-content": {
                title: "Dynamic content",
            },
        }
    },
    "/demo/chartjs": {
        title: "ChartJS integration",
        items: {
            "/demo/chartjs/overview": {
                title: "Overview",
            },
            "/demo/chartjs/components": {
                title: "ChartJS components",
            },
        }
    }
}
