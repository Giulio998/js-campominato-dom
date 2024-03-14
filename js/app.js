


function startGame() {
        
    document.getElementById("score-container").innerHTML = "";
    const grid = document.getElementById("grid");
    grid.innerHTML = "" ; 
    const size = parseInt(document.getElementById("difficolta").value)
    const numCells = size ** 2 ;
    const requiredBombs = 16 ;
    const bombsArray = [];
    const safeCells = numCells - requiredBombs
    let clickedBombCounter = 0
    let score = 0

    function gridGenerator() {
        for (let i = 0; i < numCells; i++) {
            const num = i + 1;
            const cell = document.createElement("div");
            cell.classList.add("cell") ;
            if (size == 10) {
                cell.classList.add("cell10")
            } else if (size == 9) {
                cell.classList.add("cell9")
            } else {
                cell.classList.add("cell8")
            }
    
            cell.innerHTML = num ;
            grid.append(cell);
            cell.addEventListener("click", function() {
                boxToggle( cell)           
            });
        }   
    }
    
    let cellsArray = document.getElementsByClassName("cell")
    
    gridGenerator()

    function bombNumberGenerator() {
        let isBombNumberUsed = false
     
         while (bombsArray.length < requiredBombs ) {
             bomb = Math.floor(Math.random() * numCells) + 1;
             if (bombsArray.includes(bomb)) {
                 isBombNumberUsed = true
             } else {
                 isBombNumberUsed = false
             }
 
             if (isBombNumberUsed === false) {
                 bombsArray.push(bomb)
             }     
         }    
     }
 
     bombNumberGenerator() 
    

     

    function bombSettings() {
        for (let i = 0; i < bombsArray.length; i++) {
            let bombCell = cellsArray[bombsArray[i]];
            if (bombCell) {
                bombCell.classList.add("bomb");
                bombCell.addEventListener("click", function() {
                let isBombClicked = bombCell.classList.contains("clicked-bomb")
                if (!isBombClicked) {
                    bombCell.classList.toggle("clicked-bomb");
                    clickedBombCounter++
                    document.getElementById("score-container").innerHTML = `<p>HAI PERSO;</p> 
                                                                            <p> PUNTEGGIO: ${score}</p> `
                    let bombCellsArray = document.getElementsByClassName("bomb");
                    for (let j = 0; j < bombCellsArray.length; j++) {
                        bombCellsArray[j].classList.add("clicked-bomb")
                    }
                }        
            });
            }
            
        }   
    }

    bombSettings()
    
    function boxToggle( cell) {
        const isClicked = cell.classList.contains("clicked")
        const isBomb = cell.classList.contains("bomb")
        if (!isClicked && !isBomb && score < safeCells && clickedBombCounter == 0) {
            score++
            document.getElementById("score-container").innerHTML = `<p> PUNTEGGIO: ${score}</p> `
            cell.classList.add("clicked");
            cell.classList.toggle("bg-blue");
            if (score == safeCells) {
                document.getElementById("score-container").innerHTML = `<p>HAI VINTO;</p> 
                                                                        <p> PUNTEGGIO: ${score}</p> `
            }
        } 
    }   


    }






document.getElementById("play").addEventListener("click", startGame)



