// userController.js


const UserServices =require('../../services/user/userServices');


exports.auth =  (req, res) => {return UserServices.auth(req,res)} //auth user

exports.addUser =  (req, res) => {return UserServices.addUser(req,res)} //addUSer


