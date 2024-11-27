let nombreJugador = document.querySelector(".player");
let listaJugadores = "jugadores";

function obtenerDatos (){
    let datosJugador ={ 
        "name" : nombreJugador.textContent,
        "attempts": totalAttempts,
        "totaltime": totalTime,
        "timeleft": timeLeft
    }
    console.log(datosJugador);
    guardarDatos(datosJugador);
}

function guardarDatos(datos){
    let jugadores = [];
    let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
    if (datosPrevios != null){
        jugadores = datosPrevios;
    }
    jugadores.push(datos);
    localStorage.setItem(listaJugadores, JSON.stringify(jugadores));
}

function mostrarDatos (){
    let jugadores = [];
    let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
    if (datosPrevios != null){
        jugadores = datosPrevios;
    }
    jugadores.sort((a,b)=>{
        if(a.totaltime< b.totaltime){
            return -1;
        }
        if(a.attempts < b.attempts){
            return 1;
        }
    });
    jugadores.forEach((jugador, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML=`
        <td> ${i+1} </td> 
        <td> ${jugador.name} </td> 
        <td> ${jugador.totaltime} </td> 
        <td> ${jugador.attempts}</td> 
        <td> ${jugador.timeleft} </td> 
        `;
        tabla.appendChild(fila);
    });
}