const inquirer = require('inquirer');
require('colors');

const Preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: `¿Que desea hacer? \n\n`,
        choices:[
            {
                value: '1',
                name: `${'1.'.yellow} Crear tareas`
            },
            {
                value: '2',
                name: `${'2.'.yellow} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.yellow} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.yellow} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Salir\n`
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('=================================='.green);
    console.log('       Seleccione una opción'.white);
    console.log('==================================\n'.green);

    const { opcion } = await inquirer.prompt(Preguntas);

    return opcion;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.green } para continuar`
        }
    ];

    await inquirer.prompt(question);
}

const LeerDescription = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Por favor ingresa una descripcion';
                }
                else {
                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.push({
        value: 0,
        name: `${ '0.'.green } Salir`
    });
    const listaParaBorrar = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(listaParaBorrar);
    return id;

}

const confirmar = async ( message ) => {

    const estasSeguro = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(estasSeguro);
    return ok;

}

const listadoTareasCheckList = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:( tarea.completadoEn ) ? true : false
            }
    });

    const listaTareasCompletar = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Completar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(listaTareasCompletar);
    return id;

}

module.exports = {
    inquirerMenu,
    pausa,
    LeerDescription,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCheckList
}