/*
Endpoint: https://fffiloni-clip-interrogator-2.hf.space/run/clipi2

Input Payload
{
  "data": [
    
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==
 : string, // represents image data as base64 string of the Image component
    
best
 : string, // represents selected choice of 'Select mode' Radio component
    
4
 : number, // represents selected value of 'best mode max flavors' Slider component
  ]
}

Response Object
{
  "data": [
     string, // represents text string of 'Description Output' Textbox component
     string, // represents button label of the Button component
     string, // represents HTML output of the Html component
     string, // represents HTML output of the Html component
    ],
    "duration": (float) // number of seconds to run function call
}


*/
import axios from 'axios';

export const getBase64 = async (url) => {
    // get the image as a base64 string
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return base64;
};

export const imageCaptioning = async (url, best, maxFlavors, filetype) => {
    const base64 = await getBase64(url);
    const base64url = `data:image/${filetype};base64,${base64}`;
    let response;
    try {
        
        response = await axios.post("https://fffiloni-clip-interrogator-2.hf.space/run/clipi2", {
        data: [
            base64url,
            "fast",
            4,
        ],
    });
    console.log("Image captioned");
    return await  response.data.data[0];
}
catch (error) {
    console.log("something went wrong");
    console.log(error.message.substring(0, 1000));
    return "Error";
}
    
};