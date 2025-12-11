import { NextResponse } from "next/server";
import { category as Category, tags as Tag } from "@/types/eventInterface";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});


export async function POST(req: Request) {
  try {
    const { prompt, categories, tags } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    const categoriesList =
      categories.length > 0
        ? categories
            .map((c: Category) => `"${c.name}" (ID: ${c._id})`)
            .join(", ")
        : "No specific categories provided.";

    const tagsList =
      tags.length > 0
        ? tags.map((t: Tag) => `"${t.name}" (ID: ${t._id})`).join(", ")
        : "No specific tags provided.";

    const systemPrompt = `
      You are an intelligent Event Assistant. Your goal is to extract event details from the user's natural language description and return a strictly formatted JSON object.

      ### CONSTRAINTS & DATA:
      - **Allowed Categories**: [${categoriesList}]
        - Select the ONE category that best fits. Return its **ID** in the 'category' array (e.g. ["ID_HERE"]).
      - **Allowed Tags**: [${tagsList}]
        - Select matching tags. Return their **IDs** in the 'tags' array (e.g. ["ID1", "ID2"]).

      ### OUTPUT JSON SCHEMA:
      {
        "title": "string (max 100 chars)",
        "description": "string",
        "date": "YYYY-MM-DD",
        "time": "HH:mm",
        "location": {
          "country": "string (default: Egypt)",
          "city": "string",
          "district": "string",
          "address": "string",
          "latitude": number (optional),
          "longitude": number (optional)
        },
        "ticketType": {
           "price": number (0 if free),
           "quantity": number
        },
        "isonline": boolean,
        "category": [ "string_ID" ], 
        "tags": [ "string_ID" ]
      }

      ### RULES:
      1. **JSON ONLY**: Do not output any markdown text, just the raw JSON object.
      2. **Defaults**: If a field is missing, imply it reasonably or leave it empty/null. 
      3. **Language**: If the user writes in Arabic, translate the content to English (or keep Arabic if your system supports it - assuming English for structure, content can be mixed). *Actually, let's keep the content in the language the user used, or English if preferred. Let's infer: keep the language of the 'title' and 'description' matching the user's input language.*
      4. **Date/Time**: If user says "next friday", calculate the date starting from today (${
        new Date().toISOString().split("T")[0]
      }).
      5.description should be at least 100 words.
      6. from user entered location try to fill the district, city and address (address should be street city district) fields and try to get the Longitude and Latitude of the location and fill in its fields.
      7. fill the tags with the suitable tags for the event.

      User Input: "${prompt}"
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    const eventData = JSON.parse(content);

    return NextResponse.json({ data: eventData }, { status: 200 });
  } catch (error: unknown) {
    console.error("OpenAI API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
