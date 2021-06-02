const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    LeerDescription,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCheckList
 } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
require('colors');


const main = async() => {
    
    let opcionReal = '';
    const tareas = new Tareas();
    const infoDB = leerDB();
    
    //Si existe informacion en el archivo data.json cargarla en memoria para cuando se quieran listar
    if(infoDB){
        tareas.cargarTareasFromArr(infoDB);
    }
    //----------------------------------------------------------------------------------------------//
    
    do {
        //Imprimir el menu
        opcionReal = await inquirerMenu();
        console.log('\n');

        switch (opcionReal) {
            case '1':
                //CREAR TAREAS
                const description = await LeerDescription('Descripcion: ');
                tareas.crearTarea(description);
            break;
            case '2':
                //IMPRIMIR LISTADO DE TAREAS
                await tareas.listadoBonito();

            break;
            case '3':
                //IMPRIMIR LISTADO DE TAREAS COMPLETADAS
                await tareas.listarCompletadasPendiente(true);

            break;
            case '4':
                //IMPRIMIR LISTADO DE TAREAS PENDIENTES
                await tareas.listarCompletadasPendiente(false);

            break;
            case '5':
                //COMPLETAR TAREAS
                const ids = await listadoTareasCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                
                if (id !== 0) {
                    
                    const ok = await confirmar('¿Esta seguro de borrar esta tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada exitosamente');
                    }
                    
                }

            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
        
    } while (opcionReal !== '0');
    
}

main();