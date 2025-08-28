import { ActionDependant } from "@ea-lab/reactive-json/dist/engine";
import { GlobalDataContext } from "@ea-lab/reactive-json/dist/engine";
import { TemplateContext } from "@ea-lab/reactive-json/dist/engine";
import { evaluateTemplateValue } from "@ea-lab/reactive-json/dist/engine";
import { useEvaluatedAttributes } from "@ea-lab/reactive-json/dist/engine";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import mermaid from "mermaid";
import { useDarkMode } from "../hooks/useDarkMode.js";

// Default Mermaid configuration
const getDefaultMermaidConfig = (isDarkMode) => ({
    startOnLoad: false,
    theme: isDarkMode ? "dark" : "default",
    themeVariables: {
        primaryColor: isDarkMode ? "#61dafb" : "#0066cc",
        primaryTextColor: isDarkMode ? "#ffffff" : "#000000",
        primaryBorderColor: isDarkMode ? "#61dafb" : "#0066cc",
        lineColor: isDarkMode ? "#ffffff" : "#000000",
        sectionBkgColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
        altSectionBkgColor: isDarkMode ? "#2d2d2d" : "#ffffff",
        gridColor: isDarkMode ? "#444444" : "#cccccc",
        secondaryColor: isDarkMode ? "#2d2d2d" : "#f0f0f0",
        tertiaryColor: isDarkMode ? "#444444" : "#f5f5f5",
    },
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
    },
    sequence: {
        useMaxWidth: true,
    },
    gantt: {
        useMaxWidth: true,
    },
});

export const Mermaid = ({ props }) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);
    const isDarkMode = useDarkMode();
    const mermaidRef = useRef(null);
    const [diagramId, setDiagramId] = useState("");

    const evaluatedContent = evaluateTemplateValue({
        valueToEvaluate: props.content,
        globalDataContext,
        templateContext,
    });

    const attributes = useEvaluatedAttributes(props.attributes);

    // Merge default config with user-provided config
    const mermaidConfig = useMemo(() => {
        const defaultConfig = getDefaultMermaidConfig(isDarkMode);
        const userConfig = props.mermaidConfig || {};
        
        // Deep merge the configurations
        return {
            ...defaultConfig,
            ...userConfig,
            themeVariables: {
                ...defaultConfig.themeVariables,
                ...(userConfig.themeVariables || {})
            },
            flowchart: {
                ...defaultConfig.flowchart,
                ...(userConfig.flowchart || {})
            },
            sequence: {
                ...defaultConfig.sequence,
                ...(userConfig.sequence || {})
            },
            gantt: {
                ...defaultConfig.gantt,
                ...(userConfig.gantt || {})
            },
        };
    }, [isDarkMode, props.mermaidConfig]);

    useEffect(() => {
        // Initialize Mermaid with merged configuration
        mermaid.initialize(mermaidConfig);
    }, [mermaidConfig]);

    useEffect(() => {
        if (evaluatedContent && mermaidRef.current) {
            // Generate unique ID for this diagram
            const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            setDiagramId(id);

            // Clear previous content
            mermaidRef.current.innerHTML = "";
            
            // Render the mermaid diagram
            try {
                mermaid.render(id, evaluatedContent)
                    .then(({ svg }) => {
                        if (mermaidRef.current) {
                            mermaidRef.current.innerHTML = svg;
                        }
                    })
                    .catch((error) => {
                        console.error("Mermaid rendering error:", error.message || "Unknown error", {
                            content: evaluatedContent,
                            error: error
                        });
                        // Don't display anything on error - only log to console
                        if (mermaidRef.current) {
                            mermaidRef.current.innerHTML = "";
                        }
                    });
            } catch (error) {
                console.error("Mermaid initialization error:", error.message || "Unknown error", {
                    content: evaluatedContent,
                    error: error
                });
                // Don't display anything on error - only log to console
                if (mermaidRef.current) {
                    mermaidRef.current.innerHTML = "";
                }
            }
        }
    }, [evaluatedContent, mermaidConfig]);

    return (
        <ActionDependant {...props}>
            <div
                {...attributes}
                ref={mermaidRef}
            />
        </ActionDependant>
    );
};
