require('dotenv').config(); // reads values from .env file and merges them into process.env
const server = require('./server')

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`))