/* 
 this user service 
    -is actual data handaling / Bussiness logic
    -keeps the controller clean
*/

let users = [];

//return all users
export const getAllUsers = () => {
  return users;
};

//add a new user

export const addUser = (user) => {
  /* 
    user = {name: 'zakir', email : 'zakir@gmail.com'}
    */
  const newUser = {
    id: crypto.randomUUID(),
    ...user,
  };
  users.push(newUser);

  return newUser;
};
