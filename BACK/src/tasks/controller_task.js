const  TaskService = require('./service_task')

module.exports = {        
    get_tasks,
    get_task,
    add_task,
    update_task,
    delete_task
}

function get_tasks(req,res) {
    TaskService.__get()
    .then(resp =>{
        res.status(200).send({
            success: true,
            data: resp
        })
    })
    .catch(err=>{
        res.status(err.code).send({
            success: false,
            type: err.message
        })
        
    })
}

function get_task(req,res) {

    let id = req.params.id
    
    TaskService.__getOne(id)
    .then(resp =>{
        res.status(200).send({
            success: true,
            data: resp
        })
    })
    .catch(err=>{
        res.status(err.code).send({
            success: false,
            type: err.message
        })
        
    })
}

function add_task(req,res) {

    let body = req.body

    TaskService.__add(body)
    .then(resp =>{
        res.status(200).send({
            success: true,
            data: resp
        })
    })
    .catch(err=>{
        res.status(err.code).send({
            success: false,
            type: err.message
        })
        
    })
}

function update_task(req,res) {
    let id = req.params.id
    let body = req.body
    TaskService.__update(body,id)
    .then(resp =>{
        res.status(200).send({
            success: true,
            data: resp
        })
    })
    .catch(err=>{
        res.status(err.code).send({
            success: false,
            type: err.message
        })
        
    })
}

function delete_task(req,res) {
    
    let id = req.params.id

    TaskService.__delete(id)
    .then(resp =>{
        res.status(200).send({
            success: true,
            data: resp
        })
    })
    .catch(err=>{
        res.status(err.code).send({
            success: false,
            type: err.message
        })
        
    })
}