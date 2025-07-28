import { client, assistant } from "../utils/openai"; // Ensure assistant is imported
import { getLatestMessages } from "#imports";

export default defineEventHandler(async (event) => {
  const threadID = getCookie(event, "thread-id");
  const runID = getCookie(event, "run-id");

  if (!threadID || !runID) {
    return;
  }

  const queryParams = getQuery(event);

  // Create user message
  await client.beta.threads.messages.create(threadID, {
    role: "user",
    content: queryParams.message?.toString() ?? "",
  });

  // 🔥 Create a new run to get assistant's reply
  const newRun = await client.beta.threads.runs.create(threadID, {
    assistant_id: "asst_t95PjQtxiOkX4dfHhynaVJD0",
  });

  // Return latest messages after completion
  return await getLatestMessages(threadID, newRun.id);
});
