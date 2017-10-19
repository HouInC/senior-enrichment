const router = require('express').Router()
const {Student,Campus} = require('../../../db/models');

router.get('/',(req,res,next)=>{
    Campus.findAll()
        .then(AllCampus=>{
            res.json(AllCampus);
        })
})

router.post('/add',(req,res,next)=>{
    Campus.create(req.body)
        .then(createCampus=>{
            res.json(createCampus);
        })
        .catch(next);
})

router.delete('/:id',(req,res,next)=>{
    Campus.destroy({
        where : {
            id : req.params.id
        }
    }).then(()=>{
        res.sendStatus(204);
    })
    .catch(next);
})

router.put('/:id',(req,res,next)=>{
    Campus.update(req.body, {
        where:{
            id : req.params.id
        },
        returning : true
    })
    .spread((row,updatedCampus)=>{
        console.log(updatedCampus[0].id);
        return Campus.findById(updatedCampus[0].id)
    }).then(foundCampus=>{
        console.log(foundCampus);
        res.json(foundCampus);
    })
    .catch(next);
})

module.exports = router;