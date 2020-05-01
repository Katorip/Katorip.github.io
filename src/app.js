// app.js
console.log('app.js starting');

// Get coordinates of bubble area
let mainCanvas = document.getElementById("bubble-container");
let bubbleArena = mainCanvas.getBoundingClientRect();
let arenaTop = bubbleArena.top;
let arenaBottom = bubbleArena.bottom - 40;
let arenaLeft = bubbleArena.left;
let arenaRight = bubbleArena.right - 40;

// Bubble class for creating one bubbles
class Bubble {

    constructor(nbr) {

        // Unique number of bubble
        this.nbr = nbr;
    }

    // Make the bubble
    make() {        
        // Create new div element
        let bubble = document.createElement("div");
        // Add it inside to bubble-container div
        mainCanvas.appendChild(bubble);
        // Set needed attributes to div
        bubble.setAttribute("class", "bubble-item");
        bubble.setAttribute("id", "bubble-" + this.nbr);
        bubble.setAttribute("onClick", "clickit(this.innerText)");
        // Set order number inside bubble
        bubble.innerHTML = this.nbr;
    }
}

// Make the bubbles to bubble
class Bubbling {
    constructor(xpos, ypos, xspeed, yspeed, nbr) {

        // Starting x & y points
        this.xpos = xpos;
        this.ypos = ypos;
        // Starting x & y speeds
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        // Bubble number
        this.nbr = nbr;
    }

    move() {
        // Find the right bubble
        this.bubble = document.getElementById("bubble-" + (this.nbr));

        // Add speed to the bubble
        this.xpos = this.xpos + this.xspeed;
        this.ypos = this.ypos + this.yspeed;
        
        // Move the bubble
        this.bubble.style.transform = "translate(" + this.xpos + "px," + this.ypos + "px)";

        // Change direction if hit right or left wall
        if (this.xpos >= arenaRight -arenaLeft|| this.xpos <= 0) {

            this.xspeed = this.xspeed * -1; // Change direction
            let rand = Math.floor((Math.random() * 4) + 1); // Calculate new speed
            // Move little bit away of the wall before setting new speed so the bubble won't get stuck inside the wall
            this.xpos = this.xpos + this.xspeed;       
            this.bubble.style.transform = "translate(" + this.xpos + "px," + this.ypos + "px)"; 
            this.xspeed = rand * Math.sign(this.xspeed); // Set new speed
        }

        // Change direction if hit bottom or top wall
        if (this.ypos >= arenaBottom -arenaTop || this.ypos <= 0) {
            
            this.yspeed = this.yspeed * -1; // Change direction
            let rand = Math.floor((Math.random() * 4) + 1); // Calculate new speed
            // Move little bit away of the wall before setting new speed so the bubble won't get stuck inside the wall
            this.ypos = this.ypos + this.yspeed;
            this.bubble.style.transform = "translate(" + this.xpos + "px," + this.ypos + "px)";
            this.yspeed = rand * Math.sign(this.yspeed); // Set new speed
        }

    }
}

onload = function () {

    let bubbles = [];
    let divs = [];

    // Start creating bubbles when page load
    for (let i = 0; i < 10; i++)
    {
        // Set new bubble
        let bub = new Bubble(i + 1);
        // Call bubble making function
        bub.make();
        // Add to the list   
        divs[i] = bub;
    }
   
    // Start moving bubbles
    function setBubble() {
    
        for (let i = 0; i < 10; i++) {
            // Starting point values
            let startX = arenaLeft;
            let startY = arenaTop;
            // Starting speed values
            let xspeed = Math.floor((Math.random() * 4) - 2);
            let yspeed = Math.floor((Math.random() * 6) - 2);
            // We don't want zero values
            if (xspeed == 0) {
                xspeed++;
            }    
            if (yspeed == 0) {
                yspeed++;
            }
            // Set new bubbling
            var elem = new Bubbling(startX, startY, xspeed, yspeed, i + 1, divs[i]);
            // Add to the list
            bubbles[i] = elem;
        }
    }
    
    // Start moving bubbles
    function moveBubble() {

        // Call moving function to all bubbles
        for (let i = 0; i < 10; i++) {
            bubbles[i].move();       
        }
        // Update frame
        window.requestAnimationFrame(moveBubble);
    }
    
    // Start functions
    setBubble();
    moveBubble();
}

// Listen if bubble is clicked
function clickit (i) {

    // Get element
    let clickText = document.getElementById("nbr-of-bubbles");
    // Set new text
    clickText.innerHTML = "Nbr of bubbles " + i;
    // Write clicked bubbles number to the console
    console.log("Clicked bubble number is " + i);
}