import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAPI,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });

  console.log(completion.choices[0].message);
}

main();
