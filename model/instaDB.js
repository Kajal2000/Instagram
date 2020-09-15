let knex = require("./connection")
// Signup part
let post_data = (data) =>{
    return knex("SignUp").insert(data)
}
// For login part
var login_email = (Email) => {
    return knex.select("*").from("SignUp").havingIn("SignUp.Email", Email)
}
// For login part

var login_Password = (Password) => {
    return knex.select("*").from("SignUp").havingIn("SignUp.Password", Password)
}
// For getting all the data from database 
let get_data = () => {
    return knex.select("*").from("SignUp")
}

module.exports = {post_data,get_data,login_email,login_Password}