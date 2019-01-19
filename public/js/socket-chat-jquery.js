//codigo que va a permitir renderizar, modificar el contenido del html

var params = new URLSearchParams( window.location.search );
var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de jquery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');

//funciones para renderizar usuarios
function renderizarUsuarios(personas) {
    console.log(personas);

    let html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala') +'</span></a>';
    html +=     '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '   <a data-id="'+personas[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[i].nombre+'<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
    
}

function renderizarMensajes(mensajes, yo) {

    var html = '';
    var fecha = new Date(mensajes.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';

    if (mensajes.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensajes.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensajes.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (mensajes.nombre !== 'Administrador') {
            html +=    '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        
        
        html +=    '<div class="chat-content">';
        html +=        '<h5>'+mensajes.nombre+'</h5>';
        html +=        '<div class="box bg-light-'+adminClass+'">'+mensajes.mensaje+'</div>';
        html +=    '</div>';
        html +=    '<div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }

    

    divChatbox.append(html);

    
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


//listeners de jquery
//obtenemos el id del usuario al hacer click sobre él
divUsuarios.on('click', 'a', function(){
    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e){
    e.preventDefault();
    //capturamos el texto que se digita en el input
    if(txtMensaje.val().trim().length === 0){
        return;
    }

    // Enviar mensaje desde el cliente a los demas usuarios conectados
    socket.emit('crearMensaje', {
         nombre: nombre,
         mensaje: txtMensaje.val()
    }, function(resp) {
        txtMensaje.val('').focus();
        renderizarMensajes(resp, true);
        scrollBottom();
    });
});