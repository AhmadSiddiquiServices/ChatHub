import React from "react";
import { Comment } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="Loader w-full h-[100vh] flex items-center justify-center opacity-70 z-[9999] bg-[#131324]">
        <Comment
          height={80}
          width={80}
          size={200}
          color="#fff"
          backgroundColor="#4e0eff"
        />
      </div>
    </>
  );
};

export default Loader;
