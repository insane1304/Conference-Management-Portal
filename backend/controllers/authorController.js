const router = require("express").Router();
const Author = require("../model/author");
const Conference = require("../model/conference");
const Paper = require("../model/paper");
const Feedback = require("../model/Feedback");

const {
  currDateTime,
  addtoLog
} = require("../utils/logReport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const sendGridTransport = require("nodemailer-sendgrid-transport");
const {
  studentRegisterValid,
  studentLoginValid
} = require("./validation");

const {
  authorRegisterValid,
  authorLoginValid,
  createConfValid,
  editProfileValid,
  updatePassValid,
  emailValid,
  resetPassValid,
  updateConfValid
} = require("./validation");

const {
  doUpload
} = require("./uploadFile")

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  Schema
} = mongoose;

dotenv.config();

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

const authorRegister = async (req, res) => {
  try {
    const author = new Author(req.body);
    console.log(author)
    let givenEmail = req.body.email;
    let givenPassword = req.body.password;

    // validation
    const {
      error
    } = authorRegisterValid(req.body);
    // console.log("hi");
    if (error) {
      if (error.details[0].message == "\"confirmPassword\" must be [ref:password]") {
        return res.status(400).json("Confirm Password is not same as password")
      } else return res.status(400).json(error.details[0].message);
    }
    // check whether user already in database or not
    const emailExist = await Author.findOne({
      email: givenEmail
    });
    if (emailExist) return res.status(400).json("Email already exists");
    // hash password

    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    author.password = await bcrypt.hash(givenPassword, salt);
    author.save();

    res.status(201).json(author);

    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });
    transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: author.email,
        subject: 'Registration Successful',
        html: `
                        <p>Thanks for registering on the CMT.</p>
                        <p>The Team CMT Welcomes You Aboard!!</p>
                        `,
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });

    var created_date_time = author.creation_date;
    var current_date_time = author.last_login_date;
    current_date_time = currDateTime(currentTime);
    if (!created_date_time) {
      created_date_time = currDateTime(currentTime);
    }
    var action_string =
      "Successfully Registered " + author.email;
    addtoLog(action_string, "Author", currentTime);
  } catch (err) {
    res.status(400).json(err);
  }
};

const authorLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  // console.log("HII");
  // console.log(email);
  // console.log(password);

  // validation
  const {
    error
  } = authorLoginValid(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // check whether email exists
  const author = await Author.findOne({
    email
  });
  if (!author) return res.status(400).json("Email doesn't exists!");
  if (author.access == true) {
    // check password
    const validPass = await bcrypt.compare(password, author.password);
    if (!validPass) return res.status(403).json("Invalid Password!");

    var created_date_time = author.creation_date;
    var current_date_time = author.last_login_date;

    current_date_time = currDateTime(currentTime);
    if (!created_date_time) {
      created_date_time = currDateTime(currentTime);
    }

    var action_string = "Successfully Logged In " + author.email;
    // console.log(action_string)
    addtoLog(action_string, "Author", currentTime);

    const token = jwt.sign({
        _id: author._id,
      },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json(token);
  } else return res.status(401).json("Unauthorized Author");
};


const editProfile = async (req, res) => {
  try {
    const id = req.author._id;
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const organisation = req.body.organisation;


    const {
      error
    } = editProfileValid(req.body);
    // console.log("hi");
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    await Author.updateOne({
      _id: id
    }, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      contact: contact,
      organisation: organisation
    });
    res.status(201).json(author);

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};


const updatePassword = async (req, res) => {
  try {
    const id = req.author._id;
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const initialPass = req.body.initialPass;
    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;


    const {
      error
    } = updatePassValid(req.body);
    if (error) {
      if (error.details[0].message == "\"Confirm Password\" must be [ref:newPass]") {
        return res.status(400).json("Confirm Password must be same as  New Password!")
      } else return res.status(400).json(error.details[0].message);
    }

    const validPass = await bcrypt.compare(initialPass, author.password);
    if (!validPass) return res.status(403).json("Old Password is incorrect!");

    // console.log("hi");
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const newpassword = await bcrypt.hash(newPass, salt);

    const checkNewPass = await bcrypt.compare(newPass, author.password);
    if (checkNewPass) return res.status(403).json("New Password must not be same as Old Password!");

    await Author.updateOne({
      _id: id
    }, {
      password: newpassword
    });
    res.status(201).json(author);

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

// const studentTimetable = async (req, res) => {
//     const id = req.student._id;
//     const student = await Student.findOne({ _id: id });
//     if (!student) res.status(400).json("Student doesn't exist in Database");
//
//     Timetable.finder(
//         "timetable",
//         {
//             semester: student.semester,
//             section: student.section,
//         },
//         function (err, docs) {
//             res.json({ user: student._id, data: docs });
//         }
//     );
// };

const authorProfile = async (req, res) => {
  try {
    const id = req.author._id;
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    //    Student.findByIdAndUpdate(id, function(err,result){
    console.log(author)
    res.status(200).json(author);

  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Request!");
  }
};

const showProfile = async (req, res) => {
  try {
    const id = req.author._id;
    const user = await Author.findOne({
      _id: id
    });
    var result = [];
    if (!user) {
      result.push([]);
    } else {
      result.push(user);
    }

    const url = req.body.url;
    console.log(url)
    // const check="/profile/";
    // var f_url="";
    // for(let i=0;i<url.length;i++)
    // {
    //     if(i>=check.length ){
    //       f_url+=url[i];
    //     }
    // }
    // if(f_url[f_url.length-1]==='/'){
    //   f_url=f_url.substring(0,f_url.length-1);
    // }
    // console.log(f_url);

    const f_url = req.params.id;
    console.log(f_url);

    if (f_url.length === 24) {
      // console.log("HI");
      if (f_url.match(/^[0-9a-fA-F]{24}$/)) {
        const profile = await Author.findOne({
          _id: f_url
        });
        if (!profile) {
          result.push([]);
        } else {
          result.push(profile);
          const conferences = await Paper.find({
            author_id: profile._id
          }).sort({
            creation_date: -1
          });

          console.log(conferences)
          result.push(conferences)
        }
      } else {
        result.push([]);
      }
      console.log(result);
      res.status(200).json(result);


      // Yes, it's a valid ObjectId, proceed with `findById` call.
    } else {
      res.status(400).json("Invalid Link");
    }
    //



  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Request!");
  }
};

const myConferences = async (req, res) => {
  try {
    const id = req.author._id;
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conferences = await Conference.find({
      $or: [{
        chairperson: id
      }, {
        authors: id
      }, {
        reviewers: id
      }]
    });

    console.log(conferences)
    res.status(200).json(conferences);


  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Request!");
  }
};

const checkAuth = (authors, author) => {
  let users = false;
  return Promise.all(
    authors.map(async item => {
      // const user = await check2(item,logged_user);
      // const user= await Author.findOne({_id:item._id});
      console.log(item);
      console.log(author._id);
      if (item.toString() === author._id.toString()) {
        users = true;
      }
    })
  ).then(() => {
    console.log('Items processed');
    return users;
  });

};

const showMySubs = async (req, res) => {
  try {

    const id = req.author._id;
    console.log(req.params.id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");
    console.log(author);

    const f_url = req.params.id;
    console.log(f_url.length);
    if (f_url.length != 24) {
      res.status(400).json("Invalid link")
    } else {
      const conference = await Conference.findOne({
        _id: f_url
      });

      const urls = conference.paper_urls;
      var result = []
      for (let i = urls.length - 1, j = 1; i >= 0; i--, j++) {
        var paper = await Paper.findOne({
          _id: urls[i]
        });
        if (paper.author_id.toString() === id.toString())
          result.push({
            key: j,
            title: paper.title,
            id: paper._id,
            conference: conference,
            creation_date: paper.creation_date
          });
      }
      var isChairperson;
      if (author._id.toString() === conference.chairperson.toString()) {
        isChairperson = true;
      } else isChairperson = false;
      var checkAuthor = false;

      checkAuthor = checkAuthor | (await checkAuth(conference.authors, author));

      console.log(result);
      res.status(200).json({
        result: result,
        conf_id: f_url,
        isChairperson: isChairperson,
        isAuthor: checkAuthor,
        conf_title:conference.title,
      });
    }


  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Request!");
  }
};

const createConf = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conference = new Conference(req.body);
    console.log(conference)

    const {
      error
    } = createConfValid(req.body);
    // console.log("hi");
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    conference.chairperson = id;
    // conference.creation_date=currDateTime(currentTime);
    conference.save();
    console.log(conference)

    author.conferences.push(conference._id);
    author.save();

    console.log(author)
    res.status(201).json(conference);

    // var created_date_time = author.creation_date;
    // var current_date_time = author.last_login_date;
    // current_date_time = currDateTime(currentTime);
    // if (!created_date_time) {
    //     created_date_time = currDateTime(currentTime);
    // }
    // var action_string =
    //     "Paper Successfully Pushlished by " + author.email +" to conference: "+conference._id;
    //
    // addtoLog(action_string, "Chairperson", currentTime);


  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};


const submitRating = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const paper_id = req.params.id;
    console.log(req.params.id)

    if (paper_id.length != 24) {
      res.status(400).json("Invalid link")
    } {

      const val = req.body.val;
      const feedback = req.body.feedback;
      const paper = await Paper.findOne({
        _id: paper_id
      });
      if (!paper) {
        res.status(400).json("Invalid link")
      }

      const obj = {
        user_id: id,
        rate: val,
        user_feedback: feedback,
        user_firstName:author.firstName,
        user_lastName:author.lastName,
      };

      const users = paper.usersrated;
      var n = users.length;
      console.log(paper.rating);
      var curr_rate = parseFloat(paper.rating.toString());
      // console.log(curr_rate);
      // console.log(val);
      // console.log(n);
      curr_rate = (curr_rate + val) * (1.0) / (n + 1);
      // console.log(curr_rate);
      paper.usersrated.push(obj);
      paper.rating = curr_rate;
      // console.log("#######################################");
      // console.log(paper);
      await paper.save();


      res.status(200).json("Rating updated");


    }

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

//############################################################################
const mailsend = (req, res) => {
  const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: process.env.mail_sender,
      },
    })
  );
  const {
    name,
    email,
    message,
    subject
  } = req.body;
  transporter
    .sendMail({
      from: "devkarenge@gmail.com",
      to: email,
      subject: subject,
      html: `<h3>${name}</h3>
    <p>${message}</p>`,
    })
    .then((resp) => {
      res.json({
        resp
      });
    })
    .catch((err) => {
      console.log(err);
    });

  var action_string = "E-Mail Sent by " + name + " to : " + email;
  addtoLog(action_string, "Student", currentTime);
};



