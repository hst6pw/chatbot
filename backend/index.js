const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt
        });
        return res.status(200).json({
            message: "Working",
        });
    } catch (error) {}
});

app.post("/ask", async (req, res) => {
    const prompt = req.body.prompt;
    
    console.log(prompt);

    try {
        if (prompt == null) {
          throw new Error("Uh oh, no prompt was provided");
        }

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 64,
            temperature: 0
        });

        console.log(response.data);

        // return the result
        return res.status(200).json({
          success: true,
          data: response.data.choices[0].text,
        });
      } catch (error) {
        console.log(error.message);
      }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));