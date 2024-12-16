---
# CH4-1
## Chrome Dino Game Clone
크롬 공룡 따라잡기


이 프로젝트는 구글 크롬 브라우저에서 오프라인일 때 나타나는 공룡 게임을 HTML, CSS, JavaScript로 재현한 것입니다. 게임을 통해 공룡이 장애물을 피하는 방식으로 구현되었습니다.

## 게임 규칙

- 플레이어는 스페이스바 또는 ↑ 키를 눌러 공룡을 점프시킬 수 있습니다.
- 공룡은 장애물(카 cactus)을 피해가며 이동합니다.
- 장애물을 피하지 못하면 게임이 종료됩니다.
- 점수는 공룡이 이동한 거리에 비례하여 증가합니다.
- 아이템 획득할 때 마다 점수 100점이 증가합니다.

## 기술 스택

- HTML
- CSS
- JavaScript (DOM 조작)

## 실행 방법

1. 저장소를 클론하거나 다운로드합니다.

    ```bash
    git clone https://github.com/yourusername/chrome-dino-clone.git
    ```

2. 프로젝트 디렉터리로 이동합니다.

    ```bash
    cd chrome-dino-clone
    ```

3. `index.html` 파일을 웹 브라우저에서 열어 게임을 시작합니다.

## 게임 화면

게임 화면은 HTML5의 `canvas` 요소를 사용하여 구현되었습니다. 게임의 주요 구성 요소는 다음과 같습니다.

- **공룡**: 스페이스바 또는 ↑ 키로 점프합니다.
- **장애물**: 일정 시간 간격으로 화면에 나타납니다.
- **점수**: 게임 화면에 표시됩니다.

## 코드 설명

### HTML

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chrome Dino Clone</title>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <canvas id="gameCanvas" width="800" height="200"></canvas>
        <script src="game.js"></script>
    </body>
</html>
```

- `canvas` 태그: 게임 화면을 그릴 공간을 제공합니다. `id="gameCanvas"`로 설정하여 JavaScript에서 접근할 수 있습니다.
- `game.js`: 게임 로직을 처리하는 JavaScript 파일입니다.
- `styles.css`: 게임의 스타일을 정의하는 CSS 파일입니다.

### CSS

```css
body {
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
}

canvas {
    border: 2px solid black;
}
```

- `body` 스타일: 게임 화면을 중앙에 배치하기 위해 Flexbox를 사용합니다. 화면의 높이는 100%로 설정하여 게임이 화면 전체에 맞춰지도록 합니다.
- `canvas` 스타일: 게임 화면을 나타내는 캔버스에 테두리를 추가하여 구분이 쉽게 합니다.

### JavaScript

```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 20, height: 20, velocityY: 0, isJumping: false };
let obstacles = [];
let score = 0;

// 공룡 점프
function jump() {
    if (!dino.isJumping) {
        dino.velocityY = -10;
        dino.isJumping = true;
    }
}

// 장애물 생성
function generateObstacles() {
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: 150, width: 20, height: 20 });
    }
}

// 장애물 이동
function moveObstacles() {
    obstacles.forEach((obstacle) => {
        obstacle.x -= 3;
    });
}

// 충돌 감지
function checkCollisions() {
    obstacles.forEach((obstacle) => {
        if (
            dino.x + dino.width > obstacle.x &&
            dino.x < obstacle.x + obstacle.width &&
            dino.y + dino.height > obstacle.y &&
            dino.y < obstacle.y + obstacle.height
        ) {
            alert("Game Over");
            resetGame();
        }
    });
}

// 점수 증가
function updateScore() {
    score++;
    document.title = `Score: ${score}`;
}

// 게임 업데이트
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 공룡 점프 로직
    if (dino.isJumping) {
        dino.velocityY += 0.5;
        dino.y += dino.velocityY;
        if (dino.y >= 150) {
            dino.y = 150;
            dino.isJumping = false;
            dino.velocityY = 0;
        }
    }

    generateObstacles();
    moveObstacles();
    checkCollisions();
    updateScore();

    // 공룡 그리기
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // 장애물 그리기
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    requestAnimationFrame(updateGame);
}

function resetGame() {
    dino.y = 150;
    dino.velocityY = 0;
    dino.isJumping = false;
    obstacles = [];
    score = 0;
    document.title = `Score: ${score}`;
    updateGame();
}

// 키 이벤트 처리
document.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "ArrowUp") {
        jump();
    }
});

// 게임 시작
updateGame();
```

- `canvas`에 그려지는 게임 요소들을 JavaScript로 구현합니다.
- `jump()`: 공룡을 점프시키는 함수입니다. 점프 중에는 공룡이 다시 점프할 수 없도록 방지합니다.
- `generateObstacles()`: 장애물을 생성하는 함수입니다.
- `moveObstacles()`: 장애물을 왼쪽으로 이동시키는 함수입니다.
- `checkCollisions()`: 공룡과 장애물 간의 충돌을 감지하는 함수입니다.
- `updateScore()`: 점수를 갱신하고 화면에 표시하는 함수입니다.
- `updateGame()`: 게임을 매 프레임마다 갱신하는 함수입니다.

<!-- 
## 기여

이 프로젝트는 오픈소스 프로젝트로 누구나 기여할 수 있습니다. 기여하고 싶다면 다음 단계를 따라 주세요.

1. 저장소를 포크합니다.
2. 변경 사항을 커밋합니다.
3. 풀 리퀘스트를 보냅니다.

## 라이센스

MIT 라이센스 하에 제공됩니다.
-->
---

### 문법 설명

1. **HTML**:

   - `canvas` 태그는 그래픽을 그리기 위한 공간을 제공합니다.
   - `script` 태그를 통해 JavaScript 파일을 로드하고, 게임 로직을 처리합니다.

2. **CSS**:

   - Flexbox 레이아웃을 사용하여 게임 화면을 화면 중앙에 배치합니다.
   - `canvas` 태그의 테두리를 설정하여 시각적으로 구분합니다.

3. **JavaScript**:
   - `getContext('2d')`: 2D 그래픽을 그릴 수 있는 컨텍스트를 얻어옵니다.
   - `fillRect(x, y, width, height)`: 사각형을 그리는 메서드입니다. 이로써 공룡과 장애물을 그립니다.
   - `requestAnimationFrame()`: 브라우저의 애니메이션 프레임을 요청하여 게임이 부드럽게 갱신되도록 합니다.
   - `addEventListener('keydown')`: 키보드 입력을 감지하여 공룡을 점프시키는 기능을 구현합니다.