const forgetPassword = async (req, res) => {

  const email = req.body.email;
  const author = await Author.findOne({
    email: email
  });
  console.log(author);
  var buf = await crypto.randomBytes(30);
  const token = buf.toString('hex');
  // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);


  const url = "https://conference-management-portal.herokuapp.com/resetpass/" + token;

  if (!author) {
    res.status(400).json("Email id is not registered");
  } else {
    author.forgetPass = token;
    console.log(author);
    await author.save();
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'Forget Password Request',
        // text: 'Your Visit has been Confirmed!!. Your status has been set to active. Now, you can use your QR code to successfully enter the building.\nYou can also check your status at your profile. You can use your username ( '+username+' ) and password to login. Here is the link of the website: https://vms-sasy.herokuapp.com/. Your QR code is attached herewith, you can see the same on your profile',
        html: `
                     <p>Someone has requested to reset your password. If it was you, kindly click on the following link to reset your password </p>
                     <a href=${url} target="_blank">Reset Password</a>
                     `,
      })
      .then((resp) => {
        res.status(200).json({
          resp
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  // var action_string = "E-Mail Sent by " + name + " to : " + email;
  // addtoLog(action_string, "Student", currentTime);
};

const resetPassword = async (req, res) => {
  try {

    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;
    console.log(req.body);
    const token = req.params.token;
    console.log(token);
    const author = await Author.findOne({
      forgetPass: token
    });
    if (!author) {
      res.status(400).status("Invalid Link");
    }
    // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);

    const {
      error
    } = resetPassValid(req.body);
    if (error) {
      if (error.details[0].message == "\"Confirm Password\" must be [ref:newPass]") {
        return res.status(400).json("Confirm Password must be same as  New Password!")
      } else return res.status(400).json(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const email = author.email;

    author.password = await bcrypt.hash(newPass, salt);
    author.forgetPass = undefined;
    await author.save();


    //
    // var action_string =
    //     "Successfully Registered " + author.email;
    // addtoLog(action_string, "Author", currentTime);
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'Password Changed',
        // text: 'Your Visit has been Confirmed!!. Your status has been set to active. Now, you can use your QR code to successfully enter the building.\nYou can also check your status at your profile. You can use your username ( '+username+' ) and password to login. Here is the link of the website: https://vms-sasy.herokuapp.com/. Your QR code is attached herewith, you can see the same on your profile',
        html: `
                     <p> Your password has been changed successfully </p>
                     `,
      })
      .then((resp) => {
        res.status(200).json("Password Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }

  // var action_string = "E-Mail Sent by " + name + " to : " + email;
  // addtoLog(action_string, "Student", currentTime);
};

const updateConf = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference) {
      res.status(400).json("Invalid Link")
    }
    console.log(conference)



    const {
      error
    } = updateConfValid(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    conference.title = req.body.title;
    conference.description = req.body.description;
    conference.venue = req.body.venue;
    conference.researchArea = req.body.researchArea;

    await conference.save();
    console.log(conference);
    res.status(200).json(conf_id);


  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const checkAddAuthor = (authors, id) => {
  let check = false;
  return Promise.all(
    authors.map(async item => {
      if (item._id.toString() === id.toString()) {
        check = true;
      }
    })
  ).then(() => {
    console.log('Items processed');
    return check;
  });

};

const addAuthor = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.author._id;

    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference) {
      res.status(400).json("Invalid Link")
    }
    console.log(conference)

    const {
      error
    } = emailValid(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    var authors = conference.authors;
    const email = req.body.email;

    const newAuthor = await Author.findOne({
      email: email
    });
    if (!newAuthor) {
      res.status(400).json("No such user exist");
    }
    console.log(newAuthor);
    var check = false;
    check = check | (await checkAddAuthor(conference.authors, newAuthor._id));
    var check2 = false;
    check2 = check2 | (await checkAddAuthor(conference.reviewers, newAuthor._id));
    console.log(check);
    console.log(check2);
    if (check || check2) {
      res.status(400).json("User already exists in authors or reviewers")
    } else {


      authors.push(newAuthor._id);
      var authorDetails = await getAuthors(authors);

      await conference.save();
      console.log(conference)
      res.status(200).json(authorDetails);

      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASS
        }
      });
      const url = "https://conference-management-portal.herokuapp.com/conference/" + conference._id;
      transporter
        .sendMail({
          from: process.env.GMAIL_ID,
          to: newAuthor.email,
          subject: 'You have been invitied as author',
          html: `
                          <p>You have been invited as an author in the following conference:</p>
                          <p><a href=${url}>${conference.title}</a></p>
                          `,
        })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    }



  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const addReviewer = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference) {
      res.status(400).json("Invalid Link")
    }
    console.log(conference)

    const {
      error
    } = emailValid(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    var reviewers = conference.reviewers;
    const email = req.body.email;

    const newReviewer = await Author.findOne({
      email: email
    });
    if (!newReviewer) {
      res.status(400).json("No such user exist");
    }
    var check = false
    check = check | (await checkAddAuthor(conference.authors, newReviewer._id));
    var check2 = false;
    check2 = check2 | (await checkAddAuthor(conference.reviewers, newReviewer._id));
    console.log(check);
    console.log(check2);
    if (check || check2) {
      res.status(400).json("User already exists in authors or reviewers")
    } else {
      reviewers.push(newReviewer._id);

      var reviewerDetails = await getAuthors(reviewers);
      await conference.save();
      console.log(conference)
      res.status(200).json(reviewerDetails);

      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASS
        }
      });
      const url = "https://conference-management-portal.herokuapp.com/conference/" + conference._id;
      transporter
        .sendMail({
          from: process.env.GMAIL_ID,
          to: newReviewer.email,
          subject: 'You have been invitied as Reviewer',
          html: `
                          <p>You have been invited as a Reviewer in the following conference:</p>
                          <p><a href=${url}>${conference.title}</a></p>
                          `,
        })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    }



  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const getAuthors = (authors) => {
  let users = [];
  return Promise.all(
    authors.map(async item => {
      // const user = await check2(item,logged_user);
      const user = await Author.findOne({
        _id: item._id
      });
      users.push(user);
      console.log(user);
    })
  ).then(() => {
    console.log('Items processed');
    return users;
  });

};


const confDetail = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    console.log(id);
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference || conference === null) {
      res.status(400).json("Invalid Link")
    } else {
      console.log(conference)

      if (conference.chairperson.toString() === author._id.toString()) {
        const authors = conference.authors;
        const reviewers = conference.reviewers;
        var authorDetails = await getAuthors(authors);
        console.log("################################")
        console.log(authorDetails);

        var reviewerDetails = await getAuthors(reviewers);
        console.log("################################")
        console.log(reviewerDetails);
        const resObj = {
          title: conference.title,
          description: conference.description,
          venue: conference.venue,
          authors: conference.authors,
          researchArea: conference.researchArea,
          reviewers: conference.reviewers,
          authors: authorDetails,
          reviewers: reviewerDetails
        }

        res.status(200).json(resObj);
      } else {
        res.status(400).json("Access Denied")
      }
    }







  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};


const submitFeedback = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    if (token.length != 24) {
      res.status(400).status("Invalid Link");
    }
    const author = await Author.findOne({
      _id: req.author._id
    });
    if (!author) {
      res.status(400).status("Invalid Link");
    }
    const paper = await Paper.findOne({
      _id: token
    });
    if (!paper) {
      res.status(400).status("Invalid Link");
    }

    const too = await Author.findOne({
      _id: paper.author_id
    })
    const sendTo = too.email;
    const sendToo = sendTo.replaceAll('\'', '');

    const respObj = req.body;
    const details = [{
        ques: "How well does the proposal meet the conference theme ?",
        ans: respObj[0].toString(),
      },
      {
        ques: "What is overall conceptual quality of the paper ?",
        ans: respObj[1].toString(),
      },
      {
        ques: "Originality, novelty and innovation of the work ?",
        ans: respObj[2].toString(),
      },
      {
        ques: "Overall evaluation :",
        ans: respObj[3].toString(),
      },
      {
        ques: "Grammar :",
        ans: respObj[4].toString(),
      },
    ]
    console.log("##################################")
    console.log(details);

    const responseObject={
      details:details,
      reviewer_id : author._id,

    }

    paper.feedback_ids.push(responseObject);
    await paper.save()

    const path = "/paper/" + token;
    res.status(200).json(path)

    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: sendToo,
        subject: 'Feedback regarding your recent paper submission titled: ' + paper.title,
        html: `
            <p>A new feedback received has been for the subject titled paper has been received</p>
            `,
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};


const checkIfReviewer = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    if (token.length != 24) {
      res.status(400).status("Invalid Link");
    }
    const id = req.author._id;
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const paper = await Paper.findOne({
      _id: token
    });
    if (!paper) {
      res.status(400).status("Invalid Link");
    }
    const conference = await Conference.findOne({
      paper_urls: paper._id
    });

    const reviewers = conference.reviewers;

    const check = await checkAddAuthor(reviewers, author._id);

    // if(check===true){
    res.status(200).json(check);
    // }


  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const showFeedback = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    if (token.length != 24) {
      res.status(400).json("Invalid Link");
    }
    else{
      const id = req.author._id;
      const author = await Author.findOne({
        _id: id
      });
      if (!author) res.status(400).json("Author doesn't exist in Database");
      else{
        const paper_id=req.params.id;
        if(paper_id.length != 24){
          res.status(400).json("Invalid Link");
        }
        else{
          const paper=await Paper.findOne({_id:paper_id})
          if(!paper)
          res.status(400).json("Invalid Link");

          const feedback= paper.feedback_ids.filter(function (el) {
            return el._id !== token;
          });
          // check=false;
          console.log(feedback)
          check=false
          console.log(paper.author_id);
          console.log(author._id);
          console.log(feedback[0].reviewer_id);
          if(paper.author_id.toString()===author._id.toString()){
            check=true;
          }
          else if(author._id.toString()===feedback[0].reviewer_id.toString())
          {
            check=true;
          }
          else
          {
            check=false;
          }
          if(check===false){
            res.status(400).json("Access Denied")
          }
          else
          res.status(200).json(feedback[0].details);
        }


      }

    }

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const checkPendingRequests = (pending_requests, user_id,conf_id) => {
  let users = false;
  return Promise.all(
    pending_requests.map(async item => {
      ;
      if (item.user_id.toString() === user_id.toString() && item.conference_id.toString()===conf_id.toString()) {
        users = true;
      }
    })
  ).then(() => {
    console.log('Items processed');
    return users;
  });

};


