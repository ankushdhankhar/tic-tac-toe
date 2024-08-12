
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainGame = document.querySelector(".maingame");

let turnO = true;
let buttonClicked = 0;

const winningPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

const newGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
    mainGame.classList.remove("hide");
    buttonClicked = 0;

    // Remove any existing lines
    const existingLine = document.querySelector(".line");
    if (existingLine) existingLine.remove();
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();

        buttonClicked++;
        if (buttonClicked === 9) {
            drawGame();
        }
    });
});

const drawGame = () => {
    msg.innerText = `The Game was Draw`;
    msgContainer.classList.remove("hide");
    mainGame.classList.add("hide");
};

const disabledBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enabledBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congrats, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    mainGame.classList.add("hide");
    disabledBoxes();
};

const checkWinner = () => {
    winningPatterns.forEach((pattern) => {
        const [a, b, c] = pattern;
        const boxA = boxes[a];
        const boxB = boxes[b];
        const boxC = boxes[c];

        if (boxA.innerText && boxA.innerText === boxB.innerText && boxA.innerText === boxC.innerText) {
            console.log("winner", boxA.innerText);
            drawWinningLine(pattern);

            // Delay showing the winner screen by 1.3 second
            setTimeout(() => {
                showWinner(boxA.innerText);
            }, 1300);
        }
    });
};

const drawWinningLine = (pattern) => {
    const line = document.createElement("div");
    line.classList.add("line");
    document.querySelector(".container").appendChild(line);

    const boxA = boxes[pattern[0]];
    const boxC = boxes[pattern[2]];

    const rectA = boxA.getBoundingClientRect();
    const rectC = boxC.getBoundingClientRect();

    line.style.left = `${rectA.left + rectA.width / 2}px`;
    line.style.top = `${rectA.top + rectA.height / 2}px`;

    const distance = Math.sqrt(
        Math.pow(rectC.left - rectA.left, 2) + Math.pow(rectC.top - rectA.top, 2)
    );

    line.style.width = `${distance}px`;

    const angle = Math.atan2(rectC.top - rectA.top, rectC.left - rectA.left) * (180 / Math.PI);
    line.style.transform = `rotate(${angle}deg)`;
};

newGameBtn.addEventListener("click", newGame);
resetButton.addEventListener("click", newGame);
