const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const uploadsDirectory = path.join(__dirname, 'uploads');

fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadsDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9_-]/g, '-');
    callback(null, `${baseName}-${Date.now()}${extension}`);
  },
});

const upload = multer({ storage });

app.get('/', (_req, res) => {
  res.json({ message: 'File upload API is running' });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please select a file' });
  }

  return res.status(201).json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      savedName: req.file.filename,
      path: `uploads/${req.file.filename}`,
    },
  });
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});