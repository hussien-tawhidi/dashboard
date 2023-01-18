import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
  }

  const goal = await Goal.create({
    text: req.body.text,
    user:req.user.id
  });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
  }
  // check user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

// make sure logged user is the owner of goal for update
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
}
  
  
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
  }

 
   // check user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // make sure logged user is the owner of goal for update
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
