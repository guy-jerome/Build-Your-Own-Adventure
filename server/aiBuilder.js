import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline"
dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY})


async function getResponse(messages,functions, functionName){
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
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
                    type:"object",
                    description: "These are the various descriptions of the options you can take some smarter and others worse Can you make it so that some options do not appear indicating the end of the story, also show the options dynamically from 2 to 5?",
                    properties:{
                        option1:{
                            type:"string",
                            description:"This is one of the options. "
                        },
                        option2:{
                            type:"string",
                            description:"This is one of the options. "
                        },
                        option3:{
                            type:"string",
                            description:"This is one of the options. This is completely optional "
                        },
                    }
                }
            }
        }
    }
    const systemContent = "You are a professional choose your own adventure writer with over 40 years of experiance.";
    const instructionPrompt = "Create a choose your own adventure about a basic day in the life of an average person but it is more dramatic than normal. Include other people in this story. Be specific as possible about names and locations."
    const messages = [
        {
            role:"system",
            content: systemContent
        },
        {
            role:"user",
            content: instructionPrompt
        },
    ]

    async function runScene(){
        const response = await getResponse(messages,[scene],"scene")
        console.log(response.choices[0].message.function_call.arguments)
        messages.push({role:"assistant", content:response.choices[0].message.function_call.arguments})
        rl.question("What do you want to do?", (selection)=>{
            messages.push({role:"user", content:`The user selected:${selection}`})
            runScene()
        })
    }
    runScene()
    




}

generateScene();