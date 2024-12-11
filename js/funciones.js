//Variables globales
const d = document;
let nameImg = [];
let imageID = []; 
let board = d.querySelector(".board");
let time = 60;
let points = 0;
let attempts = 0;
let level = 1;
let totalAttempts = 0;
let totalTime = 0;
let timeLeft = 0;
let showLevel = d.querySelector(".level");
let showAttempts = d.querySelector(".attempts");
let showPoints = d.querySelector(".points");
let showTime= d.querySelector(".time");
let points2;
let showPoints2 = d.querySelector(".points2")
let timePassed;
let imgLevel;
let playing = false;
let titles =  d.querySelectorAll(".title");
let ocultarImg;
let ganarImg;
let btn = d.querySelector(".btn-start");
let sonidoSeleccionar = new Audio("./sounds/seleccion.mp3");
let sonidoFallar= new Audio ("./sounds/lose.mp3");
let sonidoGanar = new Audio ("./sounds/correct.mp3");
let sonidoEmpezar = new Audio ("./sounds/game-start.mp3");
let sonidoVictoria = new Audio ("./sounds/win.mp3");
let sonidoDerrota = new Audio ("./sounds/derrota.mp3");
let sonidoTiempo = new Audio ("./sounds/clock.mp3");
let sonidoBackground = new Audio ("./sounds/soundtrack.mp3");
    sonidoBackground.loop = true;
let mostrarJugador = d.getElementsByClassName("player");
let tabla = d.querySelector(".records tbody");
let imgLevel1 = [
    {name: "mushroom", url:"img/mario1.jpg"},
    {name: "egg", url:"img/egg.jpg"},
    {name: "boomerang", url:"img/boomerang.jpg"},
    {name: "onion", url:"img/mario4.jpg"},
    {name: "banana", url:"img/mario5.jpg"},
    {name: "flower", url:"img/mario6.jpg"},
    {name: "mushroom", url:"img/mario1.jpg"},
    {name: "egg", url:"img/egg.jpg"},
    {name: "boomerang", url:"img/boomerang.jpg"},
    {name: "onion", url:"img/mario4.jpg"},
    {name: "banana", url:"img/mario5.jpg"},
    {name: "flower", url:"img/mario6.jpg"}
];
let imgLevel2 = [
    {name: "bone", url:"img/bone.jpg"},
    {name: "goomba", url:"img/goomba.jpg"},
    {name: "ghost", url:"img/mario2.jpg"},
    {name: "plant", url:"img/plant.jpg"},
    {name: "rock", url:"img/rock.jpg"},
    {name: "turtle", url:"img/turtle.jpg"},
    {name: "bomb", url:"img/bomb.jpg"},
    {name: "bullet", url:"img/bullet.jpg"},
    {name: "bone", url:"img/bone.jpg"},
    {name: "goomba", url:"img/goomba.jpg"},
    {name: "plant", url:"img/plant.jpg"},
    {name: "rock", url:"img/rock.jpg"},
    {name: "turtle", url:"img/turtle.jpg"},
    {name: "bomb", url:"img/bomb.jpg"},
    {name: "bullet", url:"img/bullet.jpg"},
    {name: "ghost", url:"img/mario2.jpg"}
];
let imgLevel3 = [
    {name: "mushroom2", url:"img/princess.jpg"},
    {name: "leaf", url:"img/princess1.jpg"},
    {name: "crown", url:"img/princess2.jpg"},
    {name: "peach", url:"img/princess3.jpg"},
    {name: "star", url:"img/princess4.jpg"},
    {name: "toadette", url:"img/princess5.jpg"},
    {name: "bell", url:"img/princess6.jpg"},
    {name: "egg", url:"img/princess7.jpg"},
    {name: "flower", url:"img/princess8.jpg"},
    {name: "heart", url:"img/princess9.jpg"},
    {name: "toadette", url:"img/princess5.jpg"},
    {name: "bell", url:"img/princess6.jpg"},
    {name: "egg", url:"img/princess7.jpg"},
    {name: "flower", url:"img/princess8.jpg"},
    {name: "heart", url:"img/princess9.jpg"},
    {name: "mushroom2", url:"img/princess.jpg"},
    {name: "leaf", url:"img/princess1.jpg"},
    {name: "crown", url:"img/princess2.jpg"},
    {name: "peach", url:"img/princess3.jpg"},
    {name: "star", url:"img/princess4.jpg"}
];
    d.addEventListener("DOMContentLoaded", ()=>{
        mostrarDatos();
    })
    

    btn.addEventListener("click", function(){
        sonidoEmpezar.play();
        if(playing == false && level == 1){
            ventanaModal();
        }else if(playing == false && level == 2){
            playing = true;
            level2();
        }else if(playing == false && level == 3){
            playing = true;
            level3();
    }
    });

