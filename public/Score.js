// ./public/Score.js
import { sendEvent, getUserId } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  // 플레이 시간과 비례해 증가하는 점수
  // userUUID를 매게변수로 넣어야 하나?
  update(deltaTime, userId) {
    let stage = gameAssets.stages.data;
    // deltaTime은 랜더링할 떄 브라우저의 프래임을 쪼개서 함
    // 이때 프레임 하나가 랜더링 되는 시간을 체크한 것
    // 지금은 60프레임 일듯 ( 1/60초)
    //this.score += deltaTime * 0.001;
    /** 스테이지 마다 시간당 주는 점수 바꾸기 **/
    this.score += deltaTime * 0.001 * stage.scorePerSecond;
    // 하드코딩 되있는거 수정하기
    // 점수가 100점 인 경우 서버에 메시지 전송
    // 하려는데 딱 100이 맞추기 어려워서 소숫점 버림
    if (Math.floor(this.score) === stage.score && this.stageChange) {
      this.stageChange = false;
      // sendEvent(11, { currentStage: 1000, targetStage: 1001 });
      sendEvent(11, { currentStage: stage.id, targetStage: stage.id + 1 });
    }
  }

  /** 아이템 획득 **/
  // 서버에서 아이템 획득시 요청을 보내서 itemId로 해당 아이템의 점수 주기
  getItem(itemId) {
    // 여기도 userId로 아이템 가져오기
    // 아이템 획득시 점수 변화
    // this.score += 0;
    /** 아이템 점수 추가  !!!**/
    this.score += itemId.score;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
