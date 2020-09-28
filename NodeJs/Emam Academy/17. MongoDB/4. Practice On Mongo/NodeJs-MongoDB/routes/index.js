var express = require('express');
var router = express.Router();
var User = require('../model/user')


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insert', (req, res, next) => {

  const user = new User({
    userName: req.body.userName,
    userEmail: req.body.userEmail
  })

  user.save((err, result) => {
    if (err) {
      console.log('Error!!')
      res.redirect('/')
      return
    }
    console.log(result)
    res.redirect('/getusers')
  })

})

// Create '/getusers' Router And Inside It Will Use Find Method For Get All Data
router.get('/getusers', (req, res, next) => {

  User.find({}, (err, result) => {
    if (err) {
      console.log(err)
      redirect('/')
      return
    }
    console.log(result)
    res.render('index', { items: result })
  })
})

// Create Update Router Inside [index.js]
router.post('/update', (req, res, next) => {
  const ID = req.body.id;
  const updatedData = {
    userName: req.body.new_user_name,
    userEmail: req.body.new_user_email
  }

  User.updateOne({ _id: ID }, { $set: updatedData }, (err, result) => {
    if (err) {
      console.log('Error While Updating Date!!')
      res.redirect('/')
      return
    }
    // Shows Number Of Modified
    console.log(result)
    // After Updating Redirect Me To 'getusers' Page To Display The Changes
    res.redirect('/getusers')
  })
})

// Step2: Crate Delete Router Inside [index.js]
router.post('/delete', (req, res, next) => {

  const ID = req.body.id
  User.deleteOne({ _id: ID }, (err, result) => {
    if (err) {
      console.log('Error While Deleteing')
      res.redirect('/')
      return
    }
    console.log(result)
    console.log('User Deleted Successfully')
    res.redirect('/getusers')
  })
})


module.exports = router;
