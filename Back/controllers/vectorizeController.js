import {vectorizeProfile, addVectorToSet, getVectorFromSet} from "./vectorOperations.js";
import {db,st} from './SQLconnection.js';


export const addVectorizedProfile = async (req, res) => {
    const body = req.body;
    const id = body.id;
    const description = await db('users').where('id', id).select('description').first();
    let photos = await db('photos').where('user_id', id).select('photo');
    // merge all photos into one array
    photos = photos.map(photo => photo.photo);
    let tags = await db('tags').where('user_id', id).select('tag');
    // merge all tags into one array
    tags = tags.map(tag => tag.tag);
    console.log(description, photos, tags);
    res.status(200).send({success: "Vector added to set"});
    const vector = await vectorizeProfile(photos, tags, description);

    if (vector) {
        const response = await addVectorToSet(id, vector);

        if (response) {
            res.status(200).send({success: "Vector added to set"});
        } else {
            res.status(500).send({error: "Error adding vector to set"});
        }
    } else {
        res.status(500).send({error: "Error vectorizing profile"});
    }
    
};

export const getUserVector = async (req, res) => {
    const id = req.query.id;
    const response = await getVectorFromSet(id);
    if (response) {
        res.status(200).send({success: response});
    }
    else {
        res.status(500).send({error: "Error getting vector from set"});
    }
};
