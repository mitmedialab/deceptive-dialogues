'use server'

import OpenAI from 'openai';


// System Prompt
const PROMPT = `
You are a chatbot
`;


export async function callOpenAI(messages){
    console.log("Call OpenAI...")

    var _messages = messages;

    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
        dangerouslyAllowBrowser: true 
    });

    // Add system message
    if (_messages[0]?.role !== "system") {
        _messages.unshift({
            "role": "system",
            "content": PROMPT
        });
    }

    console.log("Messages within: ", _messages)

    const data = {
        "model": "gpt-4o",
        "messages": _messages,
        "temperature": 0,
        "max_tokens": 2048,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "response_format": {
            "type": "text"
        }
    };

      

    let testResponse = await openai.chat.completions.create(data);
    let res = testResponse.choices[0].message.content;
    console.log("OpenAI > Call > Result: ")
    console.log(res);
    return(res);
}