// ./src/models/stage.model.js

const stages = {};

export const createStage = (uuid) => {
  // key의 바구니는 hendleConnection에서 만듦
  stages[uuid] = []; // 초기 스테이지 배열 생성
};

export const getStage = (uuid) => {
  return stages[uuid];
};

export const setStage = (uuid, id, timestamp) => {
  return stages[uuid].push({ id, timestamp });
};

// 이전 종료된 게임 로그 clear
export const clearStage = (uuid) => {
  return (stages[uuid] = []);
};
