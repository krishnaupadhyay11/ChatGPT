import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello MChatGpt',
    })
});

app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            maxTokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.choices[0].text,
        })
    } catch (error){
            res.status(500).send({error})
        }
    } 
)

app.listen(PORT, () => console.log(`Server on ${PORT}`))