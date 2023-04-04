const ctx = canvas.getContext("2d");
const button = document.getElementById("button");
const tbutton = document.getElementById("tbutton");

let players = [1, 1, 1, 1];
let waiting = [];

function countPlayers() {
    let x = 0;
    for (let i = 0; i < players.length; i++){
        x += players[i];
    }
    return x;
}

//バツ印を描画する関数
function drawCross(x, y, size, ctx) {
    ctx.beginPath();
    ctx.moveTo(x-size, y-size+size/10);
    ctx.lineTo(x-size+size/10, y-size);
    ctx.lineTo(x+size, y+size-size/10);
    ctx.lineTo(x+size-size/10, y+size);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+size-size/10, y-size);
    ctx.lineTo(x+size, y-size+size/10);
    ctx.lineTo(x-size+size/10, y+size);
    ctx.lineTo(x-size, y+size-size/10);
    ctx.closePath();
    ctx.fill();
}

function draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, 180, 240);
    ctx.fillRect(canvas.width - 180, 0, 180, 240);
    ctx.fillRect(0, 250, 180, 240);
    ctx.fillRect(canvas.width - 180, 250, 180, 240);
    ctx.fillStyle = "red"

    if(players[0] == 1){
        drawCross(160, 120, 60, ctx);
    }
    if(players[1] == 1){
        drawCross(canvas.width - 160, 120, 60, ctx);  
    }
    if(players[2] == 1){
        drawCross(160, 120 + 250, 60, ctx);
    }
    if(players[3] == 1){
        drawCross(canvas.width - 160, 120 + 250, 60, ctx);
    }

    for(i = 0; i < waiting.length; i++) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(waiting[i].x, waiting[i].y, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();
    }
    ctx.fillStyle = "red"
    ctx.font = '32px sans-serif';
    ctx.fillText("空き:" + String((4 - countPlayers())/2), 10, 590);
    ctx.fillText("待ち:" + String(waiting.length), 10, 630);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw(ctx);

canvas.addEventListener("click", (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left - 240;
    let y = e.clientY - canvas.getBoundingClientRect().top - 245;
    if(y < 245){
        if(x < 0 && y < 0) {players[0] = -players[0];}
        if(x > 0 && y < 0) {players[1] = -players[1];}
        if(x < 0 && y > 0) {players[2] = -players[2];}
        if(x > 0 && y > 0) {players[3] = -players[3];}
    } else {
        waiting.push({x: x + 240, y: y + 245});
    }
    draw(ctx);
    //console.log(x, y, waiting.length);
}, false);

button.onclick = () => {
    const cvs = document.getElementById("canvas");
    const png = cvs.toDataURL();
    //console.log(png);
    document.getElementById("newImg").src = png;
}

tbutton.onclick = () => {
    let text ="";
    let now = new Date();
    text += "%23" + encodeURI("モナ恋情報") + "%0D%0A";
    text += encodeURI(`${now.getHours()}時${now.getMinutes()}分`) + "%0D%0A";
    text += encodeURI(`チュウニズム 空き${(4-countPlayers())/2} 待ち${waiting.length}`) + "%0D%0A";
    window.open(`https://twitter.com/intent/tweet?text=${text}`,);
    console.log(text);
}