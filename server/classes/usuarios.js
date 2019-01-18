//codigo para manejar los usuarios que se conectan a la aplicacion
//los sockets generan un id unico para cada cliente y que nos va a servir
//como identificador para cada usuario
class Usuarios{
    constructor(){
        //personas conectadas al chat
        this.personas = [];
    }

    //permite agregar una persona al chat
    agregarPersona(id, nombre, sala){
        let persona = {id, nombre, sala};
        //agregamos persona al arreglo personas
        this.personas.push(persona);

        return this.personas;
    }

    //funcion que permite obtener del arreglo personas una persona por el ID
    getPersona(id){
        let persona = this.personas.find(user=>{
            return user.id === id;
        });

        return persona;
    }

    //regresamos todas las personas que hay en el chat
    getPersonas(){
        return this.personas;
    }

    //obtenemos personas conectadas por sala de chat
    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona =>{
            return persona.sala === sala;
        });

        return personasEnSala;
    }

    //funcion que permite borrar un usuario del arreglo de personas que se desconecta del chat
    borrarPersona(id){

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(user=>{
            return user.id != id;
        });

        return personaBorrada;
    }
}


module.exports = {
    Usuarios
}