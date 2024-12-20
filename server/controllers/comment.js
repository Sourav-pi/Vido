import { createError } from "../error.js";
import Comment from "../models/CommentModel.js";
import Video from "../models/VideoModel.js";

export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ userId: req.user.id, ...req.body });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(createError(500, error.message));
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    if (comment.userId === req.user.id || video.userId === req.user.id) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted successfully.");
    } else {
      next(
        createError(
          400,
          "You can delete only comments made by you or on your video."
        )
      );
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(createError(500, error.message));
  }
};
