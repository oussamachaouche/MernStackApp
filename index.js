const Joy = require('@hapi/joi');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const courses = [
    { id:1, name: 'course1'},
    { id:2, name: 'course2'},
    { id:3, name: 'course3'}
]
app.get('/', (req,res)=>{
    res.send("hello word!!!");
});
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course) return  res.status(404).send('the course with the id given wasnot exisit');
    const index = courses.indexOf(course);
     courses.splice(index,1);
    res.send(course);
    
});
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with the id given wasnot exisit');
    var {error} = validateCourse(req.body);
    if(error) return  res.status(400).send(error.details[0].message);
     
    course.name = req.body.name;
    res.send(course);
    
});
app.get('/api/courses', (req,res)=>{
    res.send(courses);
});
app.get('/api/course/:id', (req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('the course with the id given wasnot exisit');
    res.send(course);
});
app.post('/api/coursess',(req,res)=>{
    var {error} = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`srver listenin ${port}...`);
});
function validateCourse(course){
    const schema = {
        name: Joy.string().min(3).required()
    };
    return Joy.validate(course, schema);
}