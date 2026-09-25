import { useState } from "react";

export const NormalForm = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <div className="flex justify-center items-center  w-full h-screen">
      <form className="flex flex-col gap-2 max-w-52">
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="border "
          placeholder="Enter UR Name"
        />
        <button
          onClick={handleSubmit}
          className="border px-1 rounded-md cursor-pointer"
        >
          submit
        </button>
      </form>
    </div>
  );
};
