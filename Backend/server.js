const http = require('http');
const app = require('./app');
const {InitializeSocket} = require('./socket')
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
InitializeSocket(server); 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

