let row = 6;
let col = 6;

const hr = [3, 2, 2, 2, 4];
const vr = [2, 2, [1, 1], [3, 1], 3];


for (let i = 0; i < row; i++){
    let r = document.createElement("tr");
    for(let j = 0; j < col; j++){
        let c = document.createElement("td");

        if(i == 0 && j != 0){
            c.textContent = hr[j-1];
            c.classList.add("horizontal_cell")
        }

        else if(j == 0 && i != 0){
            c.textContent = vr[i];
            c.classList.add("vertical_cell")
        }
        else{
            c.classList.add("normal_cell")
        }

        c.addEventListener("click", function(){
            if(this.style.backgroundColor == "black"){
                this.style.backgroundColor = "white";
            }
            else{
            this.style.backgroundColor = "black";
            }
        });

        r.appendChild(c);
    }

    let table = document.getElementById("table");
    table.appendChild(r);
}

