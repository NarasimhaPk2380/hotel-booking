const express = require('express');
const path = require('path');
const app = express();

async function startServer() {
    const port = process.env.port || 3333;
    const CLIENT_BUILD_PATH = path.join(__dirname, './dist/apps/hotel');

    app.use(express.static(CLIENT_BUILD_PATH));

    app.get('*', (request, response) => {
        response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
    });
    app
        .listen(port, () => {
            console.log(`Listening at http://localhost:${port}/api`);
        })
        .on('error', console.error);
}

startServer();
