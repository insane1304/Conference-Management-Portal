const router = require("express").Router();
const Author = require("../model/author");
const Conference = require("../model/conference");
const Paper = require("../model/paper");
const jwt= require('jsonwebtoken');


const { currDateTime, addtoLog } = require("../utils/logReport");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// mongoose.set('bufferCommands', false);
 mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
   if(err) console.log(err)
   else console.log("mongdb is connected");
  }
);

var currentTime = new Date();
const showPapers = async (req, res) => {
    try {
        const url=req.body.url;
        const check="/conference/";
        var f_url="";
        for(let i=0;i<url.length;i++)
        {
            if(i>=check.length){
              f_url+=url[i];
            }
        }

        console.log(f_url);
        if(f_url[f_url.length-1]==='/'){
          f_url=f_url.substring(0,f_url.length-1);
        }

        const conference= await Conference.findOne({_id: f_url});

        const urls=conference.paper_urls;
        var result=[]
        for(let i=urls.length-1,j=0;i>=0;i--,j++){
          // console.log(data[i]);
            var paper= await Paper.findOne({_id: urls[i]});
            result.push({key:j,title:paper.title, id:paper._id,conference:conference,creation_date:paper.creation_date});
        }
        console.log(result);
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};
// const check2 = (item,logged_user) =>
//   new Promise(resolve =>
//     setTimeout(
//       () => resolve({item.toUpperCase()}),
//       Math.floor(Math.random() * 1000)
//     )
//   );

  const fun = (usersrated,logged_user)=>{
  let user=undefined;
  return Promise.all(
    usersrated.map(async item => {
      // const user = await check2(item,logged_user);
      if(item.user_id.toString()===logged_user._id.toString()){
        console.log("Jo")
        user=item;
      }
      console.log(item);
    })
  ).then(() => {
    console.log('Items processed');
    return user;
  });

};


const checkReviewer = (reviewers,logged_user)=>{
let user=false;
return Promise.all(
  reviewers.map(async item => {
    // const user = await check2(item,logged_user);
    if(item.toString()===logged_user._id.toString()){

      user=true;
    }
    // console.log(item);
  })
).then(() => {
  console.log('Items processed');
  return user;
});

};


const getUsers = (usersrated)=>{
let users=[];
return Promise.all(
  usersrated.map(async item => {
    const user = await Author.findOne({_id:item.user_id});
    responseObject={
      user_id:item.user_id,
      rate:item.rate,
      feedback:item.user_feedback,
      firstName:user.firstName,
      lastName:user.lastName,
      creation_date:user.creation_date,
    }
    users.push(responseObject);
  })
).then(() => {
  console.log('Items processed');
  return users;
});

};
const getPaperDetail = async (req, res) => {
    try {
        const url=req.body.url;

        const f_url=req.params.id;
        console.log(f_url);
        if(f_url.length==24){
          const paper= await Paper.findOne({_id: f_url});

          console.log(paper)

          var result=[]
          result.push(paper)
          const author= await Author.findOne({_id: paper.author_id});
          result.push(author);

          const conference= await Conference.findOne({_id: paper.conference_id});

          result.push(conference);
          var usersrated=paper.usersrated;

          const token= req.header('auth-token');
          console.log(token);
          if(token.toString()!=="undefined" && token!==null)
          {
            console.log("hi");
              const verified = jwt.verify(token, process.env.TOKEN_SECRET);
              logged_user = verified;
              let user=await fun(usersrated,logged_user);

                if(user!=undefined){
                  result.push(user.rate.toString());
                }
                else result.push(0);
                let check=await checkReviewer(conference.reviewers,logged_user);
                result.push(check)
            }
            else
            {
              result.push(0);
            result.push(false)
          }

         console.log(usersrated)
         const revusersrated=await usersrated.reverse();

         const ratinginfo=await getUsers(revusersrated);
         // console.log(ratinginfo);
          result.push(ratinginfo);

          var json_out = JSON.stringify(result);
          // console.log(json_out);
          //
          console.log(result);
          res.status(200).json(result);


        }
        else{
          req.status(400).json("Invalid Link");
        }



    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};

const getPaperTitle = async (req, res) => {
    try {
        const data=req.body.data
        console.log(req.body);
        var result=[]
        for(let i=0;i<data.length;i++){
          console.log(data[i]);
            var paper= await Paper.findOne({_id: data[i]});
            result.push({key:i,title:paper.title, id:paper._id});
        }
        console.log(result);
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};


const showAllConf = async (req, res) => {
    try {
      const conferences= await Conference.find({});
      // var result=[];
      // for(let i=0;i<conferences.length;i++){
      //   result.push({key:i+1,title:conferences[i].title,id:conferences[i]._id,creation_date:conferences[i].creation_date});
      // }
      console.log(conferences);
      res.status(200).json(conferences);

    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};

// const showAllConf = async (req, res) => {
//     try {
//       const conferences= await Conference.find({});
//
//       console.log(conferences)
//       res.status(200).json(conferences);
//
//     } catch (err) {
//         console.log(err);
//         res.status(403).json("Invalid Request!");
//     }
// };

module.exports = {
    showPapers,
    getPaperDetail,
    getPaperTitle,
    showAllConf,
};
