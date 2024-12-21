import { createError } from "../utils/error.js";
import Video from "../models/VideoModel.js";
import User from "../models/UserModel.js";

// create video
export const addVideo = async (req, res, next) => {
  try {
    const video = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    return next(err);
  }
};

// update video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(
        createError(401, "Unauthorized. You can update only your video")
      );
    }
  } catch (err) {
    return next(err);
  }
};

// delete video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted...");
    } else {
      return next(
        createError(401, "Unauthorized. You can delete only your video")
      );
    }
  } catch (err) {
    return next(err);
  }
};

// get video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    res.status(200).json(video);
  } catch (err) {
    return next(err);
  }
};

// view video
export const viewVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json("View added to the video");
  } catch (err) {
    return next(err);
  }
};

// get random video
export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

// get trending video
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }).limit(40);
    res.status(200).json(videos);
  } catch (error) {}
};

// get subscribed users' video
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const videos = await Video.find({
      userId: { $in: user.subscribedUsers },
    })
      .sort({ createdAt: -1 })
      .limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// get videos by tags
export const getByTags = async (req, res, next) => {
  const queryTags = req.query.tags.split(",");
  if (!queryTags) return next(createError(400, "Please provide tags query"));
  try {
    const videos = await Video.find({ tags: { $in: queryTags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// search video
export const search = async (req, res, next) => {
  const query = req.query.q;
  if (!query) return next(createError(400, "Please provide query"));
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(createError(500, error.message));
  }
};
