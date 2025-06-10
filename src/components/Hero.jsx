import heroImage from "../assets/heroImageWithStroke.png";
const Hero = () => {
  return (
    <section className="flex justify-center items-center py-10">
      <img src={heroImage} alt="" className="w-100 h-100" />
      <div className="">
        <h1 className="text-7xl font-bold">
          GitHub Art
        </h1>
        <p className="text-2xl text-center">
          A digital artwork inspired by your GitHub contributions
        </p>
      </div>
    </section>
  );
};

export default Hero;
