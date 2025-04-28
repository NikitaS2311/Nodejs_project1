import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3002;

// Serve static file function
const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 - File Not Found');
    }
};

// Create server
const server = createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === "GET") {
        if (req.url === "/") {
            return serveFile(res, path.join(__dirname,  "index.html"), "text/html");
        } else if (req.url === "/style.css") {
            return serveFile(res, path.join(__dirname, "style.css"), "text/css");
        } else if (req.url === "/favicon.ico") {
            res.writeHead(204); // No Content
            return res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 - Page Not Found');
        }
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
