let knex = require("./connection.js")

// This is sign up table
knex.schema.createTable("SignUp", (table) => {
    table.increments("User_id")
    table.string("First_Name")
    table.string("Last_Name")
    table.string("Email")
    table.string("Password")
}).then(()=>{
    console.log("table created well")
}).catch((err)=>{
    console.log(err,"oops some err")
})

// This table is for uploading/photo,viedos,caption,location etc.

knex.schema.createTable("Userpost", (table) => {
    table.increments("post_id")
    table.string("Caption")
    table.string("Location")
    table.string("Img/Viedo")
    table.integer("User_id").unsigned()
    table.foreign("User_id").references("SignUp.User_id")

}).then(()=>{
    console.log("table created well")
}).catch((err)=>{
    console.log(err,"oops some err")
})
