const { realpath } = require('fs');

require('colors');

const mostrarMenu = ()=> {

    const optionPromise = new Promise((resolve,  reject)=>{
        try {
            console.clear();
            console.log('=================================='.green);
            console.log('       Seleccione una opción'.green);
            console.log('==================================\n'.green);

            console.log(`${ '1.'.green } Crear tarea`);
            console.log(`${ '2.'.green } Listar tarea`);
            console.log(`${ '3.'.green } Listar tareas completadas`);
            console.log(`${ '4.'.green } Listar tareas pendientes`);
            console.log(`${ '5.'.green } Completar tarea(s)`);
            console.log(`${ '6.'.green } Borrar tarea`);
            console.log(`${ '0.'.green } Salir\n`);

            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readLine.question('Seleccione una opción: ', (opt) => {
                readLine.close();
                resolve(opt);
            });
        } catch (error) {
            reject(`Ocurrio el siguiente error ${error}`)
        }
    })
    return optionPromise;

}

const pausa = () => {
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readLine.question(`\nPresione ${ 'ENTER' } para continuar\n`, (opt) => {
        readLine.close();
    })
}

module.exports = {
    mostrarMenu,
    pausa
}