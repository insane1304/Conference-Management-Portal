const authorRouter = require("express").Router();
const verify = require("../controllers/verifyToken");
// const isAuthenticated = require("../controllers/isAuth");

const {
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
  requestAuthorRole,
  requestReviwerRole,
  showPendingRequests,
  approveRequest,
  rejectRequest,
  myFeedbacks,

} = require("../controllers/authorController");

authorRouter.post("/register", authorRegister);

authorRouter.post("/login", authorLogin);
// authorRouter.post("/isauth", isAuthenticated);

// router.get("/timetable", verify, studentTimetable);
//
authorRouter.get("/profile", verify, authorProfile);

authorRouter.post("/createConf", verify, createConf);

authorRouter.get("/myconferences", verify, myConferences);

authorRouter.post("/showmysubs/conference/:id/mysubmittions", verify, showMySubs);


authorRouter.post("/showprofile/profile/:id", verify, showProfile);

authorRouter.post("/submitrating/paper/:id", verify, submitRating);

authorRouter.post("/editprofile", verify, editProfile);

authorRouter.post("/updatepassword", verify, updatePassword);

authorRouter.post("/forgetpass", forgetPassword);

authorRouter.post("/resetpass/:token", resetPassword);

authorRouter.post("/editconf/:token", verify, updateConf);

authorRouter.post("/addauthor/editconf/:token", verify, addAuthor);

authorRouter.post("/addreviewer/editconf/:token", verify, addReviewer);

authorRouter.get("/editconf/:token", verify, confDetail);

authorRouter.post("/givefeedback/:token", verify, submitFeedback);

authorRouter.post("/checkifreviewer/givefeedback/:token", verify, checkIfReviewer);

authorRouter.post("/showfeedback/myfeedbacks/:id/:token", verify, showFeedback);

authorRouter.post("/request-author-role/conference/:token", verify, requestAuthorRole);

authorRouter.post("/request-reviewer-role/conference/:token", verify, requestReviwerRole);

authorRouter.get("/get-pending-requests", verify, showPendingRequests);

authorRouter.post("/approve-request", verify, approveRequest);

authorRouter.post("/reject-request", verify, rejectRequest);
authorRouter.post("/myfeedbacks/:token", verify, myFeedbacks);


module.exports = authorRouter;
