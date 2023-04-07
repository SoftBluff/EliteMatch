import generateResponse from './textGenerator.js';
import {db,st} from './SQLconnection.js';

import{
    vectorizeProfile, //vectorizeProfile(photos, tags, description)
    addVectorToSet,
    getSimilarVectorsFromSet,
    getVectorFromSet,
    deleteVectorFromSet,
    updateVectorInSet,
} from './vectorOperations.js';

import {imageEmbedding} from './imageEmbedding.js';



export async function generateTextFromText(req, res) {
    console.log("Received request to generate text from text.")
    const body = req.body;
    const response = await generateResponse(body);
    res.status(response.status).send(response.data);
}

export async function createUser(req, res) {
    console.log("Received request to create user.")
    const user = req.body;
    // We have 5 tables: users, tags, photos, messages, and likedPeople
    // We need to create a row in each table for the new user

    // We get smt like this:
    // {"id" : "500", "username" : "Jack660", "password" : "password", "email" : "Jack660@gmail.com", "age" : "40", "gender" : "female", "orientation" : "straight", "created_at" : "2023-04-05 20:03:51.016263", "updated_at" : "2023-04-05 20:03:51.016263", "premium" : "False", "description" : "I am a dummy user", "avatar" : "https://www.w3schools.com/howto/img_avatar.png", "latitude" : "17.674644679577057", "longitude" : "-104.92077875144814", "city" : "Matamoros", "country" : "Mexico", "received_likes" : "8", "given_likes" : "88", "remaining_likes" : "45", "last_login" : "2023-04-05 20:03:51.016263", "last_logout" : "2023-04-05 20:03:51.016263", "last_activity" : "2023-04-05 20:03:51.016263", "last_ip" : "75.192.25.167", "remaining_AI_match_me" : "6", "remaining_AI_search" : "9", "remaining_AI_messages" : "0", "photos" : ['https://cdn2.thecatapi.com/images/8NdgktL3E.jpg', 'https://cdn2.thecatapi.com/images/d49.jpg', 'https://cdn2.thecatapi.com/images/aoa.jpg'], "tags" : ['Nature lover', 'Fun-loving', 'Perceptive', 'Bookworm', 'Family-oriented', 'Independent']}
    // The id is generated by the database, so we don't need to worry about it
    // Everyrhing except the photos and tags is in the user object
    const {photos, tags, ...userEntry} = user;
    // First, we create a row in the users table
    const user_id = await db('users').insert(userEntry).returning('id');
    console.log("user created");
    console.log("user_id", user_id, user_id.id);
    // Then, we create a row in the tags table for each tag
    const tagEntries = tags.map(tag => ({user_id: user_id[0].id, tag: tag, created_at: new Date(), updated_at: new Date()}));
    console.log("tagEntries", tagEntries);
    await db('tags').insert(tagEntries);
    // Then, we create a row in the photos table for each photo
    console.log("photos", photos);
    const photoEntries = photos.map(photo => ({user_id: user_id[0].id, photo: photo, created_at: new Date(), updated_at: new Date()}));
    await db('photos').insert(photoEntries);
    // Add the user to the vector set
    const vector = await vectorizeProfile(photos, tags, user.description);
    await addVectorToSet(user_id, vector);
    // Finally, we return the user_id
    res.status(200).send({user_id: user_id[0]});
}

export async function getUser(req, res) {
    console.log("Received request to get user.")
    const user_id = req.query.id;
    let user = null;
    console.log("user_id", user_id);

    // We have 5 tables: users, tags, photos, messages, and likedPeople
    // We need to get a row from each table for the user
    console.log("user_id", user_id);
    // First, we get the row from the users table
    try {
        user = await db('users').where('id', user_id).first();
        console.log("user retrieved", user);
    } catch (e) {
        console.log("Error getting user", e);
        res.status(404).send({error: "User not found"});
        return;
    }
    let tags = [];
    try{
        // Then, we get the rows from the tags table
        tags = await db('tags').where('user_id', user_id).select('tag');
        // Stringify the tags
        tags = tags.map(tag => tag.tag);
        console.log("tags retrieved", tags);
    } catch (e) {
        console.log("Error getting tags", e);
    }
    // Then, we get the rows from the photos table
    let photos = [];
    try{
        photos = await db('photos').where('user_id', user_id).select('photo');
        // Stringify the photos
        photos = photos.map(photo => photo.photo);
        console.log("photos retrieved", photos);
    } catch (e) {
        console.log("Error getting photos", e);
    }
    // Finally, we return the user
    res.status(200).send({user: user, tags: tags, photos: photos});
}

