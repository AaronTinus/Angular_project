var express = require('express');
var mongodb = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')
var fse = require("fs-extra");
// const { JSONParser } = require('formidable/parsers');

var app = express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongodb.connect('mongodb+srv://<username:password>@cluster0.qapfhgj.mongodb.net/?retryWrites=true&w=majority');

// schema for PersonInfo
var PersonInfoSchema = mongodb.Schema({
    Author_name: String,
    Author_lname: String,
    Author_email: String,
    Blog_name: String,
    Blog: String
});

var PersonInfo = mongodb.model('BlogInfos', PersonInfoSchema)


app.post('/save_data',cors(), async function(req,res){
    console.log("Data saved")
    var Newperson = new PersonInfo({
        Author_name : req.body.user_author_name,
        Author_lname : req.body.user_author_lname,
        Author_email : req.body.user_author_email,
        Blog_name : req.body.user_blog_name,
        Blog : req.body.user_blog
    });
    var saved_info = await Newperson.save()
    res.send("Thank you for your submition");
});
// app.get('/get_all_data', async function (req,res) {
//     const alluser = await PersonInfo.find();
    
//     return res.status(200).json(alluser);

//   })


app.get('/get_all_data', async function (req,res) {
    console.log(req.query.d_filter)
    const alluser = await PersonInfo.find();
    var base = []
    alluser.forEach(element => {
        base.push(element.Author_name + " " + element.Author_lname + " " +  element.Author_email + " " + element.Blog_name + " " + element.Blog);
});
return res.status(200).json(base);
   

})

app.get('/get_all_emails', async function (req,res) {
    console.log(req.query.s_filter)
    const alluser = await PersonInfo.find();
    var user_email = []
    alluser.forEach(element => {
    user_email.push(element.Author_email + " ");
});
    return res.status(200).json(user_email);

  })

  app.get('/get_blog_names', async function (req,res) {
    console.log(req.query.b_filter)
    const alluser = await PersonInfo.find();
    var blog_name = []
    alluser.forEach(element => {
    blog_name.push(element.Blog_name + " ");
});
    return res.status(200).json(blog_name);
  })


  app.get('/get_all_fnames', async function (req,res) {
    console.log(req.query.f_filter)
    const alluser = await PersonInfo.find();
    var user_name = []
    alluser.forEach(element => {
    user_name.push(element.Author_name + " ");
});
    return res.status(200).json(user_name);

  })

  app.get('/get_all_lnames', async function (req,res) {
    console.log(req.query.l_filter)
    const alluser = await PersonInfo.find();
    var user_lname = []
    alluser.forEach(element => {
    user_lname.push(element.Author_lname + "");
});
    return res.status(200).json(user_lname);

  })

  app.get('/get_blog_name', async function (req,res) {
    console.log(req.query.b_filter)
    const alluser = await PersonInfo.find();
    var user_blog_name = []
    alluser.forEach(element => {
    user_blog_name.push(element.Blog_name  + " " + " ");
});
    return res.status(200).json(user_blog_name);

  })

app.get('/get_user_list', async function (req,res) {
    console.log(req.query.ul_filter)
const alluser = await PersonInfo.find();
var user_list = []
alluser.forEach(element => {
    user_list.push(element.Author_name + " " + " " + ":" + " " + " " + element.Blog_name + " " + " ");
});
return res.status(200).json(user_list);

 })

 app.get('/get_one_record', async function (req,res) {
    console.log(req.query.n_filter)
    const nameuser = await PersonInfo.find();
    var name_data = ["The complete list of users first names are :"]
    nameuser.forEach(element =>{

    name_data.push(element.Author_name)
});
    return res.status(200).json(name_data);

})

app.get('/get_last_name', async function (req,res) {
    console.log(req.query.l_filter)
    const nameuser = await PersonInfo.find();
    var name_data = ["The complete list of users last names are : "]
    nameuser.forEach(element =>{

    name_data.push(element.Author_lname)
});
    return res.status(200).json(name_data);

})




app.get('/get_email', async function (req,res) {
    console.log(req.query.s_filter)
    const emailuser = await PersonInfo.find();
    var email_data = ["The complete list of users emails are :"]
    emailuser.forEach(element =>{

    email_data.push( element.Author_email  )
});
    return res.status(200).json(email_data);

})


app.get('/get_one_filtered_record', async function (req,res) {
    console.log(req.query.u_filter)
var filter_data = req.query.u_filter
const alluser = await PersonInfo.findOne({Author_name: filter_data});
if (alluser){
    var u_data_string =  alluser.Author_lname 
    return res.status(200).json(u_data_string);
}
const asluser = await PersonInfo.findOne({Author_lname: filter_data});
if (asluser){
    var my_data_string = "The author of the Blog :  " + asluser.Author_name + " " + asluser.Author_lname + " " + " , The email of the Author : " + asluser.Author_email + " , The title of the Blog : " + asluser.Blog_name + ", The Blog body :  " + asluser.Blog
    return res.status(200).json(my_data_string);
}
const maluser = await PersonInfo.findOne({Author_email: filter_data});
if (maluser){
    var my_data_string = "The author of the Blog :  " + maluser.Author_name + " " + maluser.Author_lname + " " + " , The email of the Author : " + maluser.Author_email + " , The title of the Blog : " + maluser.Blog_name + ", The Blog body :  " + maluser.Blog
    return res.status(200).json(my_data_string);
}
const myuser = await PersonInfo.findOne({Blog_name: filter_data});
if (myuser){
    var my_data_string = "The author of the Blog :  " + myuser.Author_name + " "+ myuser.Author_lname + " " + " , The email of the Author : " + myuser.Author_email + " , The title of the Blog : " + myuser.Blog_name + ", The Blog body :  " + myuser.Blog
    return res.status(200).json(my_data_string);
}
else{
    var my_data_string = "No data for this filter"
    return res.status(200).json(my_data_string);
}

})



app.listen(9000);