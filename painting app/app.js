const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 캔버스에 그림그릴때 context
const lineWidth = document.getElementById("line-width"); 
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option")); // 배열이 아니라 HTMLCollection 이므로 배열로 저장
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false; // painting 할 때와 아닐떄 구분하여 작동
let isFilling = false; // filling 할 떄와 아닐때 구분하여 작동


canvas.width = 800; 
canvas.height = 800;
// javascript 가 html 요소보다 빨리 로드 되어서, lineWidth 는 input의 기본값인 value=5 값으로 초기화 해주어야함
ctx.lineWidth = lineWidth.value; 

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
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) { // input(type=color)의 색상값을 변경하면 바뀜.
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) { // 색상버튼 누르면 선색상, 면색상 변경
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
}

function onModeClick() { // 버튼 누르면 fill / draw 모드 전환
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}

function onDestroyClick() { //  초기화 버튼 누르면 백지상태로 변경
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
}


function onCanvasClick() { // 초기화 = 캔버스 전체크기만큼 칠해주기
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);  
    }
}

function onEraserClick() { // 지우개는 흰색으로 그려주는 것과 같음.
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {
    const file = event.target.files[0]; // 유저가 업로드한 파일은 브라우저의 메모리에 저장되있음
    const url = URL.createObjectURL(file); // URL 을 통해 호출 (업로드한 브라우저안에서 사용)
    const image = new Image(); // create element <img>
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0,CANVAS_WIDTH, CANVAS_HEIGHT);
    };
}

function onDoubleClick(event) { // 더블클릭한 위치에 text 넣기
    ctx.save(); // 현재 ctx 상태를 저장
    const text = textInput.value;
    ctx.lineWidth = 1;
    ctx.font = '48px serif'; // 폰트변경 가능
    ctx.strokeText(text, event.offsetX, event.offsetY); // text를 원하는 현재 커서 위치에 넣기
    ctx.restore(); // 저장한 ctx 상태로 복구 
}

function onSaveClick() {
    const url = canvas.toDataURL(); //이미지를 URL DATA 로 표현하고 변수에 저장.
    
    const a = document.createElement("a"); // 가짜링크생성, a태그의 download 옵션 사용
    a.href = url;
    a.download = "myDrawing.png"; // DOWNLOAD 명
    a.click(); // (가짜)링크선택 - 다운로드받기
}

canvas.addEventListener("dblclick", onDoubleClick); // 더블클릭시 작동
canvas.addEventListener("mousemove",onMove); // 움직일 떄마다 선시작위치 움직임
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); // 마우스가 밖으로 나가면 false 로 변환
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange); // input(type=range) 바를 변경하면 두께 달라짐
color.addEventListener("change",onColorChange);
colorOptions.forEach(color => color.addEventListener("click",onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click",onSaveClick);