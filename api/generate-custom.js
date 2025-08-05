import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json()); 

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });

// Generate Image Endpoint
app.post('/api/generate-custom', async (req, res) => {
  try {
    const { prompt } = req.body; 

    if (!prompt || prompt.length < 3) {
      return res.status(400).json({ 
        success: false,
        error: "Prompt must be at least 3 characters long",
        message: "Invalid prompt"
      });
    }

    console.log("🚀 ~ app.post ~ prompt:", prompt)
    
    const aiPrompt = `
    A STANDALONE EGG DESIGN with ${prompt}. 
    CRITICAL RULES:
    1. Background must be PURE #BCB8B5 (light warm gray) - NO gradients, NO textures
    2. Egg must have soft shadow beneath (hex #888888, blur radius 15px)
    3. All artistic elements must be CONTAINED WITHIN the egg shape
    4. Never show egg edges blending into background
    5. Style: 3D render with soft lighting (no flat designs)
  
    DESIGN GUIDELINES:
    - Extreme creativity allowed ONLY on egg surface
    - Background must remain completely empty
    - Shadow must be subtle but visible (opacity 30%)
    - Egg must appear to "float" 2cm above background
  `;

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: aiPrompt,
  n: 1,
  size: "1024x1024",
  style: "vivid",
  quality: "hd"
});

    console.log("Generated image URL:", response.data[0].url);

    return res.json({ 
      success: true,
      image: response.data[0].url,
      message: "Image generated successfully"
    });

  } catch (error) {
    console.error("Generation error:", error);
    return res.status(500).json({ 
      success: false,
      error: error.message || "Failed to generate design",
      message: "Failed to generate image"
    });
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});