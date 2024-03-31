const ctx = canvas.getContext("2d");
const share = document.getElementById("sharebutton");

let background = new Image();
background.src = "background.png";
let player = new Image();
player.src = "player.png";
let wait1 = new Image();
wait1.src = "wait1.png";
let wait2 = new Image();
wait2.src = "wait2.png";
let wait3 = new Image();
wait3.src = "wait3.png";
let wait4 = new Image();
wait4.src = "wait4.png";

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
    ctx.drawImage(background, 0, 0, 861, 1152);

    if(players[3] == 1){
        ctx.drawImage(player, 400, 50, 240, 240);
    }
    if(players[2] == 1){
        ctx.drawImage(player, 300, 35, 300, 300);
    }
    if(players[1] == 1){
        ctx.drawImage(player, 160, 20, 380, 380);
    }
    if(players[0] == 1){
        ctx.drawImage(player, -40, 0, 480, 480);
    }

    for(i = 0; i < waiting.length; i++) {
        if(waiting[i].n == 0){
            ctx.drawImage(wait1, waiting[i].x, waiting[i].y, waiting[i].size, waiting[i].size);
        } else if(waiting[i].n == 1){
            ctx.drawImage(wait2, waiting[i].x, waiting[i].y, waiting[i].size, waiting[i].size);
        } else if(waiting[i].n == 2){
            ctx.drawImage(wait3, waiting[i].x, waiting[i].y, waiting[i].size, waiting[i].size);
        } else if(waiting[i].n == 3){
            ctx.drawImage(wait4, waiting[i].x, waiting[i].y, waiting[i].size, waiting[i].size);
        }
    }

    ctx.fillStyle = "red"
    ctx.font = '64px sans-serif';
    ctx.fillText("空き:" + String((4 - countPlayers())/2), 360, 900);
    ctx.fillText("待ち:" + String(waiting.length), 360, 980);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

//背景を読み込んでから描画
background.addEventListener('load', function() {
    draw(ctx);
}, false);
player.addEventListener('load', function() {
    draw(ctx);
})


canvas.addEventListener("click", (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    if(y < -0.85*x + 757.5 && x < 540){
        if(x < 264) {players[0] = -players[0];}
        if(x > 264 && x < 393) {players[1] = -players[1];}
        if(x > 393 && x < 477) {players[2] = -players[2];}
        if(x > 477 && x < 540) {players[3] = -players[3];}
    } else {
        let rand = Math.floor(Math.random()*4)
        let size = y - 60;
        if(size < 210){size = 210;}
        waiting.push({x: x - size/2, y: y - size, n: rand, size: size});
        waiting.sort(function(a,b){return a.size - b.size});
    }
    draw(ctx);
    //console.log(x, y, waiting.length);
}, false);

share.onclick = () => {
    let text ="";
    let now = new Date();
    text = `#モナ恋情報 #モナ恋情報4K #エイプリルフール   
${now.getHours()}時${now.getMinutes()}分
チュウニズム 空き${(4-countPlayers())/2} 待ち${waiting.length}
モナ恋情報共有はこちらから！
↓ ↓ ↓
https://kyu099.github.io/monacoi/`

    const cvs = document.getElementById("canvas");

    cvs.toBlob(function(blob) {
        const image = new File([blob], "tmp.png", {type: "image/png"});
        navigator.share({
            text: decodeURI(text),
            files: [image]
        }).then(() => {
            console.log("Share was successful.");
        }).catch((error) => {
            console.log("Sharing failed", error);
        });
    });
}