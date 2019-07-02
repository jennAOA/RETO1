const express = require('express');
const router = express.Router();
const Task = require('../models/task')



// router.get('/',(req,res) => {
//     //res.send('Hello World');
//     Task.find(function(err,tasks){
//         console.log(tasks);

//     });
//      res.json({
//          status: "API WORKS!"
//      });
    

// });
// GET all Tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });
  
  // GET all Tasks
  router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  });
  
router.post('/', async(req,res)=>{
    //console.log(req.body);
    const { title, description} = req.body;
    const task =new Task({
        title,
        description
    });
    console.log(task);
    await task.save();
    res.json({
        status:'Task saved'
    });

});

router.put('/:id', async(req,res) =>{
    const {title,description} = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    console.log(req.params.id);
    res.json({status: 'Task Updated'});

});

router.delete('/:id', async(req,res) =>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Removed'});
})




module.exports = router;