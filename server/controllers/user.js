import { createError } from "../error.js";
import User from "../models/UserModel.js";
import Video from "../models/VideoModel.js";

// update user
export const updateUser = async (req, res, next) => {
  if (req.user && req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      return next(createError(500, err.message));
    }
  } else {
    return next(
      createError(401, "Unauthorized. You can unpdate only your account")
    );
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user && req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      return next(createError(500, err.message));
    }
  } else {
    return next(
      createError(401, "Unauthorized. You can delete only your account")
    );
  }
};
// get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

// subscribe a user
export const subscribe = async (req, res, next) => {
  if (req.user && req.user.id !== req.params.id) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      res.status(200).json("Subscribed successfully!");
    } catch (err) {
      return next(createError(500, err.message));
    }
  } else {
    return next(401, "You can't subscribe to yourself.");
  }
};

// unsubscribe a user
export const unsubscribe = async (req, res, next) => {
  if (req.user && req.user.id !== req.params.id) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      res.status(200).json("Unsubscribed successfully!");
    } catch (err) {
      return next(createError(500, err.message));
    }
  } else {
    return next(401, "You can't unsubscribe to yourself.");
  }
};

// like a video
export const like = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });
    res.status(200).json("Video liked.");
  } catch (error) {
    next(createError(500, error.message));
  }
};

// dislike a video
export const dislike = async (req, res, next) => {
  try {
    console.log(req.params.videoId);
    console.log(req.user.id);
    await Video.findByIdAndUpdate(req.params.videoId, {
      $push: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });
    res.status(200).json("Video disliked.");
  } catch (error) {
    next(createError(500, error.message));
  }
};
