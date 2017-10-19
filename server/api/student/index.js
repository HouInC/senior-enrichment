const router = require('express').Router()
const {Student,Campus} = require('../../../db/models');

router.get('/',(req,res,next)=>{
    Student.findAll()
        .then(AllStudent=>{
            res.json(AllStudent);
        })
        .catch(next);
})

router.post('/add',(req,res,next)=>{
    Student.create(req.body)
        .then(createStudent=>{
             return createStudent.reload();
        })
        .then(loadStudent=>{
            return res.json(loadStudent);
        })
        .catch(next)
})

router.delete('/:id',(req,res,next)=>{
    Student.destroy({
        where : {
           id : req.params.id 
        }
    }).then(()=>{
        res.sendStatus(204);
    })
    .catch(next);
})

router.put('/:id',(req,res,next)=>{
    Student.update(req.body, {
        where:{
            id : req.params.id
        },
        returning : true
    })
    .spread((row,updatedStudent)=>{
        return Student.findById(updatedStudent[0].id)
    }).then(foundStudent=>{
        res.json(foundStudent);
    })
    .catch(next);
})

module.exports = router;
