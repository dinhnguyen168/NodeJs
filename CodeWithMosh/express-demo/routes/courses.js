const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: "course 1"},
    {id: 2, name: "course 2"},
    {id: 3, name: "course 3"},
];

router.get('/', (req, res) => { 
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = _.find(courses, c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given is not found!');
    res.send(course);

});

router.post('/', (req,res) => {
    
    const {error} = validateCourse(req.body); // Validate the course

    if(error) return res.status(400).send(error.details[0].message); // If invalid, return 400 - Bad request

    const course = {
        id : courses.length + 1,
        name : req.body.name,
    }   
    courses.push(course);
    res.send(course);

});

router.put('/:id', (req, res) => {
    
    const course = _.find(courses, c => c.id === parseInt(req.params.id)); //Look up the course by Id

    if(!course) return res.status(404).send('The course with given is not found!'); //If not exists, return 404
    
    const {error} = validateCourse(req.body); //Validate the course
    
    if(error) return res.status(400).send(error.details[0].message); // If invalid, return 400 - Bad request
    
    course.name = req.body.name; //Update course
    
    res.send(course); //Send the update course to client

});

router.delete('/:id', (req, res) => {
    const course = _.find(courses, c => c.id === parseInt(req.params.id)); //Look up the course by Id

    if(!course) return res.status(404).send('The course with given id is not found!'); //If not exists, return 404

    const index = _.findIndex(courses, course);
    courses.splice(index, 1);

    res.send(course)
});


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()   
    });

    return schema.validate(course);
}

module.exports = router;