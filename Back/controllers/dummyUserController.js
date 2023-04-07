// Mock API
/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(255) NOT NULL,
    orientation VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    premium BOOLEAN NOT NULL,
    description TEXT,
    avatar VARCHAR(255),
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    city VARCHAR(255),
    country VARCHAR(255),
    received_likes INTEGER NOT NULL,
    given_likes INTEGER NOT NULL,
    remaining_likes INTEGER NOT NULL,
    last_login TIMESTAMP,
    last_logout TIMESTAMP,
    last_activity TIMESTAMP,
    last_ip VARCHAR(255),
    remaining_AI_match_me INTEGER NOT NULL,
    remaining_AI_search INTEGER NOT NULL,
    remaining_AI_messages INTEGER NOT NULL
);
*/

import users from "./dummyUsers.js";
export async function createUser(req, res) {
    console.log("Received request to create user.")
    const body = req.body;
    if (body.succes) {
        res.status(200).send({success: {message: "User created successfully." }});
    }
    else {
        res.status(400).send({error: {message: "User could not be created."}});
    }
}
export async function deleteUser(req, res) {
    console.log("Received request to delete user.")
    const body = req.body;
    if (body.succes) {
        res.status(200).send({success: {message: "User deleted successfully." }});
    }
    else {
        res.status(400).send({error: {message: "User could not be deleted."}});
    }
}
export async function updateUser(req, res) { // PUT
    console.log("Received request to update user.")
    const body = req.body;
    if (body.succes) {
        res.status(200).send({success: {message: "User updated successfully." }});
    }
    else {
        res.status(400).send({error: {message: "User could not be updated."}});
    }
}
export async function getUser(req, res) {
    console.log("Received request to get user.")
    const body = req.query;
    // search for id in database
    console.log(req);
    const id = body.id;
    const user = users.find(user => user.id === id);
    if (user) {
        // send everything except password and email
        const {password, email, ...userWithoutPasswordAndEmail} = user;
        res.status(200).send(userWithoutPasswordAndEmail);
    }
    else {
        res.status(400).send({error: {message: "User could not be found."}});
    }
}

export async function login(req, res){
    console.log("Received request to login.")
    const body = req.body;
    const password = body.password;
    const email = body.email;
    const user = users.find(user => user.email === email);
    if (user.password === password) {
        const {password, email, ...userWithoutPasswordAndEmail} = user;
        res.status(200).send({success: userWithoutPasswordAndEmail});
    }
    else {
        res.status(400).send({error: {message: "User could not be found."}});
    }
}

const toRad = (Value) =>{
    return Value * Math.PI / 180;
}
const distanceBetween = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

export async function getPossibleMatches(req, res) {
    console.log("Received request to get possible matches.")
    const body = req.body;
    const id = body.id;
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(400).send({error: {message: "User could not be found."}});
        return;
    }
    // Look for users within a certain radius of the user
    const radius = body.distance;
    // Look for users with the same tags as the user
    const tags = user.tags;
    // Look for users who are within the age range of the user
    const age = user.age;
    // Make the query, first get all users within the radius
    const possibleMatches = users.filter(user => user.id !== id);
    // Filter out users who are not within the radius 
    
    for (let i = 0; i < possibleMatches.length; i++) {
        const match = possibleMatches[i];
        // Check if the user is within the radius
        if (distanceBetween(user.latitude, user.longitude, match.latitude, match.longitude) > radius) {
            possibleMatches.splice(i, 1);
            i--;
            continue;
        }
        // Check if the user is within the age range
        if (match.age < age - 5 || match.age > age + 5) {
            possibleMatches.splice(i, 1);
            i--;
            continue;
        }
        // Check if the user has at least one tag in common
        if (!tags.some(tag => match.tags.includes(tag))) {
            possibleMatches.splice(i, 1);
            i--;
            continue;
        }
        // Check if the user is of the correct gender for the user
        // First check for male
        if(match.gender === "male"){
            if (user.gender === "male"){
                if (user.orientation === "straight"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
                if (match.orientation === "straight"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
            }
            if (user.gender === "female"){
                if (user.orientation === "gay"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
                if (match.orientation === "gay"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
            }
        }
        if(match.gender === "female"){
            if (user.gender === "male"){
                if (user.orientation === "gay"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
                if (match.orientation === "gay"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
            }
            if (user.gender === "female"){
                if (user.orientation === "straight"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
                if (match.orientation === "straight"){
                    possibleMatches.splice(i, 1);
                    i--;
                    continue;
                }
            }
        }
    }
    res.status(200).send({success: possibleMatches});
}

export async function matchMe(req, res){
    // return 5 random users between the radius
    console.log("Received request to match me.")
    const body = req.body;
    const id = body.id;
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(400).send({error: {message: "User could not be found."}});
        return;
    }
    // Look for users within a certain radius of the user
    const radius = body.distance;
    const possibleMatches = users.filter(user => user.id !== id);
    // Filter out users who are not within the radius
    for (let i = 0; i < possibleMatches.length; i++) {
        const match = possibleMatches[i];
        // Check if the user is within the radius
        if (distanceBetween(user.latitude, user.longitude, match.latitude, match.longitude) > radius) {
            possibleMatches.splice(i, 1);
            i--;
        }
    }
    // return 5 random users
    const matches = [];
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * possibleMatches.length);
        matches.push(possibleMatches[index]);
        possibleMatches.splice(index, 1);
    }
    res.status(200).send({success: matches});
}

export async function promptMatch(req, res){
    // Return a random user from the database
    console.log("Received request to prompt match.")
    const body = req.body;
    const id = body.id;
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(400).send({error: {message: "User could not be found."}});
        return;
    }
    // Look for users within a certain radius of the user
    const radius = body.distance;
    const possibleMatches = users.filter(user => user.id !== id);
    // Filter out users who are not within the radius
    for (let i = 0; i < possibleMatches.length; ++i) {
        const match = possibleMatches[i];
        // Check if the user is within the radius
        if (distanceBetween(user.latitude, user.longitude, match.latitude, match.longitude) > radius) {
            possibleMatches.splice(i, 1);
            i--;
        }
    }
    // return 1 random user
    const index = Math.floor(Math.random() * possibleMatches.length);
    const match = possibleMatches[index];
    res.status(200).send({success: match});
}
