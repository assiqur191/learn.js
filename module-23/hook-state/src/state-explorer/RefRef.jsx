// import React from 'react'

import { useEffect, useRef, useState } from "react";

export const RefRef = () => {
  const inputRef = useRef(null);
  const pRef = useRef(null);
  const [isColourChanged, setisColourChanged] = useState(false);
  //   useEffect(() => {
  //     inputRef.current.focus();
  //   });
  return (
    <div className=" flex flex-wrap gap-2 py-2 px-2">
      <p ref={pRef}> multi colour text </p>
      <input type="text" className="border border-green-400" ref={inputRef} />
      <button
        onClick={() => inputRef.current.focus()}
        className="border bg-amber-400 active:scale-95 rounded-md cursor-pointer px-1"
      >
        focus
      </button>
      <button
        onClick={() =>
          (pRef.current.className = `${isColourChanged ? "text-red-500" : "text-green-500"} text-5xl`)
        }
        className="border bg-green-400 active:scale-95 rounded-md cursor-pointer px-1"
      >
        Text
      </button>
      <button
        onClick={() => setisColourChanged((prev) => !prev)}
        className="border bg-blue-500 rounded-2xl px-1 cursor-pointer"
      >
        show text
      </button>
    </div>
  );
};
export default RefRef;
