import { ActionDependant, useEvaluatedAttributes, View } from "@ea-lab/reactive-json";

/**
 * DefinitionList component renders HTML definition lists (<dl>) with terms and details.
 *
 * @param {Object} props - Component props
 * @param {Object} currentData - Current data context
 * @param {string} path - Current path in the data
 * @param {string} datafield - Current data field
 */
export const DefinitionList = ({ props, currentData, path, datafield }) => {
    const attributes = useEvaluatedAttributes(props.attributes);

    if (!props.content || !Array.isArray(props.content)) {
        return null;
    }

    return (
        <ActionDependant {...props}>
            <dl {...attributes}>
                {props.content.map((item, index) => {
                    if (!item || typeof item !== "object") {
                        return null;
                    }

                    const itemPath = `${path}.content.${index}`;
                    const itemData = currentData?.content?.[index];

                    // Render the term (dt).
                    const renderTerm = () => {
                        if (!item.term) {
                            return null;
                        }

                        const dtStyle = { marginTop: "2em" };

                        if (typeof item.term === "string" || typeof item.term === "number") {
                            // term is a scalar value, wrap it in <code>.
                            const id = item.term ? item.term.replace(/[^a-zA-Z0-9-]/g, "") : undefined;

                            return (
                                <dt key={`term-${index}`} id={id} style={dtStyle}>
                                    <a href={`#${id}`}>
                                        <code>{item.term}</code>
                                    </a>
                                </dt>
                            );
                        }

                        if (typeof item.term === "object" && item.term !== null) {
                            const { code, after } = item.term;
                            const id = code ? code.replace(/[^a-zA-Z0-9-]/g, "") : undefined;

                            return (
                                <dt key={`term-${index}`} id={id} style={dtStyle}>
                                    <a href={`#${id}`}>
                                        {code && <code>{code}</code>}
                                        {after && <span> {after}</span>}
                                    </a>
                                </dt>
                            );
                        }

                        return null;
                    };

                    // Render the details (dd).
                    const renderDetails = () => {
                        if (!item.details) {
                            return null;
                        }

                        return (
                            <dd key={`details-${index}`} style={{ marginInlineStart: "1.5em", marginTop: "0.8em" }}>
                                <View
                                    props={item.details}
                                    path={`${itemPath}.details`}
                                    currentData={itemData?.details}
                                    datafield="details"
                                />
                            </dd>
                        );
                    };

                    return [renderTerm(), renderDetails()].filter(Boolean);
                })}
            </dl>
        </ActionDependant>
    );
};
