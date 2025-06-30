import ReactMarkdown from "react-markdown";

export const Markdown = ({props}) => {
    return (
        <ReactMarkdown>{props?.content}</ReactMarkdown>
    );
};
