import ReactMarkdown from "react-markdown";
import readmeContent from "../assets/guide.md?raw";

const MarkdownRenderer = () => {
  return (
    <div
      className="prose max-w-[80%] p-4 mx-auto mt-10 text-text prose-h1:text-blue-800 
  prose-h2:text-green-800 
  prose-h3:text-purple-800
  dark:prose-h1:text-blue-600
  dark:prose-h2:text-green-600
  dark:prose-h3:text-purple-600
  prose-strong:text-black
  dark:prose-strong:text-red-500
  prose-code:font-mono dark:prose-code:text-text
  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500 dark:prose-a:text-blue-400
  "
    >
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
