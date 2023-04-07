import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.OPENAI_API_KEY;
export default async function generateResponse(input) {
  if (!API_KEY) {
    console.log({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return {status: 500, data: {error: {message: "OpenAI API key not configured, please follow instructions in README.md"}}};
  }
  // Validate the input
  const description = input.description;
  const messages = input.messages;
  const weights = input.weights;
  const temperature = input.temperature || 1;
  const presence_penalty = input.presence_penalty || 0;
  const frequency_penalty = input.frequency_penalty || 0;
  const language = input.language || "english";
  const maxWords = input.maxWords || 20;
  console.log({description, messages, weights, temperature, presence_penalty, frequency_penalty, language, maxWords});
  if (!description || !messages || !weights) {
    return {status: 400, data: {error: {message: "Invalid input, please check the input format."}}};
  }
  try {
    const prompt = generatePrompt(description, messages, weights, language, maxWords);
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        "model": "gpt-3.5-turbo",
        "messages": prompt,
        "temperature": temperature,
        "presence_penalty": presence_penalty,
        "frequency_penalty": frequency_penalty,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    console.log({response: completion.data.choices[0].message});
    if (!completion.data.choices[0].message) {
      return {status: 500, data: {error: {message: "No response generated."}}};
    }
    return {status: 200, data: completion.data.choices[0].message};
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      console.log(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      console.log({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(description, messages, weights, language, maxWords) {
  let prompt = [];
  prompt.push({
    "role": "system",
    "content": 
    `Play an user talking to another person within a dating app. 
    Your objective is not only to keep the conversation going but also to get the other person to like you.
    Ultimately you want to get the other person to like you, but also end up bringing them to bed.
    Take the following as the context of the general situation (conversation will be provided later):
    ${description}
    Answer in ${language} using a collocial language. Use a maximum of ${maxWords} words.
    Use emojis when appropriate. Don't overuse them, but do use them when appropriate.
    In order to adapt yourself, you will be provided with several criteria in the scale of 0 to 100. 
    The higher the value, the more you should adapt your response to that criteria.
    Weight in all the the criterias so you take them ALL into account, without leaving any of them out unless the weight is 0.
    Weight of the following criterias:
    Spicy:
      Weight: ${weights.spicy}
      Description: How spicy should the conversation be? 
    Funny:
      Weight: ${weights.funny}
      Description: How funny should the conversation be? 
    Romantic:
      Weight: ${weights.romantic}
      Description: How romantic should the conversation be? 
    Creative:
      Weight: ${weights.creative}
      Description: How creative should the conversation be?
    Finally remeber that you are not allowed to say anything that would make the other person feel uncomfortable or anything that would make them stop talking to you.
    Once again, take the weight of the criterias into account. Take the weight of the criterias into account A LOT, don't forget they are there for a reason.
    And finally, take the context into account. It is there for a reason, and it should be used to make the response more personal, more interesting and more natural.
    Context:
    ${description}
    Weights (put special attention to them and how should you adapt your response to them according to how close the number is to 100, if it is 0, then you don't have to adapt your response to that criteria, but if it is 100, then you have to adapt your response to that criteria a lot).
    Given you response, it should be adapted to a level that the user can tell that you took the weights into account. Even reverse engineer the weights from your response (not literally, but you get the point).
    Spicy: ${weights.spicy}
    Funny: ${weights.funny}
    Romantic: ${weights.romantic}
    Creative: ${weights.creative}
    Use emojis when appropriate. Don't overuse them, but do use them when appropriate.
    Ultimately you want to get the other person to like you, but also end up bringing them to bed, so if you see the opportunity, go for it.
    `
  });
  messages.forEach((message) => {
    prompt.push({
      "role": message.role,
      "content": message.content
    });
  }
  );
  return prompt;
}