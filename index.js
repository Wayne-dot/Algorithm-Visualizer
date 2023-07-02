let row = 6;
let col = 6;

const hr = [3, 2, 2, 2, 4];
const vr = [2, 2, [1, 1], [3, 1], 3];


for (let i = 0; i < row; i++){
    let r = document.createElement("tr");
    for(let j = 0; j < col; j++){
        let c = document.createElement("td");
        r.appendChild(c);
    }

    let table = document.getElementById("table");
    table.appendChild(r);
}

