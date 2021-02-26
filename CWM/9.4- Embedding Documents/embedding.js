const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(idCourse) {
  const course = await Course.findByIdAndUpdate(idCourse, {
    $set: {
      'author.name' : 'Canh Dinh'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('602b96498a4be8518b43bd73', '602b9775cc45bf52ffd48965');

// updateAuthor('602b94229a53cf4f75d218e1');

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }), 
//   new Author({name: 'Dinh'})
// ]);

// addAuthor('602b96498a4be8518b43bd73', new Author({name: 'Canh Dinh'}));
