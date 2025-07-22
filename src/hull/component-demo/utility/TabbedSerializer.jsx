import * as jsyaml from "js-yaml";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    docco as highlighterLightTheme,
    darcula as highlighterDarkTheme,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {Tab, Tabs} from "react-bootstrap";
import { useDarkMode } from "../hooks/useDarkMode.js";

export const TabbedSerializer = ({rawContentToSerialize}) => {
    const isDarkMode = useDarkMode();
    const syntaxTheme = isDarkMode ? highlighterDarkTheme : highlighterLightTheme;
    
    return <Tabs defaultActiveKey={"yaml"}>
        <Tab eventKey={"yaml"} title={"YAML"}>
            <SyntaxHighlighter language="yaml" style={syntaxTheme}>
                {jsyaml.dump(rawContentToSerialize)}
            </SyntaxHighlighter>
        </Tab>
        <Tab eventKey={"json"} title={"JSON"}>
            <SyntaxHighlighter language="javascript" style={syntaxTheme}>
                {JSON.stringify(rawContentToSerialize, null, 2)}
            </SyntaxHighlighter>
        </Tab>
    </Tabs>
};
