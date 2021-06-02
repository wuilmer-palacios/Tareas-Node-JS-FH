const { pausa } = require("../helpers/inquirer");
const Tarea = require("./tarea");

class Tareas {

    _listado = {};
    
    get listadoArr(){
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }
    constructor (){
    
        this._listado = {};
    
    }

    borrarTarea( id = ''){
        
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArr(tareasExistentes = []){

        tareasExistentes.forEach( key => {

            this._listado[key.id] = key;
        })

    }

    listadoBonito(){
        
        let listaFinal = '';
        let status = '';
        let idx = '';
        this.listadoArr.forEach((tarea, index) => {
            
            idx = `${index + 1}`.green;
            
            if(tarea.completadoEn == null){
                status = 'Pendiente'.red;
            }
            else{
                status = 'Completada'.green;
            }
            
            listaFinal += `${idx} ${ tarea.desc } :: ${status}\n`;
        });

        console.log(listaFinal);
    }

    listarCompletadasPendiente( estado = true ){
        
        let listaFinal = '';
        let status = '';
        let idx = 0;

        if (estado) {
            
            this.listadoArr.forEach( tarea => {
                
                if(tarea.completadoEn !== null){
                    
                    idx += 1;
                    
                    status = 'Completada'.green;
                    listaFinal += `${idx.toString().green} ${ tarea.desc } :: ${tarea.completadoEn.toString().green}\n`;

                }
                
            })
        }else{
            
            this.listadoArr.forEach( tarea => {
                
                if(tarea.completadoEn == null){
                    
                    idx += 1;
                    
                    status = 'Pendiente'.red;
                    listaFinal += `${idx.toString().green} ${ tarea.desc } :: ${status}\n`;

                }
                
            })
        }

        console.log(listaFinal)
    }

    toggleCompletadas( idsTareas = []){

        idsTareas.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            
            if ( !idsTareas.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;