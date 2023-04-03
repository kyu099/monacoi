const ctx = canvas.getContext("2d");

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, 180, 240);
    ctx.fillRect(canvas.width - 180, 0, 180, 240);
    ctx.fillRect(0, 250, 180, 240);
    ctx.fillRect(canvas.width - 180, 250, 180, 240);
    ctx.fillStyle = "red"

    if(players[0] == 1){
        ctx.beginPath();
        ctx.arc(160, 120, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();   
    }
    if(players[1] == 1){
        ctx.beginPath();
        ctx.arc(canvas.width - 160, 120, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();   
    }
    if(players[2] == 1){
        ctx.beginPath();
        ctx.arc(160, 120 + 250, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();   
    }
    if(players[3] == 1){
        ctx.beginPath();
        ctx.arc(canvas.width - 160, 120 + 250, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();  
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
