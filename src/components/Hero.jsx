import heroImage from "../assets/heroImg.png";
import { FaGithub, FaStar } from "react-icons/fa";

const Hero = () => {
  const openGitHubRepo = () => {
    window.open("https://github.com/AmirShakibafar/GitHub-ArtGen", "_blank");
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center py-16 md:py-24 gap-10 px-4">
      {/* Interactive Hero Image with a subtle hover effect */}
      <img 
        src={heroImage} 
        alt="GitHub Art Illustration" 
        className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform duration-300 ease-in-out hover:scale-105" 
      />
      
      <div className="text-center md:text-left max-w-2xl">
        {/* Gradient Header - The main visual punch */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          GitHub Art
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Design stunning artwork on your GitHub contribution graph.
        </p>
        
        {/* Revamped Button with purple theme and hover effects */}
        <button
          onClick={openGitHubRepo}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-3 mx-auto md:mx-0 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
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