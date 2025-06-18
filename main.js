const ctx = canvas.getContext("2d");
const share = document.getElementById("sharebutton");

// 夏仕様
let wave = new Image();
wave.src = "wave_nami3.png"
let mizugi_man = new Image();
mizugi_man.src = "mizugi_man.png"
let mizugi_woman = new Image();
mizugi_woman.src = "mizugi_woman.png"
let srufing_man = new Image();
srufing_man.src = "srufing_man.png"

let players = [1, 1, 1, 1];
let waiting = [];

function countPlayers() {
    let x = 0;
    for (let i = 0; i < players.length; i++){
        x += players[i];
    }
    return x;
}

function draw(ctx) {
    // 夏仕様
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(wave, 10, 0, 325, 245);
    ctx.drawImage(wave, 10, 250, 325, 245);
    ctx.drawImage(wave, 10, 500, 325, 245);
    ctx.drawImage(wave, 10, 750, 325, 245);
    
    if(players[0] == 1){
        ctx.drawImage(srufing_man, 80, 60, 191, 200);
    }
    if(players[1] == 1){ 
        ctx.drawImage(srufing_man, 80, 60 + 250, 191, 200);
    }
    if(players[2] == 1){
        ctx.drawImage(srufing_man, 80, 60 + 500, 191, 200);
    }
    if(players[3] == 1){
        ctx.drawImage(srufing_man, 80, 60 + 750, 191, 200);
    }

    for(i = 0; i < waiting.length; i++) {
        if(waiting[i].img == "man"){
            ctx.drawImage(mizugi_man, waiting[i].x - 87, waiting[i].y - 120, 174, 240);
        }
        if(waiting[i].img == "woman"){
            ctx.drawImage(mizugi_woman, waiting[i].x - 87, waiting[i].y - 120, 174, 240);
        }
    }
    ctx.fillStyle = "dodgerblue"
    ctx.font = '64px sans-serif';
    ctx.fillText("空き:" + String((4 - countPlayers())/2), 360, 900);
    ctx.fillText("待ち:" + String(waiting.length), 360, 980);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw(ctx);
// 夏仕様
let images = [wave, srufing_man];
let loadedCount = 1;
for (let i in images) {
    images[i].addEventListener('load', function() {
        if (loadedCount == images.length) {
            let n = 0;
            for (let j in images) {
                for(let k = 0; k < 4; k++){
                    ctx.drawImage(images[j], 10 + n*70, 0 + k*250 + n*60, 325 - n*134, 245 - n*45);
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
    if(x < 280){
        if(y < 240) {players[0] = -players[0];}
        if(y > 250 && y < 490) {players[1] = -players[1];}
        if(y > 500 && y < 740) {players[2] = -players[2];}
        if(y > 750 && y < 990) {players[3] = -players[3];}
    } else {
        let rand = Math.random();
        if(rand < 0.8){
            waiting.push({x: x, y: y, img: "man"});
        }else{
            waiting.push({x: x, y: y, img: "woman"});
        }
        
    }
    draw(ctx);
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