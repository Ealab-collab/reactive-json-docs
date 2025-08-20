import * as jsyaml from "js-yaml";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    docco as highlighterLightTheme,
    darcula as highlighterDarkTheme,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tab, Tabs } from "react-bootstrap";
import { useDarkMode } from "../hooks/useDarkMode.js";

export const TabbedSerializer = ({ props }) => {
    const isDarkMode = useDarkMode();
    const syntaxTheme = isDarkMode ? highlighterDarkTheme : highlighterLightTheme;

    // We let the user provide a YAML serialized content to let them
    // write comments in the rendered code.
    const yamlSerializedContent = props?.yamlSerializedContent || jsyaml.dump(props?.rawContentToSerialize);

    // When yamlSerializedContent is provided, we use it instead of the rawContentToSerialize.
    // We must then parse it to get the JSON equivalent.
    const jsonSerializedContent = props?.yamlSerializedContent
        ? JSON.stringify(jsyaml.load(yamlSerializedContent), null, 2)
        : JSON.stringify(props?.rawContentToSerialize, null, 2);

    return (
        <Tabs defaultActiveKey={"yaml"}>
            <Tab eventKey={"yaml"} title={"YAML"}>
                <SyntaxHighlighter language="yaml" style={syntaxTheme}>
                    {yamlSerializedContent}
                </SyntaxHighlighter>
            </Tab>
            <Tab eventKey={"json"} title={"JSON"}>
                <SyntaxHighlighter language="javascript" style={syntaxTheme}>
                    {jsonSerializedContent}
                </SyntaxHighlighter>
            </Tab>
        </Tabs>
    );
};