export async function updateUser(req, res) {
    console.log("Received request to update user.")
    const user_id = req.params.id;
    const user = req.body;
    // We have 5 tables: users, tags, photos, messages, and likedPeople
    // We need to update a row in each table for the user

    // First, we update the row in the users table
    await db('users').where('id', user_id).update(user);
    // Then, we update the rows in the tags table
    const tags = user.tags;
    await db('tags').where('user_id', user_id).del();
    const tagEntries = tags.map(tag => ({user_id: user_id, tag: tag}));
    await db('tags').insert(tagEntries);
    // Then, we update the rows in the photos table
    const photos = user.photos;
    await db('photos').where('user_id', user_id).del();
    const photoEntries = photos.map(photo => ({user_id: user_id, photo: photo}));
    await db('photos').insert(photoEntries);
    // Finally, we update the vector set
    const vector = await vectorizeProfile(photos, tags, user.description);
    await updateVectorInSet(user_id, vector);
    res.status(200).send({user_id: user_id});
}

export async function deleteUser(req, res) {
    console.log("Received request to delete user.")
    const user_id = req.query.id;
    console.log("user_id", user_id);
    // We have 5 tables: users, tags, photos, messages, and likedPeople
    // We need to delete a row from each table for the user
    try{
    // First, we delete the row from the users table
    await db('users').where('id', user_id).del();
    // We delete the vector from the set
    await deleteVectorFromSet(user_id);
    } catch (e) {
        console.log("Error deleting user", e);
        res.status(404).send({error: "User not found"});
        return; 
    }
    try{
    // Then, we delete the rows from the tags table
    await db('tags').where('user_id', user_id).del();
    // Then, we delete the rows from the photos table
    await db('photos').where('user_id', user_id).del();
    } catch (e) {
        console.log("Error deleting user's data", e);
        res.status(404).send({error: "User's data not found"});
        return;
    }
    try{
        // Then, we delete the rows from the likedPeople table
        await db('likedpeople').where('user_id', user_id).del();
        // Then, we delete the rows from the messages table
        await db('messages').where('user_id', user_id).del();
    }
    catch (e) {
        console.log("Error deleting user's data", e);
    }
    res.status(200).send({success: "User deleted"});
}

export async function login(req, res){
    console.log("Received request to login.")
    const user = req.body;
    // Validate the user
    if (!user.email || !user.password) {
        res.status(400).send({error: {message: "Email and password are required."}});
        return;
    }
    // Check if the user exists
    const userExists = await db('users').where('email', user.email).first();
    if (!userExists) {
        res.status(400).send({error: {message: "User does not exist."}});
        return;
    }
    // Check if the password is correct (testing only, so it is not hashed)
    const passwordCorrect = user.password === userExists.password;
    if (!passwordCorrect) {
        res.status(400).send({error: {message: "Password is incorrect."}});
        return;
    }
    let photos = await db('photos').where('user_id', userExists.id).select('photo');
    // Stringify the photos
    photos = photos.map(photo => photo.photo);
    // add photos to user
    userExists.photos = photos;
    res.status(200).send({success: {user: userExists}});
}

