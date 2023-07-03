const row = 5;
const col = 6;

const hr = [1, [1, 1], [1, 2], 3, 4];
const vr = [[3, 1], 2, 3, 4];

const Display = (row, col) => {
    // create a grid
    for (let i = 0; i < row; i++){
        let r = document.createElement("tr");
        for(let j = 0; j < col; j++){
            let c = document.createElement("td");


            if(i == 0 && j != 0){
                c.textContent = hr[j-1];
                c.classList.add("horizontal_cell")
            }

            else if(j == 0 && i != 0){
                c.textContent = vr[i-1];
                c.classList.add("vertical_cell")
            }
            else{
                c.classList.add("normal_cell")
                c.id = `${i}${j}`;
            }

            
            // change color when click
            if (i != 0 && j != 0){
                c.addEventListener("click", function(){
                    if(this.style.backgroundColor == "black"){
                        this.style.backgroundColor = "white";
                    }
                    else{
                    this.style.backgroundColor = "black";
                    }
                    });
            }


            r.appendChild(c);
        }

        
        let table = document.getElementById("table");
        table.appendChild(r);
    }


}


const check = () =>{
    // produce 2d array that represent white and black, click by the user, white 0, black 1
    // check against the real solution
    
    const array = [];
    for (let i = 1; i < row; i++){
        array[i] = [];
        for (let j = 1; j < col; j++){
            let d = document.getElementById(`${i}${j}`);
            if (d.style.backgroundColor == "black"){
                array[i][j] = 1;
            }
            else{
                array[i][j] = 0;
            }
            
        }
    }

    // check against the real solution
    // write code here



    console.log(array);
    
    console.log("click");
    return 0;
}

function generateCombination(length, input){
    // generate combination of 0, 1 given length of array and length of the boxes
    const combinations = [];
    const array = Array(length).fill(0);

    for(let i = 0; i <= length - input ; i++){
        const combination = array.slice();

        for(let j = i; j < i+input ; j++){
            combination[j] = 1;
        }

        combinations.push(combination);
    }

    return combinations;

    // desire output, when (10, 7)
    // [1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    // [0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    // [0, 0, 1, 1, 1, 1, 1, 1, 1, 0]
    // [0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
}

const solver = (hr, vr) => {
    // Function for solving the puzzle
    // Step 1 create a 2d array with 0, row of 4 and column of 5
    const solution = []

    const r = vr.length; //4
    const c = hr.length; //5

    for(let i = 0; i < r; i++){
        solution[i] = [];
        for (let j = 0; j < c; j++){
            solution[i][j] = 0;
        }
    }

    // Step 2 check each row and column for guarantee cell, 
    // Scenario 1, when the clue > 1/2 * available cell, for single number, find overlap cell
    for(let i = 0; i < r; i++){
        let clue = vr[i];
        if (typeof clue == "number" && clue > c/2){

            let result_combination = generateCombination(c, clue);

            console.log(result_combination);
        } 
    }


    return 0;
}


const but = document.getElementById("submit");
but.addEventListener("click", check);

Display(row, col);

solver(hr, vr);