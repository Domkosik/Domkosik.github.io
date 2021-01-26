//---------------------------------------CREATE a GAME----------------------------------------------------------------------
class Game{
    constructor(){
        this.gameboard = document.getElementById('gameBoard');
        this.cells = document.getElementsByClassName('cell');
        this.overlay = document.getElementById('overlay');
        this.text = document.getElementById('text');
        this.player = "X";
        this.computer = "O";
        this.gameArr = ["", "", "", "", "", "", "", "", ""];
        this.winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        this.subTitle = document.getElementById('sub_title');
        this.email_name = document.getElementById("email");
        this.email_err = document.getElementById("email_err");
    }
    // write 'X' to the gameboard
    writeX = (e) => {
        let clicked = e.target; //find clicked element
        let clickedAttr = clicked.getAttribute('id'); //capture string with value of clicked ID
        let clickedCellIndex = parseInt(clickedAttr); // tranform that string to the number
        if(this.gameArr[clickedCellIndex] !== ""){
            return
        } else {
            this.gameArr[clickedCellIndex] = this.player;
            clicked.innerHTML = this.player;
            setTimeout( () => {
                this.writeO();
                this.result();
            }, 100);
        }
    }
    // write 'O' to the gameboard (randomly by computer)
    writeO = () => {
        let randomNumberOfCells = Math.floor(Math.random()*this.gameArr.length); // random generated number: 0 - 8 
        let randomCell = document.getElementById(randomNumberOfCells); // random Cell Element 0 - 8 
            if (randomCell.innerText !== ""){
                let newRandom = this.gameArr.indexOf(""); //get index
                let randomCell2 = document.getElementById(newRandom);
                    if(randomCell2 !== null){
                        this.gameArr[newRandom] = this.computer;
                        randomCell2.innerHTML = this.computer;
                    }
            } else{
                this.gameArr[randomNumberOfCells] = this.computer;
                randomCell.innerHTML = this.computer;
            }
    }
    // check who wins
    result = () => {
        let roundWonPlayer = false;
        let roundWonComputer = false;
        let roundDraw = !this.gameArr.includes("");
        let roundContinuing = false;
            for (let i = 0; i < this.winConditions.length; i++) {
                const victoryCondition = this.winConditions[i];
                let a = this.gameArr[victoryCondition[0]];
                let b = this.gameArr[victoryCondition[1]];
                let c = this.gameArr[victoryCondition[2]];
                if (a === "" || b === "" || c === "") {
                    continue;
                }
                if (a === b && b === c && c === this.player) {
                    roundWonPlayer = true;
                    break;
                }
                if (a === b && b === c && c === this.computer){
                    roundWonComputer = true;
                    break;
                }
            }
            if (roundWonPlayer) {
                this.text.innerHTML = "YOU WON!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('win').play();
                return roundWonPlayer;
            } else if(roundWonComputer){
                this.text.innerHTML = "Computer WON!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('lose').play();
                return roundWonComputer;
            }
            else if(roundDraw) {
                this.text.innerHTML = "It's draw!" //push text to the element
                this.overlay.style.display = "block";
                document.getElementById('draw').play();
                return roundDraw;
            } else {
                roundContinuing = true;
                return roundContinuing;
            }
    }
    // hide overlay
    closeOverlay = () => {
        this.overlay.style.display = "none";
    }
    // reset the game
    resetGame = () => {
        this.gameArr = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < this.cells.length; i++){
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
    // function: email Validation
    emailValidation = (event) => {
        const key = event.key; // "a", "1", "Shift", etc.
        const mailformat = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
        const email_value = this.email_name.value;
        if(!email_value.match(mailformat)){ 
            this.email_err.textContent = "*This is not valid email format.";
            this.email_err.style.color = "#FF0000";
        } else {
            this.email_err.textContent = "*Valid email format";
            this.email_err.style.color = "#00AF33";
        }
    };
    // run methods on user's interaction
    playGame = () => {
        this.gameboard.addEventListener('click', this.writeX);
        this.gameboard.addEventListener('click', this.subFuncToResetAnimation);
        this.overlay.addEventListener("click", this.setAnimationAfterReset);
        this.overlay.addEventListener('click', this.closeOverlay);
        this.overlay.addEventListener('click', this.resetGame);
        window.addEventListener("load", this.setAnimationSubTitle);
        this.email_name.addEventListener("blur", this.emailValidation);
    }
}
// make the game playable!
const go = new Game();
go.playGame();
