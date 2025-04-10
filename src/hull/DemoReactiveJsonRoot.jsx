import ReactiveJsonRoot from "../engine/ReactiveJsonRoot";
import Layout from "./Layout";
import {Col, Row} from "react-bootstrap";

const DemoReactiveJsonRoot = (props) => {
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

    return <ReactiveJsonRoot {...props} {...additionalProps}/>
};

export default DemoReactiveJsonRoot;