export async function getPossibleMatches(req, res){
    console.log("Received request to get possible matches.")
    const user_id = req.query.id;
    const distance = req.query.distance * 1000;
    // We have 5 tables: users, tags, photos, messages, and likedPeople
    // We need to get a row from each table for the user

    const user = await db('users').where('id', user_id).first();
    if (!user) {
        res.status(400).send({error: {message: "User could not be found."}});
        return;
    }
    const longitude = user.longitude;
    const latitude = user.latitude;

    // We need to get users within a certain distance, with at least one tag in common, who have not already been liked and whose gender and sexual orientation match the user's preferences
    const users = await db('users')
    .select('*')
    // distance
    .whereRaw(`ST_DistanceSphere(ST_MakePoint(longitude, latitude), ST_MakePoint(?, ?)) <= ?`, [longitude, latitude, distance] ) 
    // not the user
    .andWhere('id', '!=', user_id) 
    // one tag in common
    .andWhere('id', 'in', db('tags').select('user_id').where('tag', 'in', db('tags').select('tag').where('user_id', user_id)))
    // not already liked
    .andWhere('id', 'not in', db('likedpeople').select('liked_user_id').where('user_id', user_id))
    // preferences according to sex and orientation
    .andWhere(function() {
        this.where(function() {
            this.where('gender', 'male')
                .andWhere(function() {
                    this.where('orientation', 'straight')
                        .orWhere('orientation', 'bisexual')
                });
        })
        .orWhere(function() {
            this.where('gender', 'female')
                .andWhere(function() {
                    this.where('orientation', 'straight')
                        .orWhere('orientation', 'bisexual')
                        .orWhere('orientation', 'pansexual')
                });
        })
        .orWhere(function() {
            this.where('gender', 'male')
                .andWhere('orientation', 'gay');
        })
        .orWhere(function() {
            this.where('gender', 'female')
                .andWhere('orientation', 'lesbian');
        })
        .orWhere(function() {
            this.where('orientation', 'other');
        })
    });


    // Then, we get the rows from the tags and photos tables for each user and append them to the user object
    for (const userObj of users) {
        let tags = await db('tags').where('user_id', userObj.id).select('tag');
        // stringyfing the tags array
        tags = tags.map(tag => tag.tag);
        let photos = await db('photos').where('user_id', userObj.id).select('photo');
        // stringyfing the photos array
        photos = photos.map(photo => photo.photo);
        userObj.tags = tags;
        userObj.photos = photos;
    }
    // Finally, we return the users
    res.status(200).send(users);
}


export async function getMatches(req, res){
    console.log("Received request to get matches.")
    const user_id = req.query.id;
    // Return people who liked the user and the user liked
    // First, we get the people who liked the user
    const peopleWhoLikedUser = await db('likedpeople').where('liked_user_id', user_id).select('user_id');
    // Then, we get the people the user liked
    const peopleUserLiked = await db('likedpeople').where('user_id', user_id).select('liked_user_id');
    // Then, we get the intersection of the two arrays
    const matches = peopleWhoLikedUser.filter(likedUser => peopleUserLiked.some(userLiked => likedUser.user_id === userLiked.liked_user_id));
    // We need the id, name, photos, and last message for each match
    const matchesWithInfo = [];
    for (const match of matches) {
        const matchInfo = await db('users').where('id', match.user_id).select('id', 'username').first();
        const profilePic = await db('photos').where('user_id', match.user_id).select('photo').first();
        const lastMessage = await db('messages').where('sender_id', match.user_id).orWhere('receiver_id', match.user_id).orderBy('created_at', 'desc').first();
        matchInfo.profilePic = profilePic.photo;
        matchInfo.lastMessage = lastMessage;
        matchesWithInfo.push(matchInfo);
    }
    // Finally, we return the matches
    res.status(200).send(matchesWithInfo);
}

export async function getMessages(req, res){
    console.log("Received request to get messages.")
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;
    // We need to get all the messages between the sender and receiver
    const messages = await db('messages').where('sender_id', sender_id).andWhere('receiver_id', receiver_id).orWhere('sender_id', receiver_id).andWhere('receiver_id', sender_id).orderBy('created_at', 'asc');
    // Finally, we return the messages
    // Lets add the boolean property isSender to each message
    const messagesWithSender = messages.map(message => {
        return {...message, isSender: message.sender_id === sender_id}
    }
    );
    res.status(200).send(messagesWithSender);
}

