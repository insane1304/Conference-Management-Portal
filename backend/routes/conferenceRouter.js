const conferenceRouter = require("express").Router();

const {
  showPapers,
  getPaperDetail,
  getPaperTitle,
  showAllConf,
} = require("../controllers/conferenceController");

conferenceRouter.post("/showpapers/conference/:token", showPapers);
conferenceRouter.post("/getpaperdetail/paper/:id", getPaperDetail);
conferenceRouter.post("/getpapertitle", getPaperTitle);
conferenceRouter.get("/allconferences", showAllConf);

module.exports = conferenceRouter;
