const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({}); //auto assuming GEMINI_API_KEY is the env name. otw need to pass it in as params

const MODEL = "gemini-2.5-flash";


function buildClothingPrompt(clothing){
    return `You are a small AI service that provides 1-2 lines long editorial notes on clothing items uploaded by the user.
    You will be given requirements and available metadata of the clothing data as uploaded by the user (set as 'Unknown' if the data wasn't provided). You have to analyse the metadata, ascertain what kind of a clothing item it is and what vibe it suits.
    Based on these results, you have to generate a reply only containing the editorial note that you created for the item so that it may be copied cleanly and pasted straight into the UI.
    Here's the details of the clothing provided by the user. Generate the note and reply as instructed.
    
    Name: ${clothing.name || "Unknown"}
    Category: ${clothing.category || "Unknown"}
    Color: ${clothing.color || "Unknown"}
    Fit: ${clothing.fit || "Unknown"}
    Size: ${clothing.size || "Unknown"}
    Notes: ${clothing.additionalNotes || "None"}

    Requirements:
    - Sophisticated tone
    - Editorial fashion magazine style
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

    return `
        You are a small AI service that provides 1-2 lines long editorial notes on outfits uploaded by the user.
        You will be given requirements and available metadata of the outfit data as uploaded by the user (set as 'Unknown' if the data wasn't provided). You have to analyse the metadata, ascertain what kind of an outfit it is and what vibe it suits.
        Based on these results, you have to generate a reply only containing the editorial note that you created for the outfit so that it may be copied cleanly and pasted straight into the UI.
        Here's the details of the clothing provided by the user. Generate the note and reply as instructed.

       Outfit name: ${outfit.name || "Untitled"}
        Garments: ${clothingDescriptions || "Various garments"}
        Description: ${outfit.description || "None"}

        Requirements:
        - Sophisticated tone
        - Editorial fashion magazine style
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

module.exports = { generateClothingEditorialNote , generateOutfitEditorialNote}