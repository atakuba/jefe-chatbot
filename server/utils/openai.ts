import OpenAI from "openai";

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const assistant = "asst_t95PjQtxiOkX4dfHhynaVJD0";