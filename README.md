# Express + Multer File Upload

A simple file upload API built with Express.js and Multer. Uploaded files are stored in the `uploads` directory.

## Run locally

```bash
npm install
npm start
```

The server runs at `http://localhost:3000` by default.

## Upload a file with Postman

1. Create a `POST` request to `http://localhost:3000/upload`.
2. Open **Body** and select **form-data**.
3. Add the key `file` and change its type from **Text** to **File**.
4. Select an image and send the request.

Successful response:

```json
{
  "message": "File uploaded successfully",
  "file": {
    "originalName": "image.jpg",
    "savedName": "image-1234567890000.jpg",
    "path": "uploads/image-1234567890000.jpg"
  }
}
```

## cURL example

```bash
curl -X POST http://localhost:3000/upload -F "file=@image.jpg"
```