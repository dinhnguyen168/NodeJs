const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then (() => console.log('Connected to MongoDB.'))
    .catch(err => console.error('Could not to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name : {
        type: String, 
        required : true,
        minLength: 5,
        maxLength: 255,
        // match: /pattern/ 
    },
    categories: {
        type: String,
        required: true,
        enum : ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: { // Custome validation
            isAsync: true,
            validator: function(v, callback){
                setTimeout(()=>{
                    const result = v && v.length>0;
                    // Do some async work
                    callback(result);
                }, 0.1 * 1000);

            },
            message: 'A course should have at least one tag.'
        },
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price : {
        type: Number,
        required: function() {return this.isPublished;}, // Can not use arrow function because it doesn't have the own 'this'
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        categories: '-',
        author: 'Dinh',
        tags: [],
        isPublished: true,
        price : 30
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for(field in ex.errors) {
            console.log('Error ==> ', ex.errors[field].message);
        }      
    }
    
}

async function getCourses() {
    //or 
    //and
    const courses = await Course
        .find({author: 'Dinh', isPublished: true})
        .limit(2)
        .sort({name:1})
        .select({name: 1, tags : 1});
    console.log(courses);
}

// Update Course by retrieving it first - Query first
async function updateCourseById(id) {
    const course = await Course.findById(id)
    if(!course) return;

    course.author = 'Another Author';
    course.isPublished = true;

    const result = await course.save();
    console.log('Succesfully updated!' , result);
}

// Update Course - Update first

async function updateCourse(id){
    // const result = await Course.update({_id: id}, {    // 
    const course = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Dinh',
            isPublished : false
        } 
    }, {new : true});
    console.log(course);
}

// Using deleteOne to remove documents in the db but it's just returned { n: 1, ok: 1, deletedCount: 1 } 
async function removeCourseById(id){
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}

// Using findByIdAndRemove to remove documents in the db and return the documents that we removed
async function removeCourse(id){
    const course = await Course.findByIdAndRemove({_id: id});
    console.log(course);
}

createCourse();