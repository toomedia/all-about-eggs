# API Server Setup

This API server handles the AI image generation for the Eggfinity design studio.

## Setup

1. **Install dependencies:**
   ```bash
   npm install express cors dotenv openai
   ```

2. **Create a `.env` file:**
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=8000
   ```

3. **Start the server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

## API Endpoints

### POST `/api/generate-custom`

Generates an AI egg design based on a text prompt.

**Request Body:**
```json
{
  "prompt": "A magical Easter egg with galaxy patterns and golden stars"
}
```

**Response:**
```json
{
  "success": true,
  "image": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "message": "Image generated successfully"
}
```

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly message"
}
```

## Development

- Server runs on `http://localhost:8000`
- CORS is enabled for frontend integration
- Uses OpenAI DALL-E 3 for image generation 