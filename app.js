// Algoritmo para detectar colisión de circulos
// Collision detection between circles in JavaScript first calculates the distance between two centre points and compares it to sum of radii of these two circles.
// https://www.youtube.com/watch?v=rtBCVe3j_24&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=6

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// In Chrome, the default canvas size is 300px x 150px
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width);
console.log(canvas.height);

let radio = 10;
let r = 0.20;
let x = 10 + radio;
let y = canvas.height - radio;
let mx = 2;
let my = -2;
const paddleWidth = 8;
let paddleHeight = 100;
let speed = 2;

// score
const score = {
    x: canvas.width * 0.90,
    y: canvas.height / 14,
};

// ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: radio,
    speed: 5,
    velocitiX: speed,
    velocitiY: speed,
    color: "red",
    text: "-"
};
const circle = {
    x: canvas.width / 0.5,
    y: canvas.height / 2,
    radius: radio,
    speed: 2,
    velocitiX: speed,
    velocitiY: speed,
    color: "orange",
    text: "+"
};

// paddeluser paddle
const paddeluser = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "red",
    score: 0,
};

// Draw axes lines
const linesBetwenPoints = (p1, p2, color = "#e5dede", size) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    //ctx.strokeText(speed, (p2.x, p2.y), 50);
    ctx.closePath();
};

// restart
const restart = () => {
    // = 0;
    alert('GAME OVER');
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocitiY = 2;
    ball.velocitiX = 2;
    paddeluser.height = paddleHeight;
    paddeluser.y = (canvas.height - paddleHeight) / 2;
    ball.color = "red";
    speed = 2;
    radio = 10;
    r = 0.25;
}

const circlesColision = (ball, circle) => {
    let dx = circle.x - ball.x;
    let dy = circle.y - ball.y;
    // Pitagoras para calcular hipotenusa = distancia
    let distance = Math.sqrt(dx * dx + dy * dy);
    //console.log(distance.toFixed(1));
    let sumOfradius = ball.radius + circle.radius;
    if (distance < sumOfradius) {
        canvas.style = "background-color: coral";
        ball.color = "purple";
        // limiatar el incremento de r con un tope
        r += 0.60;
        console.log(r);
        return true
    }
    if (distance == sumOfradius) {
        console.log(distance + " TOUCHING " + sumOfradius);
        ball.color = "black";
    }
};

const paddelColision = (rectangle, circle) => {
    rectangle.top = rectangle.y;
    rectangle.botton = rectangle.y + rectangle.height;
    rectangle.left = rectangle.x;
    rectangle.right = rectangle.x + rectangle.width;
    circle.top = circle.y - circle.radius;
    //console.log("Y circulo:", circle.top);
    //console.log("Y rectangle:", rectangle.top);
    circle.bottom = circle.y + circle.radius;
    circle.left = circle.x - circle.radius;
    circle.right = circle.x + circle.radius;
    if (rectangle.botton < circle.top) {
        //canvas.style = "background-color: blue";
        let point = { x: rectangle.left, y: rectangle.botton - (rectangle.height / 2) };
        linesBetwenPoints(point, circle, "red", 1);
    }
    if (rectangle.top > circle.top) {
        //canvas.style = "background-color: aqua";
        let point = { x: rectangle.left, y: rectangle.botton - (rectangle.height / 2) };
        linesBetwenPoints(point, circle, "yellow", 1);
    }
    //return circle.right > rectangle.left && circle.top > rectangle.botton && circle.left < rectangle.right && circle.bottom > rectangle.top
    //rango altura y ancho => rectangle.botton > circle.top && rectangle.top < circle.top && circle.left < rectangle.right;
    return (
        rectangle.botton > circle.top &&
        rectangle.top < circle.top &&
        circle.left < rectangle.right
    );
};

// Distance vector
// Math.sqrt(v1*v1 + v2*v2) === Math.hypot(v1, v2)
const distanceCalc = (p1, p2) => {
    let d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    return d.toFixed(1);
};

const drawCircle = (circleOjt) => {
    ctx.beginPath();
    ctx.lineWidth = "0";
    ctx.arc(circleOjt.x, circleOjt.y, circleOjt.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circleOjt.color;
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(circleOjt.text, circleOjt.x, circleOjt.y)
    ctx.closePath();
};

// Draw bar rectagle
const drawRectagle = (rectangleObj) => {
    ctx.beginPath();
    ctx.lineWidth = "0";
    ctx.fillStyle = rectangleObj.color;
    ctx.rect(rectangleObj.x, rectangleObj.y, paddleWidth, rectangleObj.height);
    ctx.fill();
};

// Draw Text
const drawText = (text, loc, color = "white") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 20px Montserrat";
    ctx.fillText(text, loc.x, loc.y);
};

//punto medio entre dos puntos
const middlepoint = (pA, pB) => {
    ctx.beginPath();
    let midel = (pA.x - pB.x) / 2;
    let sizerectangle = 10;
    ctx.rect(pB.x - sizerectangle / 2 + midel, pA.y, sizerectangle, 10);
    ctx.lineWidth = 2;
    ctx.fillStyle = "#AD5C40";
    ctx.fill();
    ctx.stroke();
};

// Average
const average = (p1, p2) => {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
};

// Upsdate loop
const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("mousemove", (event) => {
        event.preventDefault();
        paddeluser.y = event.clientY - paddleHeight * 0.5;
    });
    linesBetwenPoints({ x: canvas.width / 2, y: 0 }, { x: canvas.width / 2, y: canvas.height }, "white", 1);
    linesBetwenPoints({ x: 0, y: canvas.height / 2 }, { x: canvas.width, y: canvas.height / 2 });
    linesBetwenPoints(ball, circle, "orange");
    drawText(distanceCalc(ball, paddeluser), average(ball, paddeluser), (color = "red"));
    drawText(distanceCalc(ball, circle), average(ball, circle), (color = "orange"));
    drawText(speed, score, "peru");
    drawRectagle(paddeluser);
    x += mx;
    y += my;
    ball.y += ball.velocitiY;
    ball.x += ball.velocitiX;
    if (circlesColision(ball, circle)) { ball.radius = radio * r };
    drawCircle(ball);
    drawCircle(circle);
    if (paddelColision(paddeluser, ball) === true) {
        //canvas.style = "background-color: green";
        ball.color = "green";
        speed++;
        console.log(speed);
        ball.velocitiX = speed;
        paddeluser.height -= 30;
    }
    // Top range movement left to rigth
    if (ball.x > canvas.width - radio) {
        ball.velocitiX = -speed;
        console.log(speed);
    }
    // Top range movement rigth to left
    if (ball.x < 0 + radio) {
        restart();
    }
    if (ball.y < 0 + radio) {
        ball.velocitiY = speed;
    }
    if (ball.y > canvas.height - radio) {
        ball.velocitiY = -2;
    }
    if (paddelColision(paddeluser, circle) === true) {
        //canvas.style = "background-color: orange";
        ball.color = "green";
        //speed++;
        //ball.velocitiX = speed;
        paddeluser.height += 25;
    }
    circle.x = x;
    circle.y = y;
    if (circle.x > canvas.width - radio) {
        mx = -mx
    }
    if (circle.x < 0 + radio) {
        mx = 2;
    }
    if (circle.y < 0) {
        my = -my;
    }
    if (circle.y > canvas.height - radio) {
        my = -2;
    }

    requestAnimationFrame(animation);
};

animation();

//x,y ramdom en restar >1/4 del tablero
//Añadir score
//Keypress help and draw linebetewnpaddeluser and ball if wemake a lot of balls