const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle file uploads and return metadata
app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    const fileMetadata = {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
    };

    res.json(fileMetadata);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
