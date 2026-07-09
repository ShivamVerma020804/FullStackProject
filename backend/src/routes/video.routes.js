import { Router } from "express";

import {
    publishAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getFeedVideos,
    searchVideos,
} from "../controllers/video.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

/* ===========================
        Public Routes
=========================== */

// Search
router.get("/search", (req, res, next) => {
    console.log("✅ SEARCH ROUTE HIT");
    console.log(req.originalUrl);
    console.log(req.query);

    return searchVideos(req, res, next);
});

// Home Feed
router.get("/feed", getFeedVideos);

// Single Video
router.get("/:videoId", (req, res, next) => {
    console.log("❌ VIDEO ROUTE HIT");
    console.log(req.params.videoId);

    return getVideoById(req, res, next);
});

/* ===========================
      Protected Routes
=========================== */

// Dashboard
router.get(
    "/",
    verifyJWT,
    getAllVideos
);

// Upload
router.post(
    "/upload",
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo
);

// Update & Delete
router
    .route("/:videoId")
    .patch(
        verifyJWT,
        upload.single("thumbnail"),
        updateVideo
    )
    .delete(
        verifyJWT,
        deleteVideo
    );

// Toggle Publish
router.patch(
    "/toggle/publish/:videoId",
    verifyJWT,
    togglePublishStatus
);

export default router;