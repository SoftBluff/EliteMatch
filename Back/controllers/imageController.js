import { imageCaptioning } from "./imageCaptioning.js";
import { imageEmbedding } from "./imageEmbedding.js";

export const captionURL = async (req, res) => {
    console.log("Request received to captionURL");
    const body = req.body;
    const url = body.url;
    const best = body.mode;
    const maxFlavors = body.maxFlavors;
    const filetype = body.filetype;
    const response = await imageCaptioning(url, best, maxFlavors, filetype);
    if (response) {
        res.status(200).send({success: response});
    } else {
        res.status(500).send({error: "Error in imageCaptioning"});
    }
};

export const embedCaption = async (req, res) => {
    const body = req.body;
    const url = body.url;
    const best = body.mode;
    const maxFlavors = body.maxFlavors;
    const filetype = body.filetype;
    const response = await imageCaptioning(url, best, maxFlavors, filetype);
    if (response) {
        const embedding = await imageEmbedding(response);
        if (embedding) {
            res.status(200).send({success: embedding});
        } else {
            res.status(500).send({error: "Error in imageEmbedding"});
        }
    } else {
        res.status(500).send({error: "Error in imageCaptioning"});
    }
};