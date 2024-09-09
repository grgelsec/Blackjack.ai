import OpenAI from "openai";
import { ChatCompletion } from "openai/resources";
import { ChatCompletionMessage } from "openai/src/resources";
import { useEffect, useState } from "react";

const useAI = (query: string) => {
  const [response, setResponse] = useState<ChatCompletionMessage>();

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
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `${query}`,
            },
          ],
        });

        const data = await response.choices[0].message;
        setResponse(data);
      } catch (error) {
        console.log("Error occorued: ", error);
      }
    };
    getResponse();
  }, [query]);

  return { response };
};

export default useAI;
