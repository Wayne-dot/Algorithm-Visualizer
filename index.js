let row = 3
let col = 3;


for (let i = 0; i < row; i++){
    let r = document.createElement("tr");
    for(let j = 0; j < col; j++){
        let c = document.createElement("td");
        r.appendChild(c);
    }

    let table = document.getElementById("table");
    table.appendChild(r);
}