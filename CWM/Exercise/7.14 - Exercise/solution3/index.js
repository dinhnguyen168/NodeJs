const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-excercise')
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Something went wrong with connect the database...', err));

const courseSchema = mongoose.Schema({
    name: String,
    author : String,
    price : Number,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find()
        .or([{isPublished: true, price: {$gte: 12}}, 
            {name : /.*by.*/i}])
        .sort('-price')
        .select('name author price');
}

async function display() {
    const courses = await getCourses();
    console.log(courses);
}

display();


