// MODULE 1
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const circles = [
    {x:50, y:50, radius:30, color: 'red', hit: false},
    {x:50, y:50, radius:30, color: 'green', hit: false},
    {x:50, y:50, radius:30, color: 'blue', hit: false},
    {x:50, y:50, radius:30, color: 'yellow', hit: false}
];

function drawCircles() {

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.hit ? 'gray': circle.color;
        ctx.fill();
        ctx.closePath();
    });
}

function drawArrows() {

    circles.forEach((circle, index) => {
        const arrowX = 150;
        const arrowY = circle.y;
        ctx.beginPath();
        ctx.moveTo(circle.x + circle.radius + 10, circle.y);
        ctx.lineTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 10, arrowY - 5);
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 10, arrowY + 5);
        ctx.stroke();
        ctx.closePath();
    });
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircles();
    drawArrows();
}

draw();

// MODULE 2
const arrowX = 150;
const speed = 2;

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    circles.forEach(circle => {
        const dist = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (dist < circle.radius) {
            moveArrowToCircle(circle);
        }
    });
});

function moveArrowToCircle(circle) {
    const arrowY = circle.y;
    const arrowInterval = setInterval(() => {
        if (arrowX > circle.x + circle.radius) {
            arrowX -= speed;
            draw();
        } else {
            clearInterval(arrowInterval);
            circle.hit = true;
            draw();
        }
    }, 20);
}

document.getElementById('resetButton').addEventListener('click', function () {
    circles.forEach(circle => {
        circle.hit = false; 
    });
    draw(); 
});

draw();