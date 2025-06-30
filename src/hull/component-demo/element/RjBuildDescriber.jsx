import {TabbedSerializer} from "../utility/TabbedSerializer.jsx";
import {
    evaluateTemplateValue,
    GlobalDataContext,
    ReactiveJsonRoot,
    TemplateContext,
    View
} from "@ea-lab/reactive-json/dist/engine";
import {useContext} from "react";
import {Accordion, Col, Row} from "react-bootstrap";

export const RjBuildDescriber = ({props}) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);

    const toDescribe = props?.toDescribe;

    if (!toDescribe?.renderView) {
        // Not yet ready.
        return;
    }

    return (<div>

        {props?.title && <div className={"fs-3 mb-3"}>{evaluateTemplateValue({
            globalDataContext,
            templateContext,
            valueToEvaluate: props.title
        })}</div>}

        {props?.description && <div className={"mb-3"}>
            <View props={evaluateTemplateValue({
                globalDataContext,
                templateContext,
                valueToEvaluate: props.description
            })}/></div>}

        <Row className={"mb-5"}>
            <Col className={"mb-2"} xxl={6}>
                <div className={"fw-bold mb-2"}>Result</div>
                <div><ReactiveJsonRoot plugins={globalDataContext?.plugins || null} maybeRawAppData={JSON.stringify(toDescribe)}/></div>
            </Col>
            <Col className={"mb-2"} xxl={6}>
                <div className={"fw-bold mb-2"}>Reactive-JSON build</div>
                <div>
                    <Accordion defaultActiveKey={[]} alwaysOpen={true}>
                        <Accordion.Item eventKey={"0"}>
                            <Accordion.Header>renderView</Accordion.Header>
                            <Accordion.Body>
                                <TabbedSerializer rawContentToSerialize={toDescribe.renderView}/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={"1"}>
                            <Accordion.Header>templates</Accordion.Header>
                            <Accordion.Body>{toDescribe.templates ? <TabbedSerializer rawContentToSerialize={toDescribe.templates}/> :
                                <em>(unset)</em>}</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={"2"}>
                            <Accordion.Header>data</Accordion.Header>
                            <Accordion.Body><TabbedSerializer rawContentToSerialize={toDescribe.data}/></Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Col>
        </Row>
    </div>);
};
