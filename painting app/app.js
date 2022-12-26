
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 캔버스에 그림그릴때 context

canvas.width = 800; //css 뿐만 아니라 js에서도 표시
canvas.height = 800;

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50,  200);
ctx.lineWitdh = 2; // 선의 두께
ctx.strokeRect(300, 300, 50, 100);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();


