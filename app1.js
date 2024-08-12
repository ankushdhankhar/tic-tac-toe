// this is not linked  to html and in this code line is not formed through winning pattern


let boxes = document.querySelectorAll(".box") ;
let resetButton=document.querySelector("#resetButton") ;
let newGameBtn=document.querySelector("#new-btn") ;
let msgContainer=document.querySelector(".msg-container ") ;
let msg=document.querySelector("#msg")
let mainGame=document.querySelector(".maingame") ;

let turnO = true ;

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
] ;

const newGame=()=>{
    turnO = true ;
    enabledBoxes();
    msgContainer.classList.add("hide");
    mainGame.classList.remove("hide") ;
    buttonClicked=0 ;

}

let buttonClicked =0 ;

boxes.forEach((box)=>{
    box.addEventListener("click" ,()=> {
        console.log("box was clicked ")
        if(turnO){
            box.innerText="O" ;
            turnO = false ;
        }
        else{
            box.innerText="X" ;
           turnO = true ;        }

           box.disabled=true ;

           checkWinner();

           buttonClicked++;
           if(buttonClicked===9){
            drawGame() ;
           }
    })
}) 

const drawGame=()=>{
    msg.innerText=`The Game was Draw` ;
    msgContainer.classList.remove("hide") ;
    mainGame.classList.add("hide") ;

}


const disabledBoxes =()=>{
    for(box of boxes ){
        box.disabled = true ;
    }
}

const enabledBoxes =()=>{
    for(box of boxes ){
        box.disabled = false ;
        box.innerText="" ;
    }

}

const showWinner=(winner)=>{
    msg.innerText=`Congrats , winner is ${winner}` ;
    msgContainer.classList.remove("hide") ;
    mainGame.classList.add("hide") ;

    disabledBoxes() ;
}

const checkWinner =()=>{
    for(let pattern of winningPatterns){
         let pos1val = boxes[pattern[0]].innerText ;
         let pos2val = boxes[pattern[1]].innerText ;
         let pos3val = boxes[pattern[2]].innerText ;

         if(pos1val!='' && pos2val!='' && pos3val!='' ){
            if(pos1val===pos2val && pos2val===pos3val){
                console.log("winner" , pos1val) ;
                showWinner(pos1val) ;
            }
         }
    }
}



newGameBtn.addEventListener("click" , newGame) ;
resetButton.addEventListener("click" , newGame) ;

