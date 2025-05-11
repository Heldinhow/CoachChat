# Chatbot Text API

A RESTful API that processes text for chatbot interactions, mimicking the behavior of the dotacoach.gg chatbot API.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the server:
   ```
   npm start
   ```
   
## Development

For development with auto-reload:
```
npm run dev
```

## API Documentation

API documentation is available using Swagger UI at:
```
http://localhost:3000/api-docs
```

## Docker

### Running with Docker

Build and run the Docker image:
```bash
docker build -t chatbot-text-api .
docker run -p 3000:3000 chatbot-text-api
```

### Running with Docker Compose

```bash
docker-compose up -d
```

## API Endpoints

### Process Text

```
POST /v1/chatbot/text
```

#### Request Body

```json
{
  "text": "e legion, qual o win rate nesse patch?",
  "url": "dotacoach.gg",
  "locale": "pt-BR"
}
```

#### Response

```json
{
  "answer": "Legion Commander tem uma taxa de vitória de 49.8% no patch atual.",
  "metadata": {
    "confidence": 0.92,
    "source": "dotacoach.gg/stats"
  }
}
```

## Testing with cURL

### Health Check
```bash
curl --location 'http://localhost:3000/v1/health'
```

### Process Text
```bash
curl --location 'http://localhost:3000/v1/chatbot/text' \
--header 'Content-Type: application/json' \
--data '{
  "text": "e legion, qual o win rate nesse patch?",
  "url": "dotacoach.gg",
  "locale": "pt-BR"
}'
```

### Process Text (Windows CMD)
```cmd
curl --location "http://localhost:3000/v1/chatbot/text" ^
--header "Content-Type: application/json" ^
--data "{\"text\": \"e legion, qual o win rate nesse patch?\", \"url\": \"dotacoach.gg\", \"locale\": \"pt-BR\"}"
```

### Process Text (Windows PowerShell)
```powershell
curl -Method POST `
-Uri "http://localhost:3000/v1/chatbot/text" `
-Headers @{"Content-Type"="application/json"} `
-Body '{"text": "e legion, qual o win rate nesse patch?", "url": "dotacoach.gg", "locale": "pt-BR"}'
```