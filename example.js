const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/pe2021_1')
  .then(data => console.log(`Connection OK`))
  .catch(err => console.log(`err`, err));

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Vasya' })
// kitty.save().then(() => console.log('meow'))

const taskSchema = new Schema({
  description: String,
  user_id: mongoose.ObjectId,
});

const Task = mongoose.model('tasks', taskSchema);

(async () => {
  //find
  const foundTasks = await Task.find().limit(3);
  console.log(`foundTasks`, foundTasks);

  const newTask = {
    description: 'English Lesson',
    user_id: mongoose.Types.ObjectId('616adffbd31fa761d4ccd4b8'),
  };

  //create
  const newTaskInstance = new Task(newTask);
  const createdTask = await newTaskInstance.save();
  console.log(`createdTask`, createdTask);

  //find by id
  const taskId = '616af76bb12326deeeb6830a';
  const foundTask = await Task.findById(taskId);
  console.log(`foundTask`, foundTask);

  //update by id
  const taskUpdateId = '616c1a08a9d28e1904d5bf89';
  const dataForUpdate = { description: 'French Lesson' };
  const updatedTask = await Task.findByIdAndUpdate(taskUpdateId, dataForUpdate);
  console.log(`updatedTask`, updatedTask);

  //delete by id
  const deletedTask = Task.findByIdAndDelete(taskId);
  console.log(`deletedTask`, deletedTask);
})();
