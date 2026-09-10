// import React from 'react'

import { useState } from "react";

export const FormDemo = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
  });
  return (
    <div>
      <form>
        <input
          type="text"
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          className="border p-1"
        />
        <input
          type="text"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          className="border p-1"
        />
        <div className="flex gap-2">
          <p>first Name:{user.firstname}</p>
          <p>lastname Name:{user.lastname}</p>
        </div>
      </form>
    </div>
  );
};
export default FormDemo;
