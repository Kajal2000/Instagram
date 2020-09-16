const express = require('express');
const app = express();
const appDB = require("../model/instaDB");
var jwt = require("jsonwebtoken")
app.use(express.json())

// singup part 
app.post("/signUp",(req,res)=>{
    // console.log(req);
    res.send(req)
    var data = {
        User_id : req.body.User_id,
        First_Name : req.body.First_Name,
        Last_Name : req.body.Last_Name,
        Email : req.body.Email,
        Password : req.body.Password
    }
    appDB.post_data(data,data)
        .then(()=>{
            res.send("posted data .....",)
        }).catch((err)=>{
            res.send("opps some err", err)
    })
    
})

// loging part 
app.post("/loginApi", (req, res) => {
    var Email = req.body.Email;   
    var Password = req.body.Password;
    appDB.login_email(Email)
        .then((log_in_data) => {
            // console.log(log_in_data);
            if (log_in_data.length == 0) {
                res.send("Email is wrong")
            } else {
                appDB.login_Password(Password)
                .then((log_in_data) => {
                    if (log_in_data.length == 0) {
                        res.send("Password is wrong")
                    } else {
                        let newToken = jwt.sign({ "appDB": log_in_data }, "kajal")
                        res.cookie(newToken)
                        res.send('loing successsful')
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
});
// post Api for posting pic/caption,location and etc.
app.post("/userPost",(req,res)=>{
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length - 2]).slice(2, 600)
    jwt.verify(token, 'kajal', (err, data) => {
        var verified_user_id = data["appDB"][0]["User_id"]
        let Post_data = {
            Caption : req.body.Caption,
            Location : req.body.Location,
            Img_Viedo : req.body.Img_Viedo,
            User_id : verified_user_id
        }
        appDB.post_users(Post_data)
        .then(()=>{
            res.send("posted data")
        }).catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })
})
// Update API for post user which you have posted and u can updated on that
app.put("/updateApi/:post_id",(req,res)=>{
    var post_id = req.params.post_id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length - 2]).slice(2, 600)
    jwt.verify(token, 'kajal', (err, data) => {
        // var verified_user_id = data["appDB"][0]["User_id"]
        let update_data = {
            Caption : req.body.Caption,
            Location : req.body.Location
        }
        appDB.update_post(post_id,update_data)
        .then(()=>{
            res.send("updated data")
        }).catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })
})


// // Getting all the data from database
// app.get("/getApi",(req,res)=>{
//     var data = appDB.get_data()
//     data.then((res_data)=>{
//         res.send(res_data)
//     }).catch((err)=>{
//         console.log(err) 
//     })
// })
module.exports = app;