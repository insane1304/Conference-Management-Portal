// const Blob = require('node-blob');

const { uploadDetailsValid} = require("../controllers/validation");
const Paper = require("../model/paper");
const Author = require("../model/author");
const Conference = require("../model/conference");

let express = require('express'),
    // multer = require('multer'),
    router = express.Router();

const { v4: uuidv4 } = require('uuid');
uuidv4();


function currDateTime() {
  var currentTime = new Date(Date.now());
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;
  var ISTTime = new Date(currentTime.getTime() +
    (ISTOffset + currentOffset)*60000);
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var secondsIST = ISTTime.getSeconds();
  var millisecondsIST = ISTTime.getMilliseconds();
  var time = hoursIST + ":" + minutesIST + ":" + secondsIST+":"+millisecondsIST;
  var mnth = currentTime.getMonth() + 1;
  var date_time = currentTime.getDate() +
    '-' + mnth +
    '-' + currentTime.getFullYear() + ' ' + time;
  return date_time;
}

const {doUpload} = require("../controllers/uploadFile")
const {getFile} = require("../controllers/uploadFile")

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const verify = require("../controllers/verifyToken");

router.post('/upload', verify, upload.single('file'), async (req, res, next) => {
  try{
      console.log(req.body);
      const id = req.author._id;
      const author = await Author.findOne({ _id: id });
      if (!author) res.status(400).json("Author doesn't exist in Database");

      const paper = new Paper(req.body);
      console.log(paper);
      const title=req.body.title;
      const abstract=req.body.abstract;
      const keywords=req.body.keywords;

      var conference_id="";
      const temp=req.body.url;

      // console.log(temp);
      const check1="/conference/";
      for(let i=0;i<temp.length;i++){
        if(i<check1.length)
        {
          continue;
        }
        else{
            if(temp[i]==='/')
            break;
            else conference_id+=temp[i];
        }
      }
      console.log(conference_id)

      const { error } = uploadDetailsValid(req.body)

      if (error!=undefined ){
        if(error.details[0].message===" \"file\" contains invalid value" ){
          return res.status(400).json("Please upload a file");
        }
         return res.status(400).json(error.details[0].message);
      }

      const file=req.file;
      if(file==undefined){
        return res.status(400).json({error:"Please upload a file"})
      }


      console.log(req.file);
      url= await doUpload(req.file);
      console.log(url);
      paper.url=url;
      paper.author_id=id;
      // paper.creation_date=currDateTime();


      const conference= await Conference.findOne({ _id: conference_id });
      if (!conference) res.status(400).json("Invalid conference link");
      paper.conference_id=conference._id;
      await paper.save();
      conference.paper_urls.push(paper._id);
      await conference.save();

      console.log(paper);
      return res.status(201).json({
                      url: url,
                      message:"File Uploaded"
                  })
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post('/fetchPdf', async (req, res) => {
    // console.log(req)
    console.log(req.body.file);
    pdf_data= await getFile(req.body.file).then(value => {
      console.log(value)
      res.status(201).json({
                      data: value,
                      message:"File Uploaded"
                  })
});



});

router.get("/", (req, res, next) => {
    certificate.find().then(data => {
        res.status(200).json({
            message: "Student Certificate Uploaded Successfully!",
            users: data
        });
    });
});

module.exports = router;
