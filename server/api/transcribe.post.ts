import { createClient } from "@deepgram/sdk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url;

  const runtimeConfig = useRuntimeConfig(event);
  const deepgramApiKey = runtimeConfig.deepgramKey;

  const deepgram = createClient(deepgramApiKey);

  console.log(url);

  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: url,
      },
      {
        model: "nova-2",
        smart_format: true,
      }
    );

    if (error) {
      console.error(error);
      return "Sorry, something went wrong.";
    }

    // console.log(result.results.channels[0].alternatives[0].transcript);

    return result.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error("Sorry, something went wrong.");
  }
});
