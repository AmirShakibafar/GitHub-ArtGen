import heroImage from "../assets/heroImg.png";
import { FaGithub, FaStar } from "react-icons/fa"; // Using react-icons for GitHub icons

const Hero = () => {
  const openGitHubRepo = () => {
    window.open("https://github.com/AmirShakibafar/your-repo", "_blank");
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center py-10 gap-8 px-4">
      <img 
        src={heroImage} 
        alt="GitHub Art Illustration" 
        className="w-64 h-64 md:w-80 md:h-80 object-contain" 
      />
      
      <div className="text-center md:text-left max-w-2lg">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          GitHub Art
        </h1>
        <p className="text-[1rem] md:text-xl mb-6">
          a website to help you create fun artworks in your GitHub contribution charts!!
        </p>
        
        <button
          onClick={openGitHubRepo}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto md:mx-0 transition-colors"
        >
          <FaGithub className="text-xl" />
          <FaStar className="text-yellow-400" />
          Star on GitHub
        </button>
      </div>
    </section>
  );
};

export default Hero;