import client from './redis.js';

// Add a vector to a sorted set
export const addVectorToSet = async (vectorId, vector) => {
    const setId = 'profile-vectors';
    // Serialize the vector as a string using JSON.stringify
    const vectorStr = JSON.stringify(vector);
    // Add the vector to the set using the client
    const response = await client.zadd(setId, 0, vectorId, vectorStr);
};

// Query vectors within a certain similarity threshold
export const getSimilarVectorsFromSet = async (vector) => {
    const threshold = 0.5;
    const setId = 'profile-vectors';
    // Serialize the query vector as a string using JSON.stringify
    const queryVectorStr = JSON.stringify(vector);
    // Calculate the min and max scores based on the similarity threshold
    const minScore = 1 - threshold;
    const maxScore = 1 + threshold;
    // Use ZRANGEBYSCORE command to retrieve vectors within the similarity threshold
    const result = await client.zrangebyscore(setId, minScore, maxScore, 'WITHSCORES');
    // Parse the retrieved vectors and scores as objects
    const vectors = [];
    for (let i = 0; i < result.length; i += 2) {
    const vectorId = result[i];
    const score = parseFloat(result[i + 1]);
    const vector = JSON.parse(await client.zscore(setId, vectorId));
    vectors.push({ id: vectorId, vector, score });
    }
    // Return only the ids
    const ids = vectors.map((v) => v.id);
    return ids;
};

export const getVectorFromSet = async (vectorId) => {
    const setId = 'profile-vectors';
    const vector = JSON.parse(await client.zscore(setId, vectorId));
    return vector;
};

export const deleteVectorFromSet = async (vectorId) => {
    const setId = 'profile-vectors';
    await client.zrem(setId, vectorId);
};

export const updateVectorInSet = async (vectorId, vector) => {
    const setId = 'profile-vectors';
    const vectorStr = JSON.stringify(vector);
    await client.zadd(setId, 0, vectorId, vectorStr);
};

import { imageCaptioning } from "./imageCaptioning.js";
import { imageEmbedding } from "./imageEmbedding.js";
export const vectorizeProfile = async (photos, tags, description) => {
    // First, we caption the photos
    const captions = await Promise.all(photos.map(async (photo) => {
        const caption = await imageCaptioning(photo);
        return caption;
    }
    ));
    // Then, we embed the captions + description + tags in one single vector
    const toEmbed = "This profile contains photos of " + captions.join(" ") + ", they are tagged with " + tags.join(" ") + ", and the description is " + description;
    const vector = await imageEmbedding(toEmbed);
    // Finally, we add the vector to the sorted set
    return vector;
};



