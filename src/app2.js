console.log('app.js starting');

let mainCanvas = document.getElementById("bubble-container");
let context = mainCanvas.getContext("2d");

let bubbleArena = mainCanvas.getBoundingClientRect();
let arenaTop = bubbleArena.top;
let arenaBottom = bubbleArena.bottom - 40;
let arenaLeft = bubbleArena.left;
let arenaRight = bubbleArena.right - 40;

mainCanvas.style.background = "black";

class Bubble {
    constructor(xpos, ypos, radius, color) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        // context.lineWidth = 5;
        context.fillStyle("red");
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.closePath();
    }
}

let bubbles = [];

let createBubbles = function(bubble) {
    bubble.draw(context);
}

for (let i = 0; i < 10; i++) {
    let bub = new Bubble(100, 100, 50, "blue");
    bubbles.push(bub);
    createBubbles(bubbles[i]);
}