var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/student/:id', function(req, res) {
  var reqId = req.params.id
  console.log(typeof reqId)
 
  // Data retrieve
  Student.lookUp(reqId)
    .then(data => res.render('student', {user: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/registar', function(req, res){
  res.render('registar')
})

//Registar
router.post('/registar', function(req, res) {
  var reqBody = req.body
  console.log(reqBody)
  // Data retrieve
  Student.registar(reqBody)
    .then(data => res.render('registar', {data:data, numero : req.body.numero, nome : req.body.nome, git : req.body.git}))
    .catch(err => res.render('error', {error: err}))
  ;
});


module.exports = router;
