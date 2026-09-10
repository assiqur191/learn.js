// import React from "react";

import { useState } from "react";

export const Demo = () => {
  const [count, setCount] = useState(0);
  console.log(count);

  const wrongIncriment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  const rightIncriment = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col space-y-2 justify-center items-center border shadow-2xl">
        <p className="text-4xl">{count}</p>
        <div className="flex gap-2">
          <button
            onClick={wrongIncriment}
            className="boder px-1 py-1 bg-red-500 shadow-2xl rounded-md cursor-pointer active:scale-95"
          >
            wrong Press
          </button>
          <button
            onClick={rightIncriment}
            className="boder px-1 py-1 bg-green-500 shadow-2xl rounded-md cursor-pointer active:scale-95"
          >
            right press
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
