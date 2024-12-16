// ./src/handlers/helper.js
import { getUsers, removeUser } from '../models/user.model.js';
import { CLIENT_VERSION } from '../constants.js';
import handlerMappings from './handlerMapping.js';
import { createStage } from '../models/stage.model.js';

// 서버에 연결될 때 마다 호출(새로운 연결이 생기면 알 수 있음)
export const handleConnection = (socket, userUUID) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUsers());
  /*클라이언트(http://localhost:3000)와 연결되면 uuid와 socketId를 받음
Current users: [
  {
    uuid: 'b84a9718-ca46-4d9a-8c55-a95c4e5fa4e5',
    socketId: 'u33KI9lTdZmH0v35AAAB'
  }
]*/
  // 스테이지 빈 배열 생성
  // 유저의 uuid를 받아서 게임에 접속하자 마자
  // 이 스테이지의 정보를 담을 수 있는 바구니를 만들어준다.
  // createStage(uuid);
  // Stage: [ { id: 1000, timestamp: 1734083064368 } ]
  // game.handler.js gameStart에서 stage 받은 것 출력함

  createStage(userUUID);
  socket.emit('connection', { uuid: userUUID });
};

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id); // 사용자 삭제
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users:', getUsers());
};

export const handleEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  const response = handler(data.userId, data.payload);
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }
  socket.emit('response', response);
};
