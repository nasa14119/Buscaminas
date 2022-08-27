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
    for (let i = 0; i < bombas; i++) {
        let randomNumber = getRandomNumber(1,total_botones);
        let Lugardebomba_id = board[randomNumber];
        let lugardelabomba = document.getElementById(Lugardebomba_id)
        lugardelabomba.removeEventListener('click', addflag);
        bombasocultas.push(randomNumber); 
        lugardelabomba.addEventListener('click', bombexploation);
    }
    mapOfBombs()
    display_bombasrestantes(); 
}
function mapOfBombs() {
    let i = 0;
    let x = 0; 
    let bombas = bombasocultas.sort((a,b)=>a-b); 
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
    // console.table(arry)

    while(line !== fila){
        for (let column = 0; column < columna; column++){
            let item = arry[line][column]
            let left = column -1; 
            let right = column + 1;
            let up = line -1 ; 
            let bottom = line + 1; 
            if(item === "x"){
                // console.log({line,column})
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
function display_bombasrestantes(){
    let x = document.getElementById('display_bombasrestantes')
    x.innerHTML = bombasrestantes;
}
function message(params) {
    let h2 = document.getElementById('message'); 
    h2.innerHTML = params; 
}