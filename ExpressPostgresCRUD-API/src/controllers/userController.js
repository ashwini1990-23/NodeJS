import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";
// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export async function createUser(req, res, next) {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully ", newUser);
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "All users fetched successfully", users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User for particular id fetched", user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(name, email, id);
    if (!updatedUser) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "Updated user successfully", updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserService(id);
    if (!deletedUser) {
      return handleResponse(res, 204, "User not found");
    }
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
}
