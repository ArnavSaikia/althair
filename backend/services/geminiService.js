const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const MODEL = "gemini-2.5-flash";


function buildClothingPrompt(clothing) {
    return `You are a small AI service that gives short, practical styling suggestions for clothing items in a personal wardrobe app.
    You will be given metadata about a clothing item. Based on this, give the user 1-2 sentences of casual, useful advice on how to get the most out of this piece — what it pairs well with, what occasions it works for, or how to style it differently.
    Reply only with the suggestion so it can be pasted straight into the UI.

    Name: ${clothing.name || "Unknown"}
    Category: ${clothing.category || "Unknown"}
    Color: ${clothing.color || "Unknown"}
    Fit: ${clothing.fit || "Unknown"}
    Size: ${clothing.size || "Unknown"}
    Notes: ${clothing.additionalNotes || "None"}

    Requirements:
    - Casual, practical tone
    - Focused on usage and combinations
    - No emojis
    - No hashtags
    - No bullet points
    - Maximum 40 words
    `
};

function buildOutfitPrompt(outfit) {
    const clothingDescriptions = outfit.canvasItems
        ?.map(item => {
            const c = item.clothingId;
            if (!c) return null;
            return `${c.color || ""} ${c.name || c.category || "garment"}`;
        })
        .filter(Boolean)
        .join(", ");

    return `You are a small AI service that gives short, practical suggestions for outfits saved in a personal wardrobe app.
        You will be given metadata about an outfit. Based on this, give the user 1-2 sentences of casual, useful advice — what occasions this outfit works for, what could be swapped out to change the vibe, or when to reach for this look.
        Reply only with the suggestion so it can be pasted straight into the UI.

        Outfit name: ${outfit.name || "Untitled"}
        Garments: ${clothingDescriptions || "Various garments"}
        Description: ${outfit.description || "None"}

        Requirements:
        - Casual, practical tone
        - Focused on usage and occasion suggestions
        - No emojis
        - No hashtags
        - No bullet points
        - Maximum 50 words
        `;
};

async function generateText(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: prompt,
        });

        return response.text?.trim() || null;

    } catch (error) {
        console.error("Gemini generation failed:", error.message);
        return null;
    }
}

async function generateClothingEditorialNote(clothing) {
    const prompt = buildClothingPrompt(clothing);
    return await generateText(prompt);
}

async function generateOutfitEditorialNote(outfit) {
    const prompt = buildOutfitPrompt(outfit);
    return await generateText(prompt);
}

module.exports = { generateClothingEditorialNote, generateOutfitEditorialNote }