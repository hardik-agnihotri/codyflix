import React from "react";
import Sidebar from "../components/Sidebar";
import MovieBanner from "../components/MovieBanner";
import MovieCard from "../components/MovieCard";

const Browse = () => {
  return (
    <div className="relative h-full w-full flex">
      <Sidebar />
      <div className="h-full w-full flex flex-col">
        <MovieBanner />
        <div className="mt-4 p-4">
          <h1 className="text-4xl font-bold text-white ">Trending movie</h1>
          <div className="flex gap-8">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
