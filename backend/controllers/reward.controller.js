import Reward from "../models/Reward.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateReward } from "../utils/validators.js";

// Create a new reward (e.g., when a user achieves a milestone)
export const createReward = asyncHandler(async (req, res) => {
  const error = validateReward(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { title, points, rewardType, expiryDate } = req.body;
  const reward = await Reward.create({
    userId: req.user._id,
    title,
    points,
    rewardType,
    expiryDate,
  });
  res.status(201).json({
    message: "Reward created successfully",
    reward,
  });
});

// Get all rewards for the logged-in user
export const getRewards = asyncHandler(async (req, res) => {
  const rewards = await Reward.find({ userId: req.user._id });
  res.status(200).json({
    message: "Rewards retrieved successfully",
    rewards,
  });
});

// Get a single reward by ID
export const getRewardById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reward = await Reward.findOne({
    _id: id,
    userId: req.user._id,
  });
  if (!reward) {
    res.status(404);
    throw new Error("Reward not found");
  }

  res.status(200).json({
    message: "Reward retrieved successfully",
    reward,
  });
});

// Claim a reward (mark as claimed, or deduct points, etc.)
export const claimReward = asyncHandler(async(req,res)=>{
  const {id} = req.params
  const reward = await Reward.findOne({_id: id, userId: req.user._id})
  if(!reward){
    res.status(404)
    throw new Error("Reward not found")
  }

  if(reward.claimedAt){
    res.status(400)
    throw new Error("Reward already claimed")
  }

  reward.claimedAt = new Date()
  await reward.save()

  res.status(200).json({
    message: "Reward claimed successfully",
    reward,
  })
})





// Update a reward (e.g., if you want to allow editing)
/*export const updateReward = asyncHandler(async (req, res) => {
  const error = validateReward(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { id } = req.params;
  const reward = await Reward.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );

  if (!reward) {
    res.status(404);
    throw new Error("Reward not found");
  }

  res.status(200).json({
    message: "Reward updated successfully",
    reward,
  });
});

// Delete a reward
export const deleteReward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reward = await Reward.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!reward) {
    res.status(404);
    throw new Error("Reward not found");
  }

  res.status(200).json({
    message: "Reward deleted successfully",
  });
});
*/