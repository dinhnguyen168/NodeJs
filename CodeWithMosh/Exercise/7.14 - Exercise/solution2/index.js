const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-excercise', { useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Something goes wrong to connect database', err));

const courseSchema = mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    isPublished: Boolean,
    price : Number,
    date : {type: Date, default: Date.now}
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    return await Course
        .find({isPublished : true})
        .or([{tags: 'frontend'},{tags: 'backend'}])
        .sort('-price')
        .select('name author price');
}

async function display() {
    const courses = await getCourses();
    console.log(courses);
}

display();

