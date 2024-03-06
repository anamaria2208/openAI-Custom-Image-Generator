import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const openai = new OpenAI();

async function generateImage(userInput) {
  const response = await openai.images.generate({ prompt: userInput });
  return response.data[0].url
}

app.get("/", (req, res) => {
  res.status(200).send("Okai, running on port :" + process.env.PORT.toString());
});

app.post("/api", async (req, res) => {
  console.log(req.body);
  const request = JSON.stringify(req.body[0].text)
  let image = await generateImage(request);
  res.status(200).send(image);
});

app.listen(process.env.PORT, () => {});