function addImg(){
        if (level == 1) {
            imgLevel = imgLevel1;
            ocultarImg = "img/ocultarN.png"; 
            ganarImg = "img/star.jpg"
        } else if (level == 2) {
            imgLevel = imgLevel2;
            ocultarImg = "img/ocultarM.jpg"; 
            ganarImg = "img/star2.jpg"
        } else if (level == 3) {
            imgLevel = imgLevel3; 
            ocultarImg = "img/ocultarO.jpg"; 
            ganarImg = "img/star3.jpg"
        }

    imgLevel.sort(() => Math.random() - 0.5);

    imgLevel.forEach((img, i)=>{
        let div = d.createElement("div");
        div.className = "col-3";
        let image = d.createElement("img");
        image.src = ocultarImg;
        image.className = "img-fluid margin";
        image.id = i;
        image.addEventListener("click", showImg);
        div.appendChild(image);
        board.appendChild(div);
    });
   
};

//funcion para mostrar las imagenes ocultas 
function showImg(){
    sonidoSeleccionar.play();
    let imgID = this.getAttribute("id")
    this.src = imgLevel[imgID].url;
    //guardar los nombres de imagen 
    nameImg.push(imgLevel[imgID].name);
    //guardar los id de imagenes 
    imageID.push(imgID);
    //activar la funcion de comparar imagenes
    if(nameImg.length == 2){
        setTimeout(compareImg, 300);    
    }
}

