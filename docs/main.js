// Variables Globales
let columna = 6; 
let fila = 6; 
let total_botones = 0;
const imgbomba = '<i class="fas fa-bomb"></i>'
const imgbandera = '<i class="fas fa-flag" aria-hidden="true"></i>'; 
const board = []; 
let bombas = 8;
let bombasrestantes;  
let banderas_puestas = 0; 
let bombasocultas = []; 
let arry = []; 
// Codigo central
window.addEventListener('DOMContentLoaded', main)
function main(){
    Tabla(); 
    Flag_logic();
    addBombs(bombas);
    setNumbers();
}
// Funciones
function display_bombas(params) {
    let label = document.getElementById('message_bomba'); 
    label.innerHTML = params; 
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function addBombs(params) {
    bombas = params;
    let randomNumber = [1]
    let i = 1
    while (i !== total_botones){
        randomNumber.push(randomNumber[i-1] +1)
        i++
    }
    let ranNums =[]
    let j = 0; 
    for (let i = 0; i <= bombas; i++) {
        j = getRandomNumber(1, randomNumber.length)
        ranNums.push(randomNumber[j]);
        randomNumber.splice(j,1);
    }
    for (let i = 0; i < bombas; i++) {
        let Lugardebomba_id = board[ranNums[i]];
        let lugardelabomba = document.getElementById(Lugardebomba_id)
        lugardelabomba.removeEventListener('click', addflag);
        bombasocultas.push(ranNums[i]); 
        lugardelabomba.addEventListener('click', bombexploation);
    }
    mapOfBombs()
    display_bombasrestantes(); 
}
function mapOfBombs() {
    let i = 0;
    let x = 0; 
    let bombas = bombasocultas.sort((a,b)=>a-b); 
    arry = []
    while(i !== fila){
        arry.push(Array(columna)); 
        for (let index = 0; index < columna; index++){
            x++
            arry[i][index] = x
            for (const key in bombasocultas) {
                if (arry[i][index] === bombasocultas[key]){
                    arry[i][index] = "x"
                }
            }
        }
        i++
    }
    arry = arry.map(
    (item)=> 
        item.map(
            (element) => element !== "x"?0:"x"
        )
    )
    let line = 0; 

    while(line !== fila){
        for (let column = 0; column < columna; column++){
            let item = arry[line][column]
            let left = column -1; 
            let right = column + 1;
            let up = line -1 ; 
            let bottom = line + 1; 
            if(item === "x"){
                //Left
                if(column >0){
                    if(line > 0){
                        arry[up][left] === "x"?"x": arry[up][left]++
                    }
                    arry[line][left] === "x"?"x":arry[line][left]++
                    if(line !== fila-1){
                        arry[bottom][left] === "x"?"x":arry[bottom][left]++
                    }
                }
                //Right
                if(column !== columna-1){
                    if(line > 0){
                        arry[up][right] === "x"?"x": arry[up][right]++
                    }
                    arry[line][right] === "x"?"x":arry[line][right]++
                    if(line !== fila-1){
                        arry[bottom][right] === "x"?"x":arry[bottom][right]++
                    }
                }
                //Up 
                if(line > 0){
                    arry[up][column] === "x"?"x": arry[up][column]++
                }
                //bottom
                if(line !== fila-1){
                    arry[bottom][column] === "x"?"x": arry[bottom][column]++
                }
            }
        }

        line++
    }
    console.table(arry)
} 
function bombexploation(event) {
    let actualbtn = document.getElementById(event.target.id)
    if (actualbtn.innerHTML !== imgbandera){
        actualbtn.innerHTML = imgbomba; 
        for (const i in bombasocultas) {
            let b = bombasocultas[i]
            let x = document.getElementById('button-'+b)
            x.innerHTML = imgbomba; 
        }
        for (let i = 1; i < board.length; i++) {
            let x = document.getElementById('button-'+i)
            x.removeEventListener('click', addflag); 
        }
        message('Perdiste')
    }
}
function addflag(event) {
    event.preventDefault(); // Para que no salga el contex menu 
    let boton_actual = document.getElementById(event.target.id);
    if (boton_actual.innerHTML == "&nbsp;") 
    { 
        boton_actual.innerHTML = imgbandera; 
        banderas_puestas++; 
        bombasrestantes--; 
        display_bombasrestantes();
    } 
        else {boton_actual.innerHTML = '&nbsp;';banderas_puestas--;bombasrestantes++;display_bombasrestantes(); } 
    if (bombasrestantes == banderas_puestas){
        for (let i = 1; i < board.length; i++) {
            let x = document.getElementById('button-'+i)
            x.removeEventListener('contexmenu', addflag); 
        }
    } else if (bombasrestantes > banderas_puestas){
        for (let i = 1; i < board.length; i++) {
            let x = document.getElementById('button-'+i)
            x.addEventListener('contexmenu', addflag); 
        }
    }
}
function Flag_logic() {
    for (let id = 1; id < total_botones; id++) {
        let actualbtn = document.getElementById("button-" + id);
        actualbtn.addEventListener('contextmenu', addflag);
        actualbtn.innerHTML = "&nbsp;";
        board[id] = actualbtn.id; 
    }
}
function Tabla() {
    bombasrestantes = bombas; 
    message('')
    bombasocultas = []; 
    let htmlContent = ""; 
    let Div_tablas = document.getElementById("table"); 
    let td_index = 1; 
    htmlContent += '<table id="table">'
        for (let i = 0; i <= fila-1; i++) {
            htmlContent += "<tr>"
                for (let i = 0; i <= columna-1; i++) {
                    htmlContent += "<td"; 
                        htmlContent += ' id="button-'; 
                        htmlContent += td_index + '"';
                        td_index++;   
                    htmlContent += "</td>";   
                }
            htmlContent += "</tr>"
        }
    htmlContent += "</table>"
    Div_tablas.innerHTML = htmlContent; 
    total_botones = td_index; 
}
function setNumbers(){
    let line = 0; 
    let count = 0;
    let z = [];  
    while(line!== fila){
        for (let column = 0; column < columna; column++){
            count++
            let arra = arry[line][column]
            let button = board[count]
            let element = document.getElementById(button)
            element.addEventListener("click", function(){
                handleClick(button,arra);
            }, false);
        }
        line++
    }
}  
function handleClick(id, bombsArround){
    element = document.getElementById(id)
    element.style.backgroundColor = "red"
    element.innerHTML = bombsArround
    // console.log(id, bombsArround)
}
function display_bombasrestantes(){
    let x = document.getElementById('display_bombasrestantes')
    x.innerHTML = bombasrestantes;
}
function message(params) {
    let h2 = document.getElementById('message'); 
    h2.innerHTML = params; 
}