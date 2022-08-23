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
let bombasocultas = [] 
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
    console.table(bombasocultas)
    display_bombasrestantes(); 
} 
function bombexploation(event) {
    let actualbtn = document.getElementById(event.target.id)
    if (actualbtn.innerHTML !== imgbandera){
        console.log(actualbtn.innerHTML)
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