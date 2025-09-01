/**
 * Plugin definition for the docs components.
 *
 * This file exposes the referenced components so that
 * we can use them in the rjbuilds.
 *
 * It also contains a navigation tree.
 */
import { DefinitionList } from "./element/DefinitionList.jsx";
import { DemoContentMapper } from "./element/DemoContentMapper.jsx";
import { Markdown } from "./element/Markdown.jsx";
import { Mermaid } from "./element/Mermaid.jsx";
import { RjBuildDescriber } from "./element/RjBuildDescriber.jsx";
import { Sidebar } from "./element/Sidebar.jsx";
import { SyntaxHighlighter } from "./element/SyntaxHighlighter.jsx";
import { TabbedSerializer } from "./utility/TabbedSerializer.jsx";

export const demoPlugins = {
    element: {
        DefinitionList,
        DemoContentMapper,
        Markdown,
        Mermaid,
        RjBuildDescriber,
        Sidebar,
        SyntaxHighlighter,
        TabbedSerializer,
    },
};

export const docsPageNavigation = {
    "/docs": {
        title: "Introduction",
    },
    "/docs/install": {
        title: "Installation",
    },
    "/docs/getting-started": {
        title: "Getting started",
        items: {
            "/docs/getting-started/index": {
                title: "Overview",
            },
            "/docs/getting-started/rjbuild-structure": {
                title: "RjBuild structure",
            },
            "/docs/getting-started/template-contexts-data-binding": {
                title: "Template, contexts, and data binding",
            },
            "/docs/getting-started/actions": {
                title: "Actions",
            },
            "/docs/getting-started/reactions": {
                title: "Reactions",
            },
        },
    },
    "/docs/advanced-concepts": {
        title: "Advanced concepts",
        items: {
            "/docs/advanced-concepts/index": {
                title: "Overview",
            },
            "/docs/advanced-concepts/data-processors": {
                title: "Data Processors",
            },
            "/docs/advanced-concepts/data-mapping": {
                title: "Data mapping",
            },
            "/docs/advanced-concepts/forward-update": {
                title: "Forward Update",
            },
            "/docs/advanced-concepts/plugins": {
                title: "Extending Reactive-JSON",
                items: {
                    "/docs/advanced-concepts/plugins/index": {
                        title: "Introduction",
                    },
                    "/docs/advanced-concepts/plugins/component-development": {
                        title: "Component Development",
                    },
                    "/docs/advanced-concepts/plugins/plugin-system": {
                        title: "Plugin System",
                    },
                },
            },
        },
    },
    "/docs/core": {
        title: "Core components",
        items: {
            "/docs/core/action": {
                title: "Actions",
                items: {
                    "/docs/core/action/index": {
                        title: "Index",
                    },
                    "/docs/core/action/Attribute": {
                        title: "Attribute",
                        items: {
                            "/docs/core/action/Attribute/index": {
                                title: "Index",
                            },
                            "/docs/core/action/Attribute/SetAttributeValue": {
                                title: "SetAttributeValue",
                            },
                            "/docs/core/action/Attribute/UnsetAttribute": {
                                title: "UnsetAttribute",
                            },
                            "/docs/core/action/Attribute/UnsetAttributeValue": {
                                title: "UnsetAttributeValue",
                            },
                            "/docs/core/action/Attribute/ToggleAttributeValue": {
                                title: "ToggleAttributeValue",
                            },
                        },
                    },
                    "/docs/core/action/HashChangeListener": {
                        title: "HashChangeListener",
                    },
                    "/docs/core/action/Hide": {
                        title: "Hide",
                    },
                    "/docs/core/action/MessageListener": {
                        title: "MessageListener",
                    },

                    "/docs/core/action/ReactOnEvent": {
                        title: "ReactOnEvent",
                    },
                    "/docs/core/action/Redirect": {
                        title: "Redirect",
                    },

                    "/docs/core/action/VisuallyHide": {
                        title: "VisuallyHide",
                    },
                },
            },
            "/docs/core/reaction": {
                title: "Reactions",
                items: {
                    "/docs/core/reaction/index": {
                        title: "Index",
                    },
                    "/docs/core/reaction/addData": {
                        title: "addData",
                    },
                    "/docs/core/reaction/fetchData": {
                        title: "fetchData",
                    },
                    "/docs/core/reaction/moveData": {
                        title: "moveData",
                    },
                    "/docs/core/reaction/postMessage": {
                        title: "postMessage",
                    },
                    "/docs/core/reaction/redirectNow": {
                        title: "redirectNow",
                    },
                    "/docs/core/reaction/removeData": {
                        title: "removeData",
                    },
                    "/docs/core/reaction/setClipboardData": {
                        title: "setClipboardData",
                    },
                    "/docs/core/reaction/setData": {
                        title: "setData",
                    },
                    "/docs/core/reaction/submitData": {
                        title: "submitData",
                    },
                    "/docs/core/reaction/triggerEvent": {
                        title: "triggerEvent",
                    },
                },
            },
            "/docs/core/attributeTransformer": {
                title: "Attribute transformers",
                items: {
                    "/docs/core/attributeTransformer/index": {
                        title: "Index",
                    },
                    "/docs/core/attributeTransformer/setAttributeValue": {
                        title: "setAttributeValue",
                    },
                    "/docs/core/attributeTransformer/unsetAttribute": {
                        title: "unsetAttribute",
                    },
                    "/docs/core/attributeTransformer/unsetAttributeValue": {
                        title: "unsetAttributeValue",
                    },
                    "/docs/core/attributeTransformer/toggleAttributeValue": {
                        title: "toggleAttributeValue",
                    },
                },
            },
            "/docs/core/hook": {
                title: "Hooks",
                items: {
                    "/docs/core/hook/index": {
                        title: "Index",
                    },
                    "/docs/core/hook/usePagination": {
                        title: "usePagination",
                    },
                    "/docs/core/hook/useTransformedAttributes": {
                        title: "useTransformedAttributes",
                    },
                },
            },
            "/docs/core/element/form": {
                title: "Form elements",
                items: {
                    "/docs/core/element/form/Input": {
                        title: "Input",
                    },
                },
            },
            "/docs/core/element/html": {
                title: "HTML elements",
                items: {
                    "/docs/core/element/html/FolderSortableTree": {
                        title: "FolderSortableTree",
                    },
                    "/docs/core/element/html/FormatNumeral": {
                        title: "FormatNumeral",
                    },
                    "/docs/core/element/html/Html": {
                        title: "Html",
                    },
                    "/docs/core/element/html/LabelFromValue": {
                        title: "LabelFromValue",
                    },
                    "/docs/core/element/html/PreformattedMarkup": {
                        title: "PreformattedMarkup",
                    },
                    "/docs/core/element/html/SortableTreeItemCollapseButton": {
                        title: "SortableTree ItemCollapseButton",
                    },
                },
            },
            "/docs/core/element/special": {
                title: "Special elements",
                items: {
                    "/docs/core/element/special/Count": {
                        title: "Count",
                    },
                    "/docs/core/element/special/DataFilter": {
                        title: "DataFilter",
                    },
                    "/docs/core/element/special/DelayedActions": {
                        title: "DelayedActions",
                    },
                    "/docs/core/element/special/PageControls": {
                        title: "PageControls",
                    },
                    "/docs/core/element/special/Phantom": {
                        title: "Phantom",
                    },
                    "/docs/core/element/special/ReactiveJsonSubroot": {
                        title: "ReactiveJsonSubroot",
                    },
                    "/docs/core/element/special/Switch": {
                        title: "Switch",
                    },
                },
            },
            "/docs/core/element/debug": {
                title: "Debug elements",
                items: {
                    "/docs/core/element/debug/VariablesDebug": {
                        title: "VariablesDebug",
                    },
                },
            },
            "/docs/core/dataMapping": {
                title: "Data mapping",
                items: {
                    "/docs/core/dataMapping/index": {
                        title: "Overview",
                    },
                    "/docs/core/dataMapping/simpleMapping": {
                        title: "SimpleMapping",
                    },
                },
            },
            "/docs/core/example": {
                title: "Examples",
                items: {
                    "/docs/core/example/html": {
                        title: "HTML",
                    },
                    "/docs/core/example/native-html-forms": {
                        title: "Native HTML Forms",
                    },
                },
            },
        },
    },
    "/docs/integration": {
        title: "3rd party integrations",
        items: {
            "/docs/integration/bootstrap": {
                title: "Bootstrap",
                items: {
                    "/docs/integration/bootstrap/overview": {
                        title: "Overview",
                    },
                    "/docs/integration/bootstrap/action": {
                        title: "Actions",
                        items: {
                            "/docs/integration/bootstrap/action/index": {
                                title: "Index",
                            },
                            "/docs/integration/bootstrap/action/Popover": {
                                title: "Popover",
                            },
                            "/docs/integration/bootstrap/action/Tooltip": {
                                title: "Tooltip",
                            },
                        },
                    },
                    "/docs/integration/bootstrap/element/form": {
                        title: "Form elements",
                        items: {
                            "/docs/integration/bootstrap/element/form/CheckBoxField": {
                                title: "CheckBoxField",
                            },
                            "/docs/integration/bootstrap/element/form/DateField": {
                                title: "DateField",
                            },
                            "/docs/integration/bootstrap/element/form/NumberField": {
                                title: "NumberField",
                            },
                            "/docs/integration/bootstrap/element/form/SelectField": {
                                title: "SelectField",
                            },
                            "/docs/integration/bootstrap/element/form/TextAreaField": {
                                title: "TextAreaField",
                            },
                            "/docs/integration/bootstrap/element/form/TextField": {
                                title: "TextField",
                            },
                        },
                    },
                    "/docs/integration/bootstrap/element/html": {
                        title: "HTML elements",
                        items: {
                            "/docs/integration/bootstrap/element/html/AccordionItem": {
                                title: "AccordionItem",
                            },
                            "/docs/integration/bootstrap/element/html/Modal": {
                                title: "Modal",
                            },
                            "/docs/integration/bootstrap/element/html/Tabs": {
                                title: "Tabs",
                            },
                        },
                    },
                    "/docs/integration/bootstrap/element/special": {
                        title: "Special elements",
                        items: {
                            "/docs/integration/bootstrap/element/special/BootstrapElement": {
                                title: "BootstrapElement",
                            },
                        },
                    },
                    "/docs/integration/bootstrap/example": {
                        title: "Examples",
                        items: {
                            "/docs/integration/bootstrap/example/accordion": {
                                title: "Accordion",
                            },
                            "/docs/integration/bootstrap/example/dynamic-content": {
                                title: "Dynamic content",
                            },
                            "/docs/integration/bootstrap/example/website": {
                                title: "Website example",
                            },
                        },
                    },
                },
            },
            "/docs/integration/chartjs": {
                title: "Chart.js",
                items: {
                    "/docs/integration/chartjs/overview": {
                        title: "Overview",
                    },
                    "/docs/integration/chartjs/components": {
                        title: "Chart.js components",
                    },
                },
            },
        },
    },
    "/docs/docs-components": {
        title: "Documentation components",
        items: {
            "/docs/docs-components/index": {
                title: "Overview",
            },
            "/docs/docs-components/Mermaid": {
                title: "Mermaid",
            },
            "/docs/docs-components/SyntaxHighlighter": {
                title: "SyntaxHighlighter",
            },
        },
    },
};
