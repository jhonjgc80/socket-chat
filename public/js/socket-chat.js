let socket = io();

var params = new URLSearchParams( window.location.search );

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre del usuario y la sala de chat son requeridos')
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, (resp)=>{
        //console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    })
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');


});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

//Escuchar cambios de usuarios
//cuando un usuario entra o sale del chat
socket.on('listaPersonas', (personas) => {
    renderizarUsuarios(personas);
});

//mensajes privados escuchados por el cliente
socket.on('mensajePrivado', (mensaje)=>{
    console.log('Mensaje Privado', mensaje);
})