import { ChatCompletion } from "openai/resources/index.mjs";

export const getHTMLFromOpenAIResponse = (response: ChatCompletion) => {
  const message = response.choices[0].message.content || '';
  const start = message.indexOf('<!DOCTYPE html>');
  const end = message.indexOf('</html>');
  const html = message.slice(start, end + '</html>'.length);
  return html;
};
