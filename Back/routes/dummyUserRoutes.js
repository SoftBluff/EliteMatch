import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    login,
    getPossibleMatches,
    matchMe,
    promptMatch
} from '../controllers/dummyUserController.js';
import {
    generateTextFromText,
} from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.post("/createUser", createUser);
router.post("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);
router.get("/getUser", getUser);
router.post("/login", login);
router.post("/getPossibleMatches", getPossibleMatches);
router.post("/matchMe", matchMe);
router.post("/promptMatch", promptMatch);
router.post("/generateTextFromMessages", generateTextFromText);

export default router;

