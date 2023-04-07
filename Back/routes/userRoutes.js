import { Router } from "express";
import {
    generateTextFromText,
} from "../controllers/userController.js";
import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    login,
    getPossibleMatches,
    getMatches,
    getMessages,
    sendMessage,
    likeUser,
    matchMe,
    promptMatch 
} from '../controllers/userController.js';

import {captionURL, embedCaption} from "../controllers/imageController.js";

import {addVectorizedProfile, getUserVector} from "../controllers/vectorizeController.js";

import {db} from "../controllers/SQLconnection.js";
const router = Router();
router.post("/bluffyChat", generateTextFromText);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);
router.get("/getUser", getUser);
router.post("/login", login);
router.get("/getPossibleMatches", getPossibleMatches);
router.get("/getMatches", getMatches);
router.get("/getMessages", getMessages);
router.post("/likeUser", likeUser);
router.post("/imageCaptioning", captionURL);
router.post("/imageEmbedding", embedCaption);
router.post("/sendMessage", sendMessage);
router.get("/matchMe", matchMe);
router.get("/promptMatch", promptMatch);
router.post("/vectorizeProfile", addVectorizedProfile);
router.get("/getVectorFromSet", getUserVector);





router.get("/", (req, res) => {
    // Return if using unix socket or TCP connection
    if (process.env.GOOGLE_CLOUD_PROJECT) {
        // Connected to DB?
        if (db.client.pool) {
            res.send("Connected to database using unix socket");
        } else {
            res.send("Not connected to database using unix socket");
        }
    } else {
        // Connected to DB?
        if (db.client.pool) {
            res.send("Connected to database using TCP connection");
        } else {
            res.send("Not connected to database using TCP connection");
        }
    }
});

export default router;