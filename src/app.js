// ./src/app.js
import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';

const app = express();
const server = createServer(app);

const PORT = 3000;

// 퍼블릭파일을 외부로 오픈
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initSocket(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// server.listen : (서버 여는 것) 서버가 3000번 포트를 듣는다.
// 서버가 정상적으로 열리면 실행함.
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded successfully');
  } catch (error) {
    console.error('Failed to load game assets:', error);
  }
});
