require('dotenv').config();

export default async function Dictaphone(req, res) {
  if (req.method === 'POST') {
    const { inputText } = req.body;

    let prompt = inputText + '以上を要約してください';
    
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    (async () => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
    });
    console.log(response.data.choices[0].text);
    res.status(200).json(response.data.choices[0].text);
    })();

  } else {
    res.status(405).end();
  }
}