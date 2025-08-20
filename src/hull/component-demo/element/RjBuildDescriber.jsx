import {
    evaluateTemplateValue,
    GlobalDataContext,
    ReactiveJsonRoot,
    TemplateContext,
    View,
} from "@ea-lab/reactive-json/dist/engine";
import { useContext } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { TabbedSerializer } from "../utility/TabbedSerializer.jsx";

export const RjBuildDescriber = ({ props }) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);

    const toDescribe = props?.toDescribe;

    if (!toDescribe?.renderView) {
        // Not yet ready.
        return;
    }

    return (
        <div className={"border mb-3 rounded p-3 bg-light"}>
            {props?.title && (
                <div className={"fw-bold border-bottom mb-3"}>
                    <View
                        props={evaluateTemplateValue({
                            globalDataContext,
                            templateContext,
                            valueToEvaluate: props.title,
                        })}
                    />
                </div>
            )}

            {props?.description && (
                <div className={"mb-3"}>
                    <View
                        props={evaluateTemplateValue({
                            globalDataContext,
                            templateContext,
                            valueToEvaluate: props.description,
                        })}
                    />
                </div>
            )}

            <Row className={"mb-5"}>
                <Col className={"mb-2"} xxl={6}>
                    <div className={"fw-bold mb-2"}>Result</div>
                    <div>
                        <ReactiveJsonRoot
                            plugins={globalDataContext?.plugins || null}
                            maybeRawAppRjBuild={JSON.stringify(toDescribe)}
                        />
                    </div>
                </Col>
                <Col className={"mb-2"} xxl={6}>
                    <div className={"fw-bold mb-2"}>Reactive-JSON build</div>
                    <div>
                        <Accordion defaultActiveKey={[]} alwaysOpen={true}>
                            <Accordion.Item eventKey={"0"}>
                                <Accordion.Header>renderView</Accordion.Header>
                                <Accordion.Body>
                                    <TabbedSerializer props={{ rawContentToSerialize: toDescribe.renderView }} />
                                </Accordion.Body>
                            </Accordion.Item>
                            {toDescribe.templates && (
                                <Accordion.Item eventKey={"1"}>
                                    <Accordion.Header>templates</Accordion.Header>
                                    <Accordion.Body>
                                        {toDescribe.templates ? (
                                            <TabbedSerializer props={{ rawContentToSerialize: toDescribe.templates }} />
                                        ) : (
                                            <em>(unset)</em>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                            {toDescribe.data && (
                                <Accordion.Item eventKey={"2"}>
                                    <Accordion.Header>data</Accordion.Header>
                                    <Accordion.Body>
                                        <TabbedSerializer props={{ rawContentToSerialize: toDescribe.data }} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
