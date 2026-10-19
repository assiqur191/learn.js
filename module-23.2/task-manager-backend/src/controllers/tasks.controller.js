import mongoose from "mongoose";
import Task from "../models/tasks.model.js";
import asyncHandler from "express-async-handler";

const validStatuses = ["Pending", "In Progress", "Completed"];
// const editableFields = ["title", "description", "status", "dueDate"];

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  // Validate required fields
  if (typeof title !== "string" || !title.trim()) {
    res.status(400);
    throw new Error("Title is required");
  }

  if (typeof description !== "string" || !description.trim()) {
    res.status(400);
    throw new Error("Description is required");
  }

  // Set default status
  const taskStatus = status ?? "Pending";

  // Validate status
  if (!validStatuses.includes(taskStatus)) {
    res.status(400);
    throw new Error("Invalid task status");
  }
  console.log("Authenticated user:", req.user);

  // Create and save the task
  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status: taskStatus,
    completed: taskStatus === "Completed",
    dueDate: dueDate || null,
    owner: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

// Get all tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    count: tasks.length,
    data: tasks,
  });
});

// Get a single task by ID
export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOne({ _id: id, owner: req.user.id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
});

// Update a task by ID
export const updateTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOne({ _id: id, owner: req.user.id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const { title, description, status, dueDate } = req.body;

  // Validate title only when it is provided
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }

  // Validate description only when it is provided
  if (
    description !== undefined &&
    (typeof description !== "string" || !description.trim())
  ) {
    res.status(400);
    throw new Error("Description cannot be empty");
  }

  // Validate status only when it is provided
  if (status !== undefined && !validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid task status");
  }

  // Update only the fields provided
  if (title !== undefined) task.title = title.trim();

  if (description !== undefined) {
    task.description = description.trim();
  }

  if (status !== undefined) {
    task.status = status;
    task.completed = status === "Completed";
  }

  if (dueDate !== undefined) {
    task.dueDate = dueDate || null;
  }

  await task.save();

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

// Delete a task by ID
export const deleteTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOne({ _id: id, owner: req.user.id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task,
  });
});
