import {
  addNewUser,
  getAllUsers,
  updateUserService,
  deleteUserService,
} from "../services/user.services.js";

//get all the users
export const getUser = (req, res) => {
  const users = getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
};

//create a new user
export const createUser = (req, res) => {
  const user = addNewUser(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
};

//geting user by id
export const getUserById = (id) => {
  return users.find((user) => user.id === Number(id));
};

//Update User
export const updateUser = (req, res) => {
  const updatedUser = updateUserService(req.params.id, req.body);
  if (!updateUser) {
    res.status(404).json({
      success: false,
      massage: "User not found",
    });
  }

  res.status(200).json({
    success: false,
    massage: "User update successfully",
    data: updateUser,
  });
};
//delete user
export const deleteUser = (req, res) => {
  const deleteUserById = deleteUserService(req.params.id);
  if (!deleteUserById) {
    return res.status(404).json({
      success: false,
      massage: "Not found",
    });
  }
  res.status(202).json({
    success: true,
    massage: "succefully deleted",
  });
  getAllUsers();
};

//login user
export const loginUser = (req, res) => {
  const user = loginUserService(req.body);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid email and pass",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Login successfully",
    data: user,
  });
};
export const logoutUser = (req, res) => {
  const user = logoutUserService(req.body.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Logout successfully",
    data: user,
  });
};
//change password
export const changePassword = (req, res) => {
  const user = changePasswordService(req.body.id, req.body.newPassword);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user or password",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Password Changed succesfully",
    data: user,
  });
};
//addmin
export const addAdmin = (req, res) => {
  const user = makeAdminService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Admin Set Successfully",
    data: user,
  });
};
//remove admin
export const removeAdmin = (req, res) => {
  const user = removeAdminService(req.body.id, req.body.newRole);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Admin Remove Successfully",
    data: user,
  });
};
//search
export const search = (req, res) => {
  const user = searchService(req.query.name || "");
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "User search completed successfully",
    data: user,
  });
};
//filter
export const userFilter = (req, res) => {
  const user = filterService(req.query.role);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "User filter completed successfully",
    data: user,
  });
};
//blockuser
export const blockUser = (req, res) => {
  const user = blockUserService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "User Blocked successfully",
    data: user,
  });
};
export const unblockUser = (req, res) => {
  const user = unblockUserService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid user ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "User Unblocked successfully",
    data: user,
  });
};

//email verify
export const verifyEmail = (req, res) => {
  const user = verifyEmailService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid email ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "email veryfied successfully",
    data: user,
  });
};

//verifcation send
export const verification = (req, res) => {
  const user = resendVerificationService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid email ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "email veryfied successfully",
    data: user,
  });
};
//upload picture
export const uploadPicture = (req, res) => {
  const user = uploadProfilePictureService(req.params.id, req.body.imageUrl);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " invalid Picture ",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Profile picture uploaded successfully",
    data: user,
  });
};
//delete account
export const deleteAccount = (req, res) => {
  const user = deleteAccountService(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: " No User like that",
    });
  }
  res.status(200).json({
    success: true,
    massage: "Account deleted successfully",
    data: user,
  });
};
