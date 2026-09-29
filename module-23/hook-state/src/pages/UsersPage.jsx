// import React from 'react'

import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// import { Link } from "react-router";

const UsersPage = () => {
  // const [users, setUser] = useState([]);
  // const [loding, setloding] = useState(true);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const fetchUri = await fetch(
  //       "https://jsonplaceholder.typicode.com/users",
  //     );
  //     const res = await fetchUri.json();
  //     setUser(res);
  //     setloding(false);
  //   };
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setloding(true);
  //     const getUser = await axios.get(
  //       "https://jsonplaceholder.typicode.com/users",
  //     );
  //     const userslist = getUser.data;
  //     setUser(userslist);
  //     setloding(false);
  //   };
  //   fetchUser();
  // }, []);

  const fetchUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  };

  const {
    data: users,
    ispending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log(users);

  if (ispending) return <p>loading....</p>;
  if (error) return <p>Error:{error.message}</p>;

  console.log(users);

  return (
    <div>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
};

export default UsersPage;
