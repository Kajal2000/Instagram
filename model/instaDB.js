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

// post Api for posting pic/caption,location and etc.
var post_users = (Post_data)=>{
    return knex.from("Userpost").insert(Post_data)
}
// Update API for post user which you have posted and u can updated on that
var update_post = (post_id,update_data)=>{
    return knex('Userpost').update(update_data).where('post_id',post_id)
};

// // For getting all the data from database 
// let get_data = () => {
//     return knex.select("*").from("SignUp")
// }


module.exports = {post_data,login_email,login_Password,post_users,update_post}