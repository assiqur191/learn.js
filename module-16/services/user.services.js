let users = [];
//get user data from model ( now model is not here so takeing sample)
export const getAllUsers = () => {
  return users;
};
//add user
export const addNewUser = (user) => {
  //create an new user
  const newUser = {
    id: crypto.randomUUID(),
    ...user,
  };
  users.push(newUser);
  return newUser;
};

//update user
export const updateUserService = (id, updateData) => {
  const user = users.find((user) => user.id === Number(id));
  if (user == null) {
    throw console.error("User not found");
  }
  Object.assign(user, updateData);
  return user;
};

// delete user
export const deleteUserService = (id) => {
  const user = users.find((user) => user.id === Number(id));
  if (user === -1) return null;
  return users.splice(user, 1)[0];
};

//login user
export const loginUserService = ({ email, password }) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  user.isLogedIn = true;
  return user;
};

//logout
export const logoutUserService = (id) => {
  const user = users.find((u) => u.id === Number(id));
  if (!user) return null;
  user.isLogedIn = false;
  return user;
};

//change pass
export const changePasswordService = (id, newpassword) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.password = newpassword;
  return user;
};
//make admin
export const makeAdminService = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.role = "user";
  return user;
};
//remove admin
export const removeAdminService = (id, newRole) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.role = newRole.tirm();
  return user;
};
//search
export const searchService = (keyword) => {
  return users.filter((user) => {
    user.name?.toLowerCase().includes(keyword.toLowerCase());
  });
};
// filter user
export const filterService = (role) => {
  return users.filter((user) => user.role === role);
};
//block user
export const blockUserService = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.isBlocked = true;
  return user;
};
//unblock user
export const unblockUserService = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.isBlocked = false;
  return user;
};
//verify email
export const verifyEmailService = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.isVerified = true;
  return user;
};
//veification send
export const resendVerificationService = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  return {
    userId: user.id,
    verificationSent: true,
  };
};
//upload profile image
export const uploadProfilePictureService = (id, imageUrl) => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.profilePicture = imageUrl;
};
//delete account
export const deleteAccountService = (id) => {
  const user = users.findIndex((u) => u.id === id);
  if (user === -1) return null;
  return users.splice(user, 1)[0];
};
