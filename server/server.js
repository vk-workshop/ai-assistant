import express, { json } from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cors());
app.use(json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const { tools } = await import('../server/helpers/tools.js');

const PORT = process.env.PORT || 3002;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.post('/', async (req, res) => {
  try {
    const runner = openai.beta.chat.completions.runTools({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.message }],
      tools,
    });

    const result = await runner.finalContent();

    res.send(JSON.stringify(result));
    console.log('Response:', result);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});