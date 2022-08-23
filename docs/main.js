// Variables Globales
var columna = 6; 
var fila = 6; 
var total_botones = 0;
const board = []; 
var bombas = 8;
var bombasrestantes;  
var banderas_puestas = 0; 
var bombasocultas = [] 
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
function addBombs(params) {
    bombas = params;
    // message('¨Cantidad de bombas = '+bombas)
    for (let i = 0; i < bombas; i++) {
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        let randomNumber = getRandomNumber(1,total_botones);
        let Lugardebomba_id = board[randomNumber];
        let lugardelabomba = document.getElementById(Lugardebomba_id)
        lugardelabomba.removeEventListener('click', addflag);
        bombasocultas.push(randomNumber); 
        lugardelabomba.addEventListener('click', bombexploation);
    }
    console.table(bombasocultas)
    display_bombasrestantes(); 
} 
function bombexploation(event) {
    let imgbomba = '<i class="fas fa-bomb"></i>'
    let actualbtn = document.getElementById(event.target.id)
    message('Perdiste')
    for (let i = 0; i < bombasocultas.length; i++) {
        let b = bombasocultas[i]
        let x = document.getElementById('button-'+b)
        x.innerHTML = imgbomba; 
    }
    for (let i = 1; i < board.length; i++) {
        let x = document.getElementById('button-'+i)
        x.removeEventListener('click', addflag); 
    }
    actualbtn.innerHTML = imgbomba; 
}
function addflag(event) {
    let bandera = '<i class="fas fa-flag"></i>'; 
    let boton_actual = document.getElementById(event.target.id);
    if (boton_actual.innerHTML == "&nbsp;") 
    { 
        boton_actual.innerHTML = bandera; 
        banderas_puestas++; 
        bombasrestantes--; 
        display_bombasrestantes();
        console.log (banderas_puestas + bombasrestantes) 
    } 
        else {boton_actual.innerHTML = '&nbsp;';banderas_puestas--;bombasrestantes++;display_bombasrestantes();console.log (banderas_puestas + bombasrestantes) } 
    if (bombasrestantes == banderas_puestas){
        for (let i = 1; i < board.length; i++) {
            let x = document.getElementById('button-'+i)
            x.removeEventListener('click', addflag); 
        }
    } else if (bombasrestantes > banderas_puestas){
        for (let i = 1; i < board.length; i++) {
            let x = document.getElementById('button-'+i)
            x.addEventListener('click', addflag); 
        }
    }
}
function Flag_logic() {
    for (let id = 1; id < total_botones; id++) {
        let actualbtn = document.getElementById("button-" + id);
        actualbtn.addEventListener('click', addflag);
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