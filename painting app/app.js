const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 캔버스에 그림그릴때 context
const lineWidth = document.getElementById("line-width"); 
let isPainting = false; // painting 할 때와 아닐떄 구분하여 작동

canvas.width = 800; //css 뿐만 아니라 js에서도 표시
canvas.height = 800;
ctx.lineWidth = lineWidth.Value;

function onMove(event) {
    /*
    mousedown 하면 startingPaint 이 작동해 isPainting 이 true(그리기)
    */
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    // 커서 이동시 항상 그림좌표도 이동
    
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() { // 단 마우스가 canvas 밖으로 나가면 적용안됨.
    isPainting = false;
    ctx.beginPath(); // new path
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.Value;
}

canvas.addEventListener("mousemove",onMove); // 움직일 떄마다 선시작위치 움직임
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); // 마우스가 밖으로 나가면 false 로 변환
lineWidth.addEventListener("change", onLineWidthChange); // input 바에 따라 두께 달라짐