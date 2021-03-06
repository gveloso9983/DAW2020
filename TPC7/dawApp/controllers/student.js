// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id  => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.registar = student => {
    var newStudent = new Student({
        numero : student.numero,
        nome : student.nome,
        git : student.git})
    return newStudent.save()
}