export async function sendMessage(req, res){
    console.log("Received request to send message.")
    const message = req.body;
    // Validate the message
    if (!message.sender_id || !message.receiver_id || !message.txt) {
        res.status(400).send({error: {message: "Sender id, receiver id, and message are required."}});
        return;
    }
    // Validate they matched
    const senderLikedReceiver = await db('likedpeople').where('user_id', message.sender_id).andWhere('liked_user_id', message.receiver_id).first();
    const receiverLikedSender = await db('likedpeople').where('user_id', message.receiver_id).andWhere('liked_user_id', message.sender_id).first();
    if (!senderLikedReceiver || !receiverLikedSender) {
        res.status(400).send({error: {message: "You must match with the user before sending a message."}});
        return;
    }
    // Insert the message into the database
    await db('messages').insert({sender_id: message.sender_id, receiver_id: message.receiver_id, txt: message.txt, created_at: new Date()});
    // Return the message
    res.status(200).send(message);
}

export async function likeUser(req, res){
    console.log("Received request to like user.")
    const user_id = req.body.user_id;
    const liked_user_id = req.body.liked_user_id;
    // Validate the user
    if (!user_id || !liked_user_id) {
        res.status(400).send({error: {message: "User id and liked user id are required."}});
        return;
    }
    // Check if the user exists
    const userExists = await db('users').where('id', user_id).first();
    if (!userExists) {
        res.status(400).send({error: {message: "User does not exist."}});
        return;
    }
    // Check if the liked user exists
    const likedUserExists = await db('users').where('id', liked_user_id).first();
    if (!likedUserExists) {
        res.status(400).send({error: {message: "Liked user does not exist."}});
        return;
    }
    // Check if the user already liked the liked user
    const alreadyLiked = await db('likedpeople').where('user_id', user_id).andWhere('liked_user_id', liked_user_id).first();
    if (alreadyLiked) {
        res.status(400).send({error: {message: "You already liked this user."}});
        return;
    }
    // Insert the like into the database
    await db('likedpeople').insert({user_id: user_id, liked_user_id: liked_user_id, created_at: new Date(), updated_at: new Date()});
    // Check if the liked user liked the user
    const likedUserLikedUser = await db('likedpeople').where('user_id', liked_user_id).andWhere('liked_user_id', user_id).first();
    if (likedUserLikedUser) {
        // If so, we return true
        res.status(200).send({match: true});
    } else {
        // If not, we return false
        res.status(200).send({match: false});
    }
}



export async function matchMe(req, res){
    // Use vector similarity to find the best match for the user
    console.log("Received request to match me.")
    const user_id = req.query.id;
    
    // Now we vectorize the user if its not already vectorized
    let vector;
    try {
        vector = await getVectorFromSet(user_id);
    } catch (error) {
        // First, we get the user's tags
        const userTags = await db('tags').where('user_id', user_id).select('tag');
        // Then, we get the photos
        const userPhotos = await db('photos').where('user_id', user_id).select('photo');
        const description = await db('users').where('id', user_id).select('description').first();
        // Now we vectorize the user
        vector = await vectorizeUser(userPhotos, userTags, description);
    }
    // Now we get the similar vectors
    const ids = await getSimilarVectorsFromSet(vector);
    // Now we filter out the users according to the previous criteria (orientation, already liked, etc.)
    //const filteredUsers = await filterUsers(similarVectors, user_id);
    // TODO: Filter users

    // Finally, we get the users from the filtered users
    const users = [];
    for (const id of ids) {
        const user = await db('users').where('id', id).first();
        const profilePic = await db('photos').where('user_id', id).select('photo').first();
        user.profilePic = profilePic.photo;
        users.push(user);
    }
    // Finally, we return the users
    res.status(200).send({success: users});
}

export async function promptMatch(req, res){
    // Given a prompt, return the most similar users
    console.log("Received request to prompt search.")
    const prompt = req.query.prompt;
    // we vectorize the prompt
    const vector = await imageEmbedding(prompt);
    // Now we get the similar vectors
    const ids = await getSimilarVectorsFromSet(vector);
    // Return the users
    const users = [];
    for (const id of ids) {
        const user = await db('users').where('id', id).first();
        const profilePic = await db('photos').where('user_id', id).select('photo').first();
        user.profilePic = profilePic.photo;
        users.push(user);
    }
    // Finally, we return the users
    res.status(200).send({success: users});
}