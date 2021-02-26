const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-excercise', { useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Something goes wrong to connect database', err));

const courseSchema = new mongoose.Schema({
    name : String,
    author: String,
    price : Number,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);




// async/await approach

async function getCourses() {
    return await Course
        .find({isPublished : true, tags : 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1});
}
    
async function display() {
    const courses = await getCourses();
    console.log(courses);
}

display();

// promise approach

// getCourses()
//     .then(courses => console.log(courses))
//     .catch(err => console.error('Error', err));

