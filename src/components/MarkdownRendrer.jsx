import ReactMarkdown from 'react-markdown';
import readmeContent from '../assets/README.md?raw';

const MarkdownRenderer = () => {
  return (
    <div className="prose max-w-none p-4"> 
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;