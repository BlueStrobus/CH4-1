// ./public/Socket.js
import { CLIENT_VERSION } from './Constants.js';

// io는 이 라이브러리 사용 <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
const socket = io('http://localhost:3000', {
  // cunnection할 때 socket.emit('event' 체크가 안됨
  // 최초 연결시에도  버전 정보가 필요함
  // 그때 버전 정보등을 보내기 위해서 사용함

  // 이 데이터에 payload와 함께 query로 클라이언트 버전이 같이 가는 패킷을 확인할 수 있습니다.
  query: {
    clientVersion: CLIENT_VERSION,
  },

  // 서버에서 커넥션 맺는 부분(handleConnection)에서 추가하는 걸로 대신할 수 있다는 걸까?
  // 찾아보자
});

let userId = null; // userId를 null로 초기화 해서 선언
socket.on('response', (data) => {
  // 메시지를 response(헨들러에있음)를 통해서 받게 됨
  console.log(data);
});

// 서버에서 'connection'이라는 이벤트가 발생되서 메시지가 오면
// 클라이언트에서도 메시지를 받아야 함
// 클라이언트에서도 'connection'라는 이름으로 메시지를 받고
// 그 메시지에 있는 'uuid'를 userId 에 할당한다.
socket.on('connection', (data) => {
  // userId 사용
  console.log('connection: ', data);
  userId = data.uuid; // 서버로부터 받은 uuid를 저장
});

// 메시지는 'event'라는 이름으로 보냅니다.
const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    // 어떤 이벤트든지 클라이언트 버전과 함께 보냄
    // 근데 cunnection일 때 체크가 안됨
    clientVersion: CLIENT_VERSION,
    // handlerId를 통해 어떤 핸들러에서 처리가 될지 결정 난다.
    handlerId,
    payload,
  });
};

export { sendEvent };
/** 이걸로 점수 추가하기 **/
export const getUserId = () => userId;
