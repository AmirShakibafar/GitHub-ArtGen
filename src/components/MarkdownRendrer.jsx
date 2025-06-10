import ReactMarkdown from "react-markdown";
import readmeContent from "../assets/guide.md?raw"; // Ensure you have '?raw' to import as string

const MarkdownRenderer = () => {
  return (
    // The same consistent, glassy container as the other components
    <div className="w-[95%] md:w-[85%] mx-auto mt-10 dark:bg-gray-900/50 backdrop-blur-sm dark:border dark:border-slate-700 rounded-xl">
      <div
        className={`
          prose prose-sm sm:prose-base prose-invert 
          max-w-none p-6 md:p-8 
          text-purple-800 dark:text-purple-400
          
          prose-h1:text-5xl prose-h1:font-bold prose-h1:mb-4
          prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-pink-500 prose-h1:text-transparent prose-h1:bg-clip-text
          
          prose-h2:text-4xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-slate-700 prose-h2:pb-2 prose-h2:mb-3 prose-h2:dark:text-gray-300 prose-h2:text-gray-700
          
          prose-h3:text-xl prose-h3:font-semibold prose-h3:border-b prose-h3:border-slate-700 prose-h3:pb-2 prose-h3:mb-3 prose-h3:dark:text-gray-300 prose-h3:text-gray-700

          prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-7
          
          prose-a:text-pink-800 prose-a:dark:text-pink-500 prose-a:font-medium prose-a:no-underline
          hover:prose-a:underline hover:prose-a:text-pink-400
          
          prose-strong:text-purple-700 prose-strong:dark:text-purple-300
          
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500
          prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
          
          prose-code:bg-slate-300/50 prose-code:dark:bg-slate-800/50 prose-code:text-pink-800 prose-code:dark:text-pink-400 prose-code:font-mono 
          prose-code:px-2 prose-code:py-1 prose-code:rounded-md
          
          prose-pre:bg-slate-200/50 prose-pre:dark:bg-slate-800/50 prose-pre:dark:border prose-pre:border-slate-700
          prose-pre:rounded-lg prose-pre:p-4
          
          prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto
          prose-ul:list-disc prose-ul:marker:text-purple-700 prose-ul:marker:dark:text-purple-400
        `}
      >
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;