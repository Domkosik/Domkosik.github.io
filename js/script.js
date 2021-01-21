//---------------------------------------CREATE a GAME----------------------------------------------------------------------
class Game{
    constructor(){
        this.gameboard = document.getElementById('gameBoard');
        this.result = document.getElementById('gameStatus');
        this.cells = document.getElementsByClassName('cell');
        this.cell0 = document.getElementById('0');
        this.overlay = document.getElementById('overlay');
        this.text = document.getElementById('text');
        this.gameArr = ["", "", "", "", "", "", "", "", ""];
        this.winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        this.subTitle = document.getElementById('sub_title');
    }
    // write 'X' to the gameboard
    writeX = (e) => {
        let clicked = e.target; //find clicked element
        let clickedAttr = clicked.getAttribute('id'); //capture string with value of clicked ID
        let clickedCellIndex = parseInt(clickedAttr); // tranform that string to the number
        if(this.gameArr[clickedCellIndex] !== ""){
            return
        } else {
            this.gameArr[clickedCellIndex] = "X";
            clicked.innerHTML = "X";
            this.writeO();
        }
    }
    // write 'O' to the gameboard (randomly by computer) & make decision if the game ends with victory or draw
    writeO = () => {
        let randomNumberOfCells = Math.floor(Math.random()*this.gameArr.length); // random generated number: 0 - 8 
        let randomCell = document.getElementById(randomNumberOfCells); // random Cell Element 0 - 8 
        let roundDraw = !this.gameArr.includes("");
            if (randomCell.innerText === "X" || randomCell.innerText === "O" ){
                let newRandom = this.gameArr.indexOf(""); //get index
                let randomCell2 = document.getElementById(newRandom);
                    if(randomCell2 !== null){
                        this.gameArr[newRandom] = "O";
                        randomCell2.innerHTML = "O";
                    }
            } else{
                this.gameArr[randomNumberOfCells] = "O";
                randomCell.innerHTML = "O";
            }
        let roundWonPlayer = false;
        let roundWonComputer = false;
            for (let i = 0; i <= 7; i++) {
                const victoryCondition = this.winConditions[i];
                let a = this.gameArr[victoryCondition[0]];
                let b = this.gameArr[victoryCondition[1]];
                let c = this.gameArr[victoryCondition[2]];
                if (a === "" || b === "" || c === "") {
                    continue;
                }
                if (a === b && b === c && c === "X") {
                    roundWonPlayer = true;
                    break;
                }
                if (a === b && b === c && c === "O"){
                    roundWonComputer = true;
                    break
                }
            }
            if (roundWonPlayer) {
                this.text.innerHTML = "YOU WON!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('win').play();
                return;
            } else if(roundWonComputer){
                this.text.innerHTML = "Computer WON!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('lose').play();
                return;
            }
            if (roundDraw) {
                this.text.innerHTML = "It's draw!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('draw').play();
                return;
            }
    }
    // hide overlay
    closeOverlay = () => {
        this.overlay.style.display = "none";
    }
    // reset the game
    resetGame = () => {
        this.gameArr = ["", "", "", "", "", "", "", "", ""];
        for (let i =0; i < this.cells.length; i++){
            this.cells[i].innerHTML = "";
        }
    }
    // animate cells to perform reset more realistic
    setAnimationAfterReset = () => {
        for(let i = 0; i < this.cells.length; i++){
            let cells = this.cells[i];
            cells.classList.add('animate__flip');
            cells.style.setProperty('animation-name', 'flip');
            cells.style.setProperty('animation-duration', '0.5s');
        }
    }
    // delete class for re-animate cells after reset
    subFuncToResetAnimation = () => {
        const arr = Array.from(this.cells);
        arr.forEach(element => {
            if (element.classList.contains('animate__flip')){
            element.classList.remove('animate__flip');
            element.style.removeProperty('animation-name', 'flip');
            element.style.removeProperty('animation-duration', '0.5s');
        }});
    }
    // setTimeout animation on #sub_title
    setAnimationSubTitle = () => {
        setTimeout(() => {
            this.subTitle.classList.remove('animate__rollIn');
            this.subTitle.classList.add('animate__rollOut');
            this.subTitle.style.setProperty('animation-name', 'rollOut');
            this.subTitle.style.setProperty('animation-duration', '1s');
            this.subTitle.style.setProperty('animation-fill-mode', 'forwards');}
            , 1300);
        setTimeout(()=>{this.subTitle.style.display = "none"}, 1600);
    }
    // run functions on user's click 
    playGame = () => {
        this.gameboard.addEventListener('click', this.writeX);
        this.gameboard.addEventListener('click', this.subFuncToResetAnimation);
        this.overlay.addEventListener("click", this.setAnimationAfterReset);
        this.overlay.addEventListener('click', this.closeOverlay);
        this.overlay.addEventListener('click', this.resetGame);
        window.addEventListener("load", this.setAnimationSubTitle);
    }
}
// make the game playable!
const go = new Game();
go.playGame();
// function: email Validation
        var email_name = document.getElementById("email");

        function emailValidation(event){
            var key = event.key; // "a", "1", "Shift", etc.
            var mailformat = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
            var email_value = email_name.value;

            if(!email_value.match(mailformat))
            { 
                document.getElementById("email_err").textContent = "*This is not valid email format.";
                document.getElementById("email_err").style.color = "#FF0000";
            } else 
            {
                document.getElementById("email_err").textContent = "*Valid email format";
                document.getElementById("email_err").style.color = "rgb(3 228 69)";
            }
        };
// run validation if user run out from input email element
document.getElementById("email").addEventListener("blur", emailValidation);
