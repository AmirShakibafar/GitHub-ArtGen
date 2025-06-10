import ReactMarkdown from "react-markdown";
import readmeContent from "../assets/guide.md?raw";

const MarkdownRenderer = () => {
  return (
    <div
      className="prose max-w-[80%] p-4 mx-auto mt-10 text-text prose-h1:text-blue-600 
  prose-h2:text-green-600 
  prose-h3:text-purple-600
  dark:prose-h1:text-blue-400
  dark:prose-h2:text-green-400
  prose-strong:text-white
  prose-code:font-mono dark:prose-code:text-text
  "
    >
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
