const ctx = canvas.getContext("2d");
const share = document.getElementById("sharebutton");

// ハロウィン仕様
let tombstoneimg = new Image();
tombstoneimg.src = "halloween_grave.png"
let pumpkinimg = new Image();
pumpkinimg.src = "halloween_pumpkin1.png"
let ghostimg = new Image();
ghostimg.src = "halloween_chara7_obake.png"

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
    // ハロウィン仕様
    //ctx.fillStyle = "white";
    ctx.fillStyle = "#ba55d3"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tombstoneimg, 0, 0, 348, 240);
    ctx.drawImage(tombstoneimg, 0, 250, 348, 240);
    ctx.drawImage(tombstoneimg, 0, 500, 348, 240);
    ctx.drawImage(tombstoneimg, 0, 750, 348, 240);
    
    //ctx.fillStyle = "yellow";
    //ctx.fillRect(0, 0, 180, 240);
    //ctx.fillRect(0, 250, 180, 240);
    //ctx.fillRect(0, 500, 180, 240);
    //ctx.fillRect(0, 750, 180, 240);
    //ctx.fillStyle = "red"
    
    if(players[0] == 1){
        //drawCross(150, 120, 60, ctx);
        ctx.drawImage(ghostimg, 150, 20, 187, 200);
    }
    if(players[1] == 1){
        //drawCross(150, 120 + 250, 60, ctx);  
        ctx.drawImage(ghostimg, 150, 20 + 250, 187, 200);
    }
    if(players[2] == 1){
        //drawCross(150, 120 + 500, 60, ctx);
        ctx.drawImage(ghostimg, 150, 20 + 500, 187, 200);
    }
    if(players[3] == 1){
        //drawCross(150, 120 + 750, 60, ctx);
        ctx.drawImage(ghostimg, 150, 20 + 750, 187, 200);
    }

    for(i = 0; i < waiting.length; i++) {
        //ctx.fillStyle = "black";
        //ctx.beginPath();
        //ctx.arc(waiting[i].x, waiting[i].y, 60, 0, 360 * Math.PI / 180, false);
        //ctx.fill();
        ctx.drawImage(pumpkinimg, waiting[i].x - 75, waiting[i].y - 64, 150, 128);
    }
    ctx.fillStyle = "red"
    ctx.font = '64px sans-serif';
    ctx.fillText("空き:" + String((4 - countPlayers())/2), 360, 900);
    ctx.fillText("待ち:" + String(waiting.length), 360, 980);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw(ctx);
// ハロウィン仕様
let images = [tombstoneimg, ghostimg];
let loadedCount = 1;
for (let i in images) {
    images[i].addEventListener('load', function() {
        if (loadedCount == images.length) {
            let n = 0;
            for (let j in images) {
                for(let k = 0; k < 4; k++){
                    ctx.drawImage(images[j], 0 + n*150, 0 + k*250 + n*20, 348 - n*161, 240 - n*40);
                }
                n++;
            }
        }
        loadedCount++;
    }, false);
}

canvas.addEventListener("click", (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    if(x < /*200*/ 350){
        if(y < 240) {players[0] = -players[0];}
        if(y > 250 && y < 490) {players[1] = -players[1];}
        if(y > 500 && y < 740) {players[2] = -players[2];}
        if(y > 750 && y < 990) {players[3] = -players[3];}
    } else {
        waiting.push({x: x, y: y});
    }
    draw(ctx);
    //console.log(x, y, waiting.length);
}, false);

share.onclick = () => {
    let text ="";
    let now = new Date();
    text = `#モナ恋情報
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