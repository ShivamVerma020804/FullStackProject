import { Router } from "express";

import {
    publishAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} from "../controllers/video.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


// Public Routes

router
    .route("/")
    .get(verifyJWT, getAllVideos);

router
    .route("/:videoId")
    .get(getVideoById);


// Protected Routes

router
    .route("/upload")
    .post(
        verifyJWT,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]),
        publishAVideo
    );

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

router
    .route("/toggle/publish/:videoId")
    .patch(
        verifyJWT,
        togglePublishStatus
    );

export default router;