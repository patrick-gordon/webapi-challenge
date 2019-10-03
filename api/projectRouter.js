const express = require('express');
const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Error getting project'})
    })
});


router.post('/', validateProject, (req, res) => {
const { name } = req.body;
const { description } = req.body
Project.insert({name, description})
    .then(project => res.status(201).json(project))
    .catch(err => {
     console.log(err);
     res.status(500).json({error: 'Error adding project'})
    })
});


router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

})

//custom middleware


function validateProjectId(req, res, next) {
    const { id } = req.params.id;
    Project.getById(id)
        .then(project => {
            req.project = project;
            if (user) {
                next();
            } else {
                res.status(404).json({error: "user with this id does not exist"})
            }
        })
    };

    function validateProject(req, res, next) {
        const {name} = req.body;
        const {description} = req.body;
     if (!name) {
         return res.status(400).json({error: "name required"});
     }
    if (typeof name !== 'string'){
        return res.status(400).json({error: "Name must be a string"});
    }
    if (!description) {
        return res.status(400).json({error: "description required"});
    }
   if (typeof description !== 'string'){
       return res.status(400).json({error: "description must be a string"});
   }
    next();
    };

    function validatePost(req, res, next) {
        const {id: project_id}= req.params;
        const {name} = req.body;
        const {description} = req.body;
        if (req.body) {
            return res.status(400).json({error: "post requires body"})
        }
        if(!name) {
            return res.status(400).json({error: "post requires name"})
        }
        if(!description) {
           return res.status(400).json({error: "post requires a description"})
        }
        next();
    };



module.exports = router;