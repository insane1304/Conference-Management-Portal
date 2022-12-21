const router = require("express").Router();
const Author = require("../model/author");
const Conference = require("../model/conference");
const Paper = require("../model/paper");
const jwt = require('jsonwebtoken');


const {
  currDateTime,
  addtoLog
} = require("../utils/logReport");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// mongoose.set('bufferCommands', false);
mongoose.connect(
  process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err) => {
    if (err) console.log(err)
    else console.log("mongdb is connected");
  }
);

var currentTime = new Date();

const checkMember = (users, check_id) => {
  let user = false;
  return Promise.all(
    users.map(async item => {
      // const user = await check2(item,logged_user);
      if (item._id.toString() === check_id.toString()) {
        // console.log("Jo")
        user = true;
      }
      // console.log(item);
    })
  ).then(() => {
    console.log('Items processed');
    return user;
  });

};



const showPapers = async (req, res) => {
  try {
    // const url = req.body.url;
    // const check = "/conference/";
    // var f_url = "";
    // for (let i = 0; i < url.length; i++) {
    //   if (i >= check.length) {
    //     f_url += url[i];
    //   }
    // }
    //
    // console.log(f_url);
    // if (f_url[f_url.length - 1] === '/') {
    //   f_url = f_url.substring(0, f_url.length - 1);
    // }
    console.log(req.params)
    const f_url=req.params.token;

    console.log(f_url)
    console.log(req.params.token.length);
    // if(req.params.token.lentgh != 24)
    // {
    //   console.log("HII")
    //   res.status(400).json("INVALID LINK");
    // }
    // else{
      const conference = await Conference.findOne({
        _id: f_url
      });

      const urls = conference.paper_urls;
      var result = []
      for (let i = urls.length - 1, j = 0; i >= 0; i--, j++) {
        // console.log(data[i]);
        var paper = await Paper.findOne({
          _id: urls[i]
        });
        result.push({
          key: j,
          title: paper.title,
          id: paper._id,
          conference: conference,
          creation_date: paper.creation_date,
          rate:paper.rating,
        });
      }

          const responseObject=[];
          responseObject.push(result);

          const token = req.header('auth-token');
          console.log(token);
          if (token.toString() !== "undefined" && token !== null) {
            console.log("user is logged in !");
            const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
            logged_user = verified;

            let check = await checkMember(conference.authors, logged_user._id);
            check=check | await checkMember(conference.reviewers,logged_user._id);

            if(conference.chairperson.toString()===logged_user._id.toString())
            check=true;
            responseObject.push(check);
          }
           else {
            // result.push(0);
            responseObject.push(false)
          }

          responseObject.push(conference.title)

          console.log(responseObject);
          res.status(200).json(responseObject);
    // }



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

const fun = (usersrated, logged_user) => {
  let user = undefined;
  return Promise.all(
    usersrated.map(async item => {
      // const user = await check2(item,logged_user);
      if (item.user_id.toString() === logged_user._id.toString()) {
        console.log("Jo")
        user = item;
      }
      console.log(item);
    })
  ).then(() => {
    console.log('Items processed');
    return user;
  });

};


const checkReviewer = (reviewers, logged_user) => {
  let user = false;
  return Promise.all(
    reviewers.map(async item => {
      // const user = await check2(item,logged_user);
      console.log(item)
      if (item.toString() === logged_user._id.toString()) {

        user = true;
      }
      // console.log(item);
    })
  ).then(() => {
    console.log('Items processed');
    return user;
  });

};


const getUsers = async(usersrated) => {
  let users = [];
  console.log(usersrated);
  return Promise.all(
      usersrated.map(async item => {
      console.log(item.user_id);
      const user = await Author.findOne({
        _id: item.user_id
      });
      console.log(user)
      responseObject = {
        id:item.user_id,
        user_id: user._id,
        rate: item.rate,
        feedback: item.user_feedback,
        firstName: user.firstName,
        lastName: user.lastName,
        creation_date: user.creation_date,
      }
      console.log(responseObject)
      users.push(responseObject);
    })
  ).then(() => {
    console.log('Items processed');
    return users;
  });

};
const getPaperDetail = async (req, res) => {
  try {
    const url = req.body.url;

    const f_url = req.params.id;
    console.log(f_url);
    if (f_url.length == 24) {
      const paper = await Paper.findOne({
        _id: f_url
      });

      console.log(paper)

      var result = []
      result.push(paper)
      const author = await Author.findOne({
        _id: paper.author_id
      });
      result.push(author);

      const conference = await Conference.findOne({
        _id: paper.conference_id
      });

      result.push(conference);
      var usersrated = paper.usersrated;

      const token = req.header('auth-token');
      console.log(token);
      if (token.toString() !== "undefined" && token !== null) {
        console.log("hi");
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        logged_user = verified;
        let user = await fun(usersrated, logged_user);

        if (user != undefined) {
          result.push(user.rate.toString());
        } else result.push(0);
        const check = await checkReviewer(conference.reviewers, logged_user);
        // const check2 = await checkAuthor(conference.reviewers, logged_user);

        result.push(check)
        if(logged_user._id.toString()===author._id.toString()){
          result.push(true)
        }
        else{
          result.push(false);
        }
      }
       else {
        result.push(0);
        result.push(false)
        result.push(false)
      }

      console.log("USERESRATED")
      console.log(usersrated)
      const revusersrated = await usersrated.reverse();

      // console.log("REV")
      // console.log(revusersrated)
      // const ratinginfo = await getUsers(revusersrated);

      // console.log(ratinginfo);
      result.push(revusersrated);

      var json_out = JSON.stringify(result);
      // console.log(json_out);
      //
      console.log(result);
      res.status(200).json(result);


    } else {
      req.status(400).json("Invalid Link");
    }



  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Request!");
  }
};

const getPaperTitle = async (req, res) => {
  try {
    const data = req.body.data
    console.log(req.body);
    var result = []
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      var paper = await Paper.findOne({
        _id: data[i]
      });
      result.push({
        key: i,
        title: paper.title,
        id: paper._id
      });
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
    const conferences = await Conference.find({});
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
