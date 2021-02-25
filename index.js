const http = require('http');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);

PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