//funcion para comparar imagenes
function compareImg(){
    let allImg = d.querySelectorAll(".board .col-3 img");

    //verificar si las imagenes son iguales 
    if(nameImg[0] == nameImg[1]){
        if(imageID[0]!= imageID[1]){
        sonidoGanar.play();
        allImg[imageID[0]].src = ganarImg;
        allImg[imageID[1]].src = ganarImg;
        allImg[imageID[0]].removeEventListener("click", showImg);
        allImg[imageID[1]].removeEventListener("click", showImg);
        points++
        showPoints.textContent = points;
        }else{
        alert("Choose another image!")
        allImg[imageID[0]].src = ocultarImg;
        } 
    }else{
        sonidoFallar.play();
        allImg[imageID[0]].src = ocultarImg;
        allImg[imageID[1]].src = ocultarImg;
        attempts++;
        showAttempts.textContent = attempts;
    }
    //reiniciar las variables
    nameImg = [];
    imageID = [];

    //Funcion para cambiar color
    function changeTitleColors() {
        const titles = document.querySelectorAll('.title');
        titles.forEach(title => {
            title.style.color = '#e34b05';
            btn.style.background = "#e34b05"
        });
    }

    function changeTitleColors2() {
        const titles = document.querySelectorAll('.title');
        titles.forEach(title => {
            title.style.color = '#f094a6'
            btn.style.background = "#f094a6"
        });
    }

    if (level == 1 && points == 6) {
        sonidoTiempo.pause();
        totalAttempts += attempts;
        totalTime += time;
        timeLeft += (60 - time);
        obtenerDatos();
        sonidoVictoria.play();
        Swal.fire({
            title: "Congratulations! You passed to the next level",
            width: 600,
            padding: "3em",
            color: "#89b5d6c3",
            background: "#fff url(./img/gif confetti.gif)",
            backdrop: `
                #89b5d68e
                url("./img/gif confetti.gif")
                left top
                no-repeat
            `,
            confirmButtonText: 'Ok !',
            customClass: {
                confirmButton: 'custom-confirm-button1'
            }
        })
        level++;
        showLevel.textContent = level;
        attempts = 0;
        showAttempts.textContent = attempts;
        points = 0;
        showPoints.textContent = points;
        points2 = 0;
        showPoints2.textContent = `/8`;
        clearInterval(timePassed);
        time = 50;
        0;
        showTime.textContent = time;
        playing = false;        
        deleteImg();
        changeTitleColors();

    }else if (level == 2 && points == 8){
        sonidoVictoria.play();
        Swal.fire({
            title: "Congratulations! You passed to the next level",
            width: 600,
            padding: "3em",
            color: "#e34b05",
            background: "#fff url(./img/gif confetti.gif)",
            backdrop: `
                #e34b05c0
                url("./img/gif confetti.gif")
                left top
                no-repeat
            `,
            confirmButtonText: 'Ok !',
            customClass: {
                confirmButton: 'custom-confirm-button2'
            }
        })
        sonidoTiempo.pause();
        level++;
        showLevel.textContent = level;
        attempts = 0;
        showAttempts.textContent = attempts;
        points = 0;
        showPoints.textContent = points;
        showPoints2.textContent = `/10`;
        clearInterval(timePassed);
        time = 90;
        showTime.textContent = time;
        playing = false;        
        deleteImg();   
        changeTitleColors2();
       
    }
    if (level === 3 && points === 10) {
        console.log("Nivel 3 completado");
        sonidoTiempo.pause();
        sonidoVictoria.play();
    
        Swal.fire({
            title: "Congratulations! You passed the game :D",
            width: 600,
            padding: "3em",
            color: "#ff355d",
            background: "#fff url(./img/balloons.gif)",
            backdrop: `
                #f094a6d2
                url("./img/balloons.gif"),
                left top
                no-repeat
            `,
            confirmButtonText: 'Restart Game',
            customClass: {
                confirmButton: 'custom-confirm-button3'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Reiniciando juego después de victoria");
                sonidoVictoria.pause(); 
                sonidoVictoria.currentTime = 0;
                location.reload();
            }
        });
        clearInterval(timePassed);
    }
    

}

function level1(){
    addImg(); 
    showLevel.textContent = level;
    timePlaying();
}

function level2(){
    addImg(); 
    timePlaying();
}

function level3(){
    addImg(); 
    timePlaying();
}

function timePlaying() {
    showTime.style.color = "#000";
    showTime.style.fontSize = "16px"; 

    timePassed = setInterval(() => {
        time--;
        showTime.textContent = time;
        if (time == 11) {
            sonidoTiempo.play();
            alert("Go faster! Time is running out 🚨");
            showTime.style.color = "#f03d30"; 
            showTime.style.fontSize = "19px"; 
        } else if (time == 0 && points != 6) {
            sonidoDerrota.play();
            alert("Time is over! You lost :(");
            clearInterval(timePassed);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }, 1000);
}


function deleteImg(){
    let deleteImages = d.querySelectorAll(".board div img");
    deleteImages.forEach((img)=>{
        img.remove();
    })
};

function ventanaModal() {
    let modal = d.getElementById("exampleModal");
    let cerrarModal = d.querySelectorAll(".cerrar");
    let inputJugador = d.querySelector(".nombre-jugador");
    let btnJugador = d.querySelector(".registrar-jugador");
    let mostrarJugador = d.querySelector(".player");
    cerrarModal.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.classList.remove("show");
            modal.style.display = "none";
        });
    });

    modal.classList.add("show");
    modal.style.display = "block";

    btnJugador.addEventListener("click", () => {
        sonidoEmpezar.play();
        mostrarJugador.textContent = inputJugador.value;
        modal.classList.remove("show");
        modal.style.display = "none";
        playing = true;
        level1();
        sonidoBackground.play();
    });
}

