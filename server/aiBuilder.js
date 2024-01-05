import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: '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'})


async function getResponse(messages,functions, functionName){
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        functions: functions,
        function_call: {name:functionName}
    })
    return response
}

async function generateScene(){
    
    const scene = {
        name: "scene",
        description: "creates an appropreate scene and choices for a choose your own adventure",
        parameters:{
            type: "object",
            properties:{
                sceneDescription:{
                    type:"string",
                    description: "This is the scene description that lays out the scenario and provides context for the options"
                },
                sceneOptions:{
                    type:"array",
                    description: "These are the various descriptions of the options you can take from 0 to about 4"
                }
            }
        }
    }
    const systemContent = "You are a professional choose your own adventure writer with over 40 years of experiance.";
    const instructionPrompt = "Create a choose your own adventure about a basic day in the life of an average person."
    const messages = [
        {
            role:"system",
            content: systemContent
        },
        {
            role:"user",
            content: instructionPrompt
        }
    ]
    const response = await getResponse(messages,[scene],"scene")
    console.log(response.choices[0].message.function_call.arguments)
}

generateScene();