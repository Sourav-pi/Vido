# Vido

Vido is a video sharing platform that allows users to upload, share, and view videos.

## Deployed version :

Link : https://vido-enow.onrender.com/

## Features

- User authentication and authorization
- Video upload
- Video playback
- Commenting and liking system
- User profiles

## Installation and usage

1. Clone the repository:
   ```bash
   git clone https://github.com/Sourav-pi/Vido
   ```
2. Navigate to the server:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm i
   ```
4. Run the server (API):
   ```bash
   npm start
   ```
5. Navigate to the client:
   ```bash
   cd ../client
   ```
6. Install dependencies:
   ```bash
   npm i
   ```
7. Run the client:
   ```bash
   npm run dev
   ```

## Environment Variables

### Server

Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Client

Create a `.env` file in the `client` directory and add the following environment variables:

```
REACT_APP_API_URL=http://localhost:5000
```