const requestAuthorRole = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference) {
      res.status(400).json("Invalid Link")
    }
    console.log(conference)

    //CHECK IF ALREADY REQUESTED

    const chairperson_id=conference.chairperson;

    const chairperson=await Author.findOne({_id:chairperson_id})

    const pending_requests=chairperson.pending_requests;

    const check=await checkPendingRequests(pending_requests,author._id,conference._id)

    if(check){
      res.status(400).json("You have already requested for either author or reviewer to this conference")
    }
    else{
      const responseObject={
        conference_titile:conference.title,
        user_id:author._id,
        user_firstName:author.firstName,
        user_LastName:author.lastName,
        conference_id:conference._id,
        role:"Author",
      }
      pending_requests.push(responseObject);
      await chairperson.save();

      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASS
        }
      });
      transporter
        .sendMail({
          from: process.env.GMAIL_ID,
          to: chairperson.email,
          subject: 'New pending request',
          html: `
                          <p>A new author request has been recievd. Kindly check your pending request section for further details</p>
                          `,
        })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });

      res.status(200).json("Requested Successfully! Wait for the chairperson to approve")



    }

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const requestReviwerRole = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id = req.params.token;
    if (conf_id.length != 24) {
      res.status(400).json("Invalid Link")
    }
    const conference = await Conference.findOne({
      _id: conf_id
    });
    if (!conference) {
      res.status(400).json("Invalid Link")
    }
    console.log(conference)

    //CHECK IF ALREADY REQUESTED


    const chairperson_id=conference.chairperson;

    const chairperson=await Author.findOne({_id:chairperson_id})

    const pending_requests=chairperson.pending_requests;

    const check=await checkPendingRequests(pending_requests,author._id,conference._id)

    if(check){
      res.status(400).json("You have already requested for either author or reviewer to this conference")
    }
    else{
      const responseObject={
        conference_titile:conference.title,
        user_id:author._id,
        user_firstName:author.firstName,
        user_LastName:author.lastName,
        conference_id:conference._id,
        role:"Reviewer",
      }
      pending_requests.push(responseObject);
      await chairperson.save();

      const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASS
        }
      });
      transporter
        .sendMail({
          from: process.env.GMAIL_ID,
          to: chairperson.email,
          subject: 'New pending request',
          html: `
                          <p>A new reviewer request has been recievd. Kindly check your pending request section for further details</p>
                          `,
        })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });

      res.status(200).json("Requested Successfully! Wait for the chairperson to approve")



    }

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const showPendingRequests = async (req, res) => {
  try {
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");


    console.log(author.pending_requests);

    res.status(200).json(author.pending_requests)

  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

const approveRequest = async (req,res)=>{
  try{
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id=req.body.conf_id;
    const user_id=req.body.user_id;
    const role=req.body.role;
    const conference= await Conference.findOne({_id:conf_id});

    if (!conference) {
      res.status(400).json("Invalid Link")
    }

    const newData = author.pending_requests.filter(function (el) {
      return el.conference_id !== conf_id &&
             el.user_id !== user_id &&
             el.role !== role;
    });

    author.pending_requests=newData;
    await author.save()

    if(role==="Author"){
      conference.authors.push(user_id);
      await conference.save();

    }
    else{
      conference.reviewers.push(user_id);
      await conference.save();
    }
    const chairperson=await Author.findOne({_id:conference.chairperson});


    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });
    transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: chairperson.email,
        subject: 'Regaring your request at CMP',
        html: `
                        <p>Your request for the conf ${conference.titile} has been approved</p>
                        <p>Check your myConferences section for more details</p>
                        `,
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json("Request Approved")
  }
  catch(err){
    console.log(err);
    res.status(403).json(err);
  }
}

