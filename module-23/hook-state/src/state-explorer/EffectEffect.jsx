// import React from "react";

import { useEffect, useState } from "react";

export const EffectEffect = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(" update ccount");
    document.title = `you clicked ${count} times`;
    // console.log(count);
  }, [count]);
  return (
    <div>
      <div className="flex flex-col gap-2 w-52">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded"
        />
        <button
          onClick={() => setCount(count + 1)}
          className="border-2 p-1 rounded-2xl  bg-amber-500 text-white text-2xl  shadow-2xl active:scale-95 cursor-pointer"
        >
          clicked {count} times
        </button>
      </div>
    </div>
  );
};
export default EffectEffect;
