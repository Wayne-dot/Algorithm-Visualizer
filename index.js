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
    for (let i = 0; i < row; i++){
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

    // desire output, when (5, 3)
    // [1, 1, 1, 0, 0]
    // [0, 1, 1, 1, 0]
    // [0, 0, 1, 1, 1]

    // output
    // [0, 0, 1, 0, 0]

    // 00, 10, 20,   01, 11, 21

    let final = [];

    for(let i = 0; i < length; i++){
        let cout = [];
        for(let j = 0; j < combinations.length; j++){
            cout.push(combinations[j][i]);
        }

        let real = true;
        for(let a = 0; a < cout.length; a++){
            if(cout[a] == 0){
                real = false;
            }
        }

        if(real){
            final.push(1);
        }
        else{
            final.push(0);
        }
    }

    return final;
}


function fillin(select_row, array){
    // (selected row, [0, 0, 1, 0, 0])
    for (let i = 0; i < row-1; i++){
        if(i == select_row){
            for(let j = 0; j < array.length; j++){
                if (array[j] == 1){
                    let fill = document.getElementById(`${i+1}${j+1}`);
                    fill.style.backgroundColor = "black";
                }
            }
        }
    }

}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fit = (selected_row, clue_array) =>{
    // (#, [3, 1])
    // return [1, 1, 1, 0, 1]

    let row_fit = []
    for (let i = 0; i < row-1; i++){
        if(i == selected_row){
            for(let j = 0; j < col-1 ; j++){
                row_fit.push(0);
            }
        }
    }

    console.log(row_fit);

    for(let i = 0; i < clue_array.length; i++){
        let number = clue_array[i];
        
    }


}


const solver = async (hr, vr) => {
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

            // delay the function of fillin for about 2 seconds, then execute the function, to show the animation
            // First delay for 0.5 seconds, then fill in avaliable cell
            await delay(500);
            await fillin(i, result_combination);

            console.log(i);
            console.log(result_combination);
        }

        else if(Array.isArray(clue)){
            let sum = 0
            let cout = 0;
            for(let i = 0; i < clue.length; i++){
                sum += clue[i];
                cout += 1;
            }
            let final = sum + cout - 1;
            
            // if space in between + fill cell = number of avaliable row cell
            if(final == hr.length){
                console.log("fit");
                console.log(clue);
                fit(i, clue);
                // fit(i, clue), it will return expected [1, 1, 1, 0, 1]
                // fillin(i, [0, 1, 0...])
            }
            
        }

    }

    // Scenario 1, same, for column



    return 0;
}


const but = document.getElementById("submit");
but.addEventListener("click", check);

Display(row, col);

solver(hr, vr);