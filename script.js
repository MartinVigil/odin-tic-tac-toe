const chooses = document.querySelectorAll("td");
const container = document.querySelector(".container");
const winnerH1 = document.createElement("h1");
const resetBtn= document.createElement("button");
resetBtn.textContent = "Restart";

function handleClick(event) {
    game.playGame(event.target); 
}

chooses.forEach(choose => {
    choose.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", () => {
    container.removeChild(winnerH1);
    gameboard.board = [[" "," "," "],
                       [" "," "," "],
                       [" "," "," "]]; 
    chooses.forEach(choose => {
        choose.textContent = "" 
    })                  
    container.removeChild(resetBtn);
    chooses.forEach(choose => {
        choose.addEventListener("click", handleClick);
    });                       
})

const gameboard = (function () {
    const board = [[" "," "," "],
                   [" "," "," "],
                   [" "," "," "]];              
    return {board}              
})();

const computer = (function () {
    const hasEmptySpace = () => {
        for (let i = 0; i < gameboard.board.length; i++) {
            for (let j = 0; j < gameboard.board[i].length; j++) {
                if (gameboard.board[i][j] === " ") {
                    return true;
                }
            }
        }
        return false;
    }

    const choose = () => {
        let y = Math.floor(Math.random() * 3);
        let x = Math.floor(Math.random() * 3);
        while (gameboard.board[y][x] != " "){
            if(!hasEmptySpace()){
                break;
            }
            y = Math.floor(Math.random() * 3);
            x = Math.floor(Math.random() * 3);
        }  
        if(!hasEmptySpace()){
            return;
        }
        gameboard.board[y][x] = "O";
        document.querySelector(`[y="${y}"][x="${x}"]`).textContent = "O";
    }

    return {hasEmptySpace,choose};
})();

const game = (function () {
    const checkWinner = () =>{
        if(gameboard.board[0][0] == gameboard.board[0][1] && gameboard.board[0][0] == gameboard.board[0][2] && gameboard.board[0][0] != " " ||
           gameboard.board[1][0] == gameboard.board[1][1] && gameboard.board[1][0] == gameboard.board[1][2] && gameboard.board[1][0] != " " ||
           gameboard.board[2][0] == gameboard.board[2][1] && gameboard.board[2][0] == gameboard.board[2][2] && gameboard.board[2][0] != " " ||
           gameboard.board[0][0] == gameboard.board[1][0] && gameboard.board[0][0] == gameboard.board[2][0] && gameboard.board[0][0] != " " ||
           gameboard.board[0][1] == gameboard.board[1][1] && gameboard.board[0][1] == gameboard.board[2][1] && gameboard.board[0][1] != " " ||
           gameboard.board[0][2] == gameboard.board[1][2] && gameboard.board[0][2] == gameboard.board[2][2] && gameboard.board[0][2] != " " ||
           gameboard.board[0][0] == gameboard.board[1][1] && gameboard.board[0][0] == gameboard.board[2][2] && gameboard.board[0][0] != " " ||
           gameboard.board[0][2] == gameboard.board[1][1] && gameboard.board[0][2] == gameboard.board[2][0] && gameboard.board[0][2] != " "
        ){
            return true
        }else{
            return false
        }
    }

    const playGame = (choose) => {
        gameboard.board[parseInt(choose.getAttribute("y"))][parseInt(choose.getAttribute("x"))] = "X"
        choose.textContent = "X";
        if(checkWinner()){
            winnerH1.textContent = "you win! :)"
            container.appendChild(winnerH1);
            chooses.forEach(choose => {
                choose.removeEventListener("click", handleClick);
            });
            container.appendChild(resetBtn);
            return true;
        }
        computer.choose();
        if(checkWinner()){
            winnerH1.textContent = "computer wins! :("
            container.appendChild(winnerH1);
            chooses.forEach(choose => {
                choose.removeEventListener("click", handleClick);
            });
            container.appendChild(resetBtn);
            return true;
        }
    }

    return {checkWinner,playGame}
})();







