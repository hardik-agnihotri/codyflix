import React from "react";
import { Link } from "react-router-dom";

const MovieBanner = () => {
  return (
    <div className="w-[100%] h-[50vh] flex relative">
      <div className="p-6  content w-[40%] bg-black text-white h-full">
        <h2 className="text-4xl mt-6 font-bold">Money Heist</h2>
        <p className=" text-xl mt-4">Ratings: 8/10</p>
        <p className=" text-sm mt-4">Category: <span className="text-amber-300"> <Link to={'/category'}>Crime</Link></span></p>
        <div className="btn relative top-[15px]">
          <button className="px-15 mr-2 py-[8px] mt-5 bg-red-700 rounded hover:opacity-75 transition-all">
            Play
          </button>
          <button className="px-10 py-[8px] bg-amber-50 rounded text-black hover:opacity-75 transition-all">
            Watch later
          </button>
        </div>
      </div>
      {/* Movie banner image url will be dynamic we will get latest movie in this url */}
      <div className="w-[60%] h-full movie-image-url bg-center bg-no-repeat bg-fixed bg-cover relative bg-[url('./assets/hero.jpg')]">
        {/* Left black fade */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>

        {/* Bottom black fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default MovieBanner;
