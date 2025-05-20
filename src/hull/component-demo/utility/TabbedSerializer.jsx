import * as jsyaml from "js-yaml";
import SyntaxHighlighter from "react-syntax-highlighter";
import {Tab, Tabs} from "react-bootstrap";

export const TabbedSerializer = ({rawContentToSerialize}) => {
    return <Tabs defaultActiveKey={"yaml"}>
        <Tab eventKey={"yaml"} title={"YAML"}>
            <SyntaxHighlighter language="yaml">{jsyaml.dump(rawContentToSerialize)}</SyntaxHighlighter>
        </Tab>
        <Tab eventKey={"json"} title={"JSON"}>
            <SyntaxHighlighter language="javascript">{JSON.stringify(rawContentToSerialize, null, 2)}</SyntaxHighlighter>
        </Tab>
    </Tabs>
};
