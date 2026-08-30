import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>count:{count}</div>
      <button
        className="px-6 py-2.5 bg-emerald-600 border-2 border-emerald-500 text-white shadow-md 
        font-medium text-sm rounded-full hover:bg-emerald-700 hover:shadow-xl hover:shadow-black/80 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-amber-500  active:scale-95 transition-all duration-200"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increase
      </button>
    </div>
  );
};

export default Counter;
