import mongoose from "mongoose";

import { Video } from "../models/video.models.js";
// import { User } from "../models/user.models.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const publishAVideo = asynchandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);

    if (!uploadedVideo) {
        throw new ApiError(500, "Video upload failed");
    }

    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedThumbnail) {
        throw new ApiError(500, "Thumbnail upload failed");
    }

    const video = await Video.create({

videoFile: uploadedVideo.secure_url,
thumbnail: uploadedThumbnail.secure_url,

        title,

        description,

        duration: uploadedVideo.duration || 0,

        owner: req.user?._id

    });

    const createdVideo = await Video.findById(video._id)
        .populate(
            "owner",
            "fullName username avatar"
        );

    return res.status(201).json(

        new ApiResponse(

            201,

            createdVideo,

            "Video uploaded successfully"

        )

    );

});



const getAllVideos = asynchandler(async (req, res) => {

    const {

        page = 1,

        limit = 10,

        query,

        sortBy = "createdAt",

        sortType = "desc",

        userId

    } = req.query;



 const matchStage = {
    owner: req.user?._id
};



    if (query) {

        matchStage.title = {

            $regex: query,

            $options: "i"

        };

    }



    if (userId) {

        matchStage.owner =

            new mongoose.Types.ObjectId(userId);

    }



    const aggregate = Video.aggregate([

        {

            $match: matchStage

        },

        {

            $lookup: {

                from: "users",

                localField: "owner",

                foreignField: "_id",

                as: "owner",

                pipeline: [

                    {

                        $project: {

                            fullName: 1,

                            username: 1,

                            avatar: 1

                        }

                    }

                ]

            }

        },

        {

            $addFields: {

                owner: {

                    $first: "$owner"

                }

            }

        },

        {

            $sort: {

                [sortBy]: sortType === "asc" ? 1 : -1

            }

        }

    ]);



    const options = {

        page: parseInt(page),

        limit: parseInt(limit)

    };



    const videos =

        await Video.aggregatePaginate(

            aggregate,

            options

        );



    return res.status(200).json(

        new ApiResponse(

            200,

            videos,

            "Videos fetched successfully"

        )

    );

});
const getVideoById = asynchandler(async (req, res) => {
    console.log("VIDEO ROUTE HIT", req.params.videoId);

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId)
        .populate(
            "owner",
            "fullName username avatar coverImage"
        );

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.views += 1;

    await video.save({ validateBeforeSave: false });

    return res.status(200).json(

        new ApiResponse(

            200,

            video,

            "Video fetched successfully"

        )

    );

});



const updateVideo = asynchandler(async (req, res) => {

    const { videoId } = req.params;

    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            403,
            "You are not allowed to update this video"
        );
    }

    if (title) {
        video.title = title;
    }

    if (description) {
        video.description = description;
    }

    const thumbnailLocalPath = req.file?.path;

    if (thumbnailLocalPath) {

        const thumbnail =
            await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            throw new ApiError(
                500,
                "Thumbnail upload failed"
            );
        }

        video.thumbnail = thumbnail.url;
    }

    await video.save();

    return res.status(200).json(

        new ApiResponse(

            200,

            video,

            "Video updated successfully"

        )

    );

});



const deleteVideo = asynchandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {

        throw new ApiError(

            403,

            "You are not allowed to delete this video"

        );

    }

    await Video.findByIdAndDelete(videoId);

    return res.status(200).json(

        new ApiResponse(

            200,

            {},

            "Video deleted successfully"

        )

    );

});

const togglePublishStatus = asynchandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            403,
            "You are not allowed to perform this action"
        );
    }

    video.isPublished = !video.isPublished;

    await video.save({ validateBeforeSave: false });

    return res.status(200).json(

        new ApiResponse(

            200,

            video,

            `Video is now ${
                video.isPublished ? "Published" : "Unpublished"
            }`

        )

    );

});
const getFeedVideos = asynchandler(async (req, res) => {
    console.log("FEED ROUTE HIT");
    const videos = await Video.aggregate([
        {
            $match: {
                isPublished: true,
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner",
                },
            },
        },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Feed videos fetched successfully"
        )
    );
});

const searchVideos = asynchandler(async (req, res) => {
     console.log("SEARCH ROUTE HIT");

    const { q } = req.query;

    if (!q) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No search query provided"
            )
        );
    }

    const videos = await Video.aggregate([
        {
            $match: {
                isPublished: true,
                $or: [
                    {
                        title: {
                            $regex: q,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: q,
                            $options: "i"
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Search results fetched successfully"
        )
    );

});




export {
    publishAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getFeedVideos,
    searchVideos,
};