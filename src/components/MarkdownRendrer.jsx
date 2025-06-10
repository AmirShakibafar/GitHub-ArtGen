import ReactMarkdown from "react-markdown";
import readmeContent from "../assets/guide.md?raw";

const MarkdownRenderer = () => {
  return (
    <div
      className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl 
      max-w-[90%] md:max-w-[80%] p-4 mx-auto mt-10 
      text-gray-800 dark:text-gray-200 
      prose-h1:text-3xl sm:prose-h1:text-4xl font-bold
      prose-h2:text-2xl sm:prose-h2:text-3xl 
      prose-h3:text-xl sm:prose-h3:text-2xl
      prose-h1:text-purple-800 dark:prose-h1:text-purple-400
      prose-h2:text-blue-800 dark:prose-h2:text-blue-400
      prose-h3:text-green-800 dark:prose-h3:text-green-400
      prose-h4:text-orange-800 dark:prose-h4:text-orange-400
      prose-strong:text-black dark:prose-strong:text-red-400
      prose-code:font-mono prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
      prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-pre:bg-gray-100 dark:prose-code:text-white prose-code:text-black dark:prose-pre:bg-gray-800
      prose-pre:rounded-lg prose-pre:p-4
      prose-blockquote:border-l-4 prose-blockquote:border-gray-400
      prose-blockquote:pl-4 prose-blockquote:italic
      prose-a:text-blue-600 dark:prose-a:text-blue-400
      prose-a:underline hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300
      prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto
      prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-600
      prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600
      prose-th:bg-gray-100 dark:prose-th:bg-gray-700
      prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-600
      prose-ul:list-disc prose-ol:list-decimal
      prose-li:my-1"
    >
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
