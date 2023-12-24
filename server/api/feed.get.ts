import { XMLParser } from "fast-xml-parser";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const rssFeedUrl = runtimeConfig.rssFeedUrl;
  
    const response: Response = await $fetch(rssFeedUrl);
    const text = await response.text();
    const feed = parseFeed(text);
  
    return feed;
  });

const parseFeed = (text: string) => {
  const options = {
    ignoreAttributes: false,
  };

  const parser = new XMLParser(options);
  const result = parser.parse(text);

  return result;
};