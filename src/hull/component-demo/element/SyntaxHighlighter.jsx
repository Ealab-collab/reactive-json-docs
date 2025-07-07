import { ActionDependant } from "@ea-lab/reactive-json/dist/engine";
import { GlobalDataContext } from "@ea-lab/reactive-json/dist/engine";
import { TemplateContext } from "@ea-lab/reactive-json/dist/engine";
import { evaluateTemplateValue } from "@ea-lab/reactive-json/dist/engine";
import { useEvaluatedAttributes } from "@ea-lab/reactive-json/dist/engine";
import { useContext } from "react";
import SyntaxHighlighter_Real from "react-syntax-highlighter";
import { docco, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDarkMode } from "../hooks/useDarkMode.js";

export const SyntaxHighlighter = ({ props }) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);
    const isDarkMode = useDarkMode();

    const evaluatedContent = evaluateTemplateValue({
        valueToEvaluate: props.content,
        globalDataContext,
        templateContext
    });

    const evaluatedLanguage = evaluateTemplateValue({
        valueToEvaluate: props.language || "text",
        globalDataContext,
        templateContext
    });

    const evaluatedStyle = evaluateTemplateValue({
        valueToEvaluate: props.style,
        globalDataContext,
        templateContext
    });

    const evaluatedLightStyle = evaluateTemplateValue({
        valueToEvaluate: props.lightStyle,
        globalDataContext,
        templateContext
    });

    const evaluatedDarkStyle = evaluateTemplateValue({
        valueToEvaluate: props.darkStyle,
        globalDataContext,
        templateContext
    });

    const attributes = useEvaluatedAttributes(props.attributes);

    // Logic for style selection with dark mode support.
    let styleToUse;
    
    if (evaluatedStyle) {
        // If a specific style is provided, use it.
        styleToUse = evaluatedStyle;
    } else if (isDarkMode && evaluatedDarkStyle) {
        // Dark mode with a specific dark style.
        styleToUse = evaluatedDarkStyle;
    } else if (!isDarkMode && evaluatedLightStyle) {
        // Light mode with a specific light style.
        styleToUse = evaluatedLightStyle;
    } else {
        // Default styles based on mode.
        styleToUse = isDarkMode ? atomOneDark : docco;
    }

    return (
        <ActionDependant {...props}>
            <div {...attributes}>
                <SyntaxHighlighter_Real 
                    language={evaluatedLanguage}
                    style={styleToUse}
                    showLineNumbers={props.showLineNumbers || false}
                    wrapLines={props.wrapLines || false}
                    wrapLongLines={props.wrapLongLines || false}
                >
                    {evaluatedContent || ''}
                </SyntaxHighlighter_Real>
            </div>
        </ActionDependant>
    );
}; 