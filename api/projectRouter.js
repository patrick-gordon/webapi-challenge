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


router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Project.remove(id)
    .then(() => {
        console.log('running .then')
       return res.status(204).json({message: "deleted"})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "error deleting project"})
    })

});

router.put('/:id', (req, res) => {

})

//custom middleware


function validateProjectId(req, res, next) {
    const { id } = req.params;
    console.log(id)
    Project.get(id)
        .then(project => {
            if (project) {
                // req.project = project; // needs to be inside!!!!!
                next();
            } else {
                res.status(404).json({error: "user with this id does not exist"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'server error'})
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