import OpenAI from "openai";
//import { ChatCompletionMessage } from "openai/src/resources";
import { useEffect, useState } from "react";

const useAI = (query: string) => {
  const [response, setResponse] = useState<string | null>();

  useEffect(() => {
    const getResponse = async () => {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAPI,
        dangerouslyAllowBrowser: true,
      });
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Please only use words, no symbols. You are a Blackjack coach. Before the player hits 'New Game' please give them a concise run down of the base game rules of blackjack. Once the player has hit new game, you will be alerted and only until then will you do what the next sentence says. Please keep your responses very concise.",
            },
            {
              role: "user",
              content: `${query}`,
            },
          ],
        });

        const data = await response.choices[0].message.content;
        setResponse(data);
      } catch (error) {
        console.log("Error occorued: ", error);
      }
    };
    getResponse();
  }, [query]);

  return { response, setResponse };
};

export default useAI;