const rejectRequest = async (req,res)=>{
  try{
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const conf_id=req.body.conf_id;
    const user_id=req.body.user_id;
    const role=req.body.role;

    const newData = author.pending_requests.filter(function (el) {
      return el.conference_id !== conf_id &&
             el.user_id !== user_id &&
             el.role !== role;
    });

    author.pending_requests=newData;
    await author.save()

    const chairperson=await Author.findOne({_id:conference.chairperson});

    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
      }
    });
    transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: chairperson.email,
        subject: 'Regaring your request at CMP',
        html: `
                        <p>Your request for the conf ${conference.titile} has been Declined by the chairperson</p>
                        `,
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json("Request Rejected")
  }
  catch(err){
    console.log(err);
    res.status(403).json(err);
  }
}


const myFeedbacks = async (req,res)=>{
  try{
    const id = req.author._id;
    // console.log(id)
    const author = await Author.findOne({
      _id: id
    });
    if (!author) res.status(400).json("Author doesn't exist in Database");

    const token=req.params.token;
    if(token.length!==24){
      res.status(400).json("Invalid Link")
    }
    else{
      const paper =await Paper.findOne({_id:token})

      console.log(paper.author_id)
      console.log(author._id)

      if(paper.author_id.toString()===author._id.toString()){
        // console.log("HIIIIIIIII")
        const ids=paper.feedback_ids
        console.log(ids)
        res.status(200).json(ids)
      }
      else{
        const newData = paper.feedback_ids.filter(function (el) {
          return el.reviewer_id.toString() === author._id.toString() ;
        });

        res.status(200).json(newData)

      }
    }


  }
  catch(err){
    console.log(err);
    res.status(403).json(err);
  }
}



module.exports = {
  authorRegister,
  authorLogin,
  authorProfile,
  createConf,
  myConferences,
  showMySubs,
  showProfile,
  editProfile,
  updatePassword,
  submitRating,
  forgetPassword,
  resetPassword,
  updateConf,
  addAuthor,
  addReviewer,
  confDetail,
  submitFeedback,
  checkIfReviewer,
  showFeedback,
  requestReviwerRole,
  requestAuthorRole,
  showPendingRequests,
  approveRequest,
  rejectRequest,
  myFeedbacks
};
