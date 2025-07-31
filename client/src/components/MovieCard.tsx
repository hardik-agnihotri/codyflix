import React from "react";
import sampleBanner from "../assets/sample_movie_banner.jpg"; // fix path

const MovieCard = () => {
  return (
    <div className="relative mt-6 w-[200px] h-[290px] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img
        src={sampleBanner}
        alt="Movie"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
        <h3 className="text-lg font-semibold mb-1">Money Heist</h3>
        <p className="text-sm mb-2">⭐ 8/10</p>
        <p className="text-xs leading-tight line-clamp-4">
          When Spencer goes back into the fantastical world of Jumanji, pals
          Martha, Fridge and Bethany re-enter the game to bring him home. But
          the game is now broken -- and fighting back.
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
