var express = require('express');
var router = express.Router();

const list = require('../models/listModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const currentDate = new Date();
    const allList = await list.find({
      date: {
        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) 
      }
    })
    res.render('index',{list:allList})
  }catch(err){

  }
});

router.post('/add',async(req,res)=>{  
  try{
    const {title} = req.body;
    const currentTime = new Date();
    const newList = new list({
      title:title,
      time:currentTime.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',}),
    })
    await newList.save()
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})

router.get('/update/:id',async(req,res)=>{
  try{
    const {id} = req.params
    const allList = await list.find()
    const singleList = await list.findById(id)
    res.render('update',{list:allList,singleList})
  }catch(err){
    res.send(err)
  }
})

router.get('/delete/:id',async(req,res)=>{
  try{
    const {id} = req.params
    await list.findByIdAndDelete(id)
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})

router.post('/update/:id',async (req,res)=>{
  try{
    const {id} = req.params
    console.log(req.body)
    await list.findByIdAndUpdate(id,req.body)
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})


router.get('/dates',async (req,res)=>{
  try{
    const uniqueDates = await list.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
      },
      {
        $sort: {
          "_id": 1
        }
      }
    ]);

    const dates = uniqueDates.map(dateObj => dateObj._id);

    res.render('dates', { dates: dates });
  }catch(err){
    res.send(err)
  }
})


router.get('/date/:date', async function(req, res, next) {
  try {
    const selectedDate = req.params.date;

    const tasksForDate = await list.find({
      date: {
        $gte: new Date(selectedDate),
        $lt: new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)) 
      }
    });

    res.render('taskForDate', { tasks: tasksForDate,date:selectedDate });
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;
