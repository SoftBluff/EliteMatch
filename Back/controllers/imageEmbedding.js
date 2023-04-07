// https://api.openai.com/v1/embeddings 
/*
Parameters
{
  "model": "text-embedding-ada-002",
  "input": "The food was delicious and the waiter..."
}
Response
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        .... (1536 floats total for ada-002)
        -0.0028842222,
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
*/



import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.OPENAI_API_KEY;


export const imageEmbedding = async (caption) => {
    if (!API_KEY) {
        console.log("No API key found");
        return false;
    }
    const response = await axios.post(
        "https://api.openai.com/v1/embeddings", 
        {
        "model": "text-embedding-ada-002",
        "input": caption,
    },
    {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    });
    console.log("Image embedded");
    return await response.data.data[0].embedding;
}
