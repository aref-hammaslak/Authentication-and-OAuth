
import https from 'https';
import fs from 'fs';
import { app } from './app.js'
import { mongoConnection } from './services/mongo.js';


const PORT = 3000;

(async () => {
  await mongoConnection();

  https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

