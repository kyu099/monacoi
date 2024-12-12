const ctx = canvas.getContext("2d");
const share = document.getElementById("sharebutton");

// クリスマス仕様
let christmas_tree = new Image();
christmas_tree.src = "christmas_tree.png"
let christmas_santa = new Image();
christmas_santa.src = "christmas_santa.png"
let christmas_reindeer = new Image();
christmas_reindeer.src = "christmas_reindeer.png"
let christmas_socks = new Image();
christmas_socks.src = "christmas_socks.png"

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
    // クリスマス仕様
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(christmas_tree, 10, 0, 196, 240);
    ctx.drawImage(christmas_tree, 10, 250, 196, 240);
    ctx.drawImage(christmas_tree, 10, 500, 196, 240);
    ctx.drawImage(christmas_tree, 10, 750, 196, 240);
    
    if(players[0] == 1){
        ctx.drawImage(christmas_socks, 120, 120, 102, 120);
    }
    if(players[1] == 1){ 
        ctx.drawImage(christmas_socks, 120, 120 + 250, 102, 120);
    }
    if(players[2] == 1){
        ctx.drawImage(christmas_socks, 120, 120 + 500, 102, 120);
    }
    if(players[3] == 1){
        ctx.drawImage(christmas_socks, 120, 120 + 750, 102, 120);
    }

    for(i = 0; i < waiting.length; i++) {
        if(waiting[i].img == "santa"){
            ctx.drawImage(christmas_santa, waiting[i].x - 85, waiting[i].y - 100, 170, 200);
        }
        if(waiting[i].img == "reindeer"){
            ctx.drawImage(christmas_reindeer, waiting[i].x - 89, waiting[i].y - 100, 179, 200);
        }
    }
    ctx.fillStyle = "green"
    ctx.font = '64px sans-serif';
    ctx.fillText("空き:" + String((4 - countPlayers())/2), 360, 900);
    ctx.fillText("待ち:" + String(waiting.length), 360, 980);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw(ctx);
// クリスマス仕様
let images = [christmas_tree, christmas_socks];
let loadedCount = 1;
for (let i in images) {
    images[i].addEventListener('load', function() {
        if (loadedCount == images.length) {
            let n = 0;
            for (let j in images) {
                for(let k = 0; k < 4; k++){
                    ctx.drawImage(images[j], 10 + n*110, 0 + k*250 + n*120, 196 - n*94, 240 - n*120);
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
    if(x < 240){
        if(y < 240) {players[0] = -players[0];}
        if(y > 250 && y < 490) {players[1] = -players[1];}
        if(y > 500 && y < 740) {players[2] = -players[2];}
        if(y > 750 && y < 990) {players[3] = -players[3];}
    } else {
        let rand = Math.random();
        if(rand < 0.8){
            waiting.push({x: x, y: y, img: "reindeer"});
        }else{
            waiting.push({x: x, y: y, img: "santa"});
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