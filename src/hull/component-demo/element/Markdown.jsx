import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({props}) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{props?.content}</ReactMarkdown>
    );
};
