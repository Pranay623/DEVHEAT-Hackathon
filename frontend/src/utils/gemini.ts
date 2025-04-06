// utils/gemini.ts

const GEMINI_API_KEY = 'AIzaSyDm1y_Pjd_SGWoZ0kkyVta8tcsnPjFFCiE'; // Store securely in env for prod
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const analyzeAnswerWithGemini = async (
  question: string,
  answer: string
): Promise<{ correctness: number; feedback: string }> => {
  const prompt = `
You are an expert interview evaluator. Given the following question and candidate's answer, evaluate the correctness as a percentage (0-100) and provide a brief feedback.

Respond strictly in the following JSON format:
{
  "correctness": <number between 0 and 100>,
  "feedback": "<short explanation>"
}

Question: "${question}"
Answer: "${answer}"
`;

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  const data = await response.json();
  const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  try {
    const parsed = JSON.parse(textResponse);
    return parsed;
  } catch (err) {
    console.error('Gemini returned invalid JSON:', textResponse);
    return {
      correctness: 50,
      feedback: 'Could not analyze accurately, please try again.'
    };
  }
};
