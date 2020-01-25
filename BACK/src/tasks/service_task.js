const   TaskModel = require('../../models/task')

module.exports={
    __add,
    __get,
    __getOne,
    __update,
    __delete
}

function __add(data){
    return new Promise((resolve, reject) => {
        
        let task = new TaskModel(data)
        task.save(err => {
            if(err) return reject({code: 503, message: "Error al guardar la tarea."})
            resolve(task)
        })
    })
}
function __getOne(id){
    return new Promise((resolve, reject) => {
        TaskModel.findOne({_id: id}).exec((err, task) => {

            if(err) return reject({code: 503, message: "Error a consultar los datos"})
        
            if(!task) return reject({code: 404, message: "Tarea no encontrada"})

            resolve(task)
        })
    })
}
function __get(){
    return new Promise((resolve, reject) => {

        TaskModel.find().exec((err, tasks) => {
            if(err) return reject({code: 503, message: "Error al consultar las tareas"})
            resolve(tasks)
        })
    })
}
function __update(data,id){
    return new Promise((resolve, reject) => {
        TaskModel.findOne({_id: id}).exec((err, task) => {
            if(err) return reject({code: 503, message: "Error a consultar los datos"})
        
            if(!task) return reject({code: 404, message: "Tarea no encontrada"})

            const keys = Object.keys(data)
            keys.forEach(key => task[key] = data[key])

            task.save((err, task) => {
                if(err) return reject({code: 503, message: Message.saving_error})
                resolve(task)
            })
        })
    })
}

function __delete(id){
    return new Promise((resolve, reject) => {
        
        TaskModel.deleteOne({_id: id}).exec((err, resp) => {
            if(err) return reject({code: 503, message:"Error al eliminar el dato."})
            resolve({status:"Elemento borrado",_id:id})
        })
    })
}

