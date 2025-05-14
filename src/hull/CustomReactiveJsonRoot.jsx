import {ReactiveJsonRoot} from "@ea-lab/reactive-json";
import {mergeComponentCollections} from "@ea-lab/reactive-json";
import {chartjsComponents} from "@ea-lab/reactive-json-chartjs";
import Layout from "./Layout";
import {Col, Row} from "react-bootstrap";

export const CustomReactiveJsonRoot = (props) => {
    const additionalProps = {};

    additionalProps.DebugModeContentWrapper = ({children}) => {
        return <Col xs={9}>{children}</Col>;
    };

    additionalProps.DebugModeDataWrapper = ({children}) => {
        return <Col xs={3}><pre>{children}</pre></Col>;
    }

    additionalProps.DebugModeRootWrapper = ({children}) => {
        return <Layout><Row>{children}</Row></Layout>
    };

    additionalProps.plugins = mergeComponentCollections([chartjsComponents]);

    const finalProps = {...props, ...additionalProps};

    return <ReactiveJsonRoot {...finalProps}/>
};
