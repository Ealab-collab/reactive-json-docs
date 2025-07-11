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
import {SyntaxHighlighter} from "./element/SyntaxHighlighter.jsx";

export const demoPlugins = {
    element: {
        DemoContentMapper,
        Markdown,
        RjBuildDescriber,
        Sidebar,
        SyntaxHighlighter,
    }
}

export const docsPageNavigation = {
    "/docs": {
        title: "Introduction",
    },
    "/docs/install": {
        title: "Installation",
    },
    "/docs/getting-started": {
        title: "Getting started",
    },
    "/docs/template": {
        title: "Template system",
    },
    "/docs/core": {
        title: "Core components",
        items: {
            "/docs/core/action": {
                title: "Actions",
                items: {
                    "/docs/core/action/index": {
                        title: "What are actions?"
                    },
                    "/docs/core/action/HashChangeListener": {
                        title: "HashChangeListener"
                    },
                    "/docs/core/action/Hide": {
                        title: "Hide"
                    },
                    "/docs/core/action/MessageListener": {
                        title: "MessageListener"
                    },
                    "/docs/core/action/Popover": {
                        title: "Popover"
                    },
                    "/docs/core/action/ReactOnEvent": {
                        title: "ReactOnEvent"
                    },
                    "/docs/core/action/Redirect": {
                        title: "Redirect"
                    },
                    "/docs/core/action/Tooltip": {
                        title: "Tooltip"
                    },
                    "/docs/core/action/VisuallyHide": {
                        title: "VisuallyHide"
                    }
                }
            },
            "/docs/core/reaction": {
                title: "Reactions",
                items: {
                    "/docs/core/reaction/index": {
                        title: "What are reactions?"
                    },
                    "/docs/core/reaction/forward-update": {
                        title: "Forward Update"
                    },
                    "/docs/core/reaction/addData": {
                        title: "addData"
                    },
                    "/docs/core/reaction/fetchData": {
                        title: "fetchData"
                    },
                    "/docs/core/reaction/moveData": {
                        title: "moveData"
                    },
                    "/docs/core/reaction/postMessage": {
                        title: "postMessage"
                    },
                    "/docs/core/reaction/redirectNow": {
                        title: "redirectNow"
                    },
                    "/docs/core/reaction/removeData": {
                        title: "removeData"
                    },
                    "/docs/core/reaction/setClipboardData": {
                        title: "setClipboardData"
                    },
                    "/docs/core/reaction/setData": {
                        title: "setData"
                    },
                    "/docs/core/reaction/submitData": {
                        title: "submitData"
                    },
                    "/docs/core/reaction/triggerEvent": {
                        title: "triggerEvent"
                    }
                }
            },
            "/docs/core/element/html": {
                title: "HTML Elements",
                items: {
                    "/docs/core/element/html/AccordionItem": {
                        title: "AccordionItem"
                    },
                    "/docs/core/element/html/FolderSortableTree": {
                        title: "FolderSortableTree"
                    },
                    "/docs/core/element/html/FormatNumeral": {
                        title: "FormatNumeral"
                    },
                    "/docs/core/element/html/Html": {
                        title: "Html"
                    },
                    "/docs/core/element/html/LabelFromValue": {
                        title: "LabelFromValue"
                    },
                    "/docs/core/element/html/Modal": {
                        title: "Modal"
                    },
                    "/docs/core/element/html/PreformattedMarkup": {
                        title: "PreformattedMarkup"
                    },
                    "/docs/core/element/html/SortableTreeItemCollapseButton": {
                        title: "SortableTree ItemCollapseButton"
                    },
                    "/docs/core/element/html/Tabs": {
                        title: "Tabs"
                    }
                }
            },
            "/docs/core/element/form": {
                title: "Form Elements",
                items: {
                    "/docs/core/element/form/CheckBoxField": {
                        title: "CheckBoxField"
                    },
                    "/docs/core/element/form/DateField": {
                        title: "DateField"
                    },
                    "/docs/core/element/form/NumberField": {
                        title: "NumberField"
                    },
                    "/docs/core/element/form/SelectField": {
                        title: "SelectField"
                    },
                    "/docs/core/element/form/TextAreaField": {
                        title: "TextAreaField"
                    },
                    "/docs/core/element/form/TextField": {
                        title: "TextField"
                    },
                }
            },
            "/docs/core/element/special": {
                title: "Special Elements",
                items: {
                    "/docs/core/element/special/BootstrapElement": {
                        title: "BootstrapElement"
                    },
                    "/docs/core/element/special/Count": {
                        title: "Count"
                    },
                    "/docs/core/element/special/DataFilter": {
                        title: "DataFilter"
                    },
                    "/docs/core/element/special/DelayedActions": {
                        title: "DelayedActions"
                    },
                    "/docs/core/element/special/PageControls": {
                        title: "PageControls"
                    },
                    "/docs/core/element/special/Phantom": {
                        title: "Phantom"
                    },
                    "/docs/core/element/special/ReactiveJsonSubroot": {
                        title: "ReactiveJsonSubroot"
                    },
                    "/docs/core/element/special/Switch": {
                        title: "Switch"
                    }
                }
            },
            "/docs/core/example": {
                title: "Examples",
                items: {
                    "/docs/core/example/html": {
                        title: "HTML",
                    },
                    "/docs/core/example/accordion": {
                        title: "Accordion",
                    },
                    "/docs/core/example/dynamic-content": {
                        title: "Dynamic content",
                    },
                    "/docs/core/example/website": {
                        title: "Website example",
                    },
                }
            },
        }
    },
    "/docs/chartjs": {
        title: "Chart.js integration",
        items: {
            "/docs/chartjs/overview": {
                title: "Overview",
            },
            "/docs/chartjs/components": {
                title: "Chart.js components",
            },
        }
    },
    "/docs/extend": {
        title: "Extending Reactive-JSON",
        items: {
            "/docs/extend/index": {
                title: "Introduction"
            },
            "/docs/extend/component-development": {
                title: "Component Development"
            },
            "/docs/extend/plugin-system": {
                title: "Plugin System"
            }
        }
    },
    "/docs/docs-components": {
        title: "Documentation Components",
        items: {
            "/docs/docs-components/index": {
                title: "Overview"
            },
            "/docs/docs-components/SyntaxHighlighter": {
                title: "SyntaxHighlighter"
            }
        }
    }
}
