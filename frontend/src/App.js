import React from "react";
import "./App.css";

import AuthorProtectedRoute from "./auth/AuthorProtectedRoute";
import NoLoggedRoute from "./auth/NoLoggedRoute";

import { Redirect, Route, Switch } from "react-router-dom";

import AppHome from "./HomePage/AppHome.jsx";
import Login from "./LoginSignup/login-page";
import SignUp from "./LoginSignup/signup-page";
import AppUser from "./UserPage/AppUser.jsx";
import Upload from "./UploadPaper/AppUpload.jsx";
import CreateConf from "./CreateConf/App.jsx";

import ShowConf from "./ShowConf/ShowConf.jsx";
import ShowPapers from "./ShowPapers/ShowPapers.jsx";
import PaperDetail from "./PaperDetail/PaperDetail.jsx";

import ShowAllConf from "./ShowAllConf/Search.jsx";
import App_EditProfile from "./EditProfile/App_EditProfile.jsx";
import App_UpdatePassword from "./EditProfile/App_UpdatePassword.jsx";
import ShowMySubs from "./ShowMySubs/ShowPapers.jsx";
import ShowProfile from "./ShowProfile/ShowProfile.jsx";
import ForgetPass from "./ForgetPassword/ForgotPass/App";
import ResetPass from "./ForgetPassword/ResetPass/App";
import EditConf from "./EditConf/App";
import ReviewerFeedback from "./ReviewerFeedback/App";
import ShowFeedback from "./ShowFeedback/App";
import PendingRequests from "./PendingRequests/App";
import MyFeedbacks from "./MyFeedbacks/MyFeedbacks";

function App() {
    return (
        <React.Fragment>
            <Switch>

            <Route exact path="/allconferences" component={ShowAllConf} />
            <Route exact path="/paper/:token" component={PaperDetail} />
            <Route exact path="/" component={AppHome} />

            <Route exact path="/conference/:token" component={ShowPapers} />


            <Route exact path="/profile/:token" component={ShowProfile} />
                <NoLoggedRoute exact path="/login" component={Login}/>
                <NoLoggedRoute exact path="/signup" component={SignUp} />
                <NoLoggedRoute exact path="/forgetpass" component={ForgetPass} />
                <NoLoggedRoute exact path="/resetpass/:token" component={ResetPass} />



                <AuthorProtectedRoute exact path="/myfeedbacks/:token" component={MyFeedbacks} />
                <AuthorProtectedRoute exact path="/showfeedback/myfeedbacks/:token/:token" component={ShowFeedback} />
                <AuthorProtectedRoute exact path="/givefeedback/:token" component={ReviewerFeedback} />
                <AuthorProtectedRoute exact path="/pendingrequests" component={PendingRequests} />
                <AuthorProtectedRoute exact path="/user" component={AppUser} />
                <AuthorProtectedRoute exact path="/editprofile" component={App_EditProfile} />
                <AuthorProtectedRoute exact path="/editconf/:token" component={EditConf} />
                <AuthorProtectedRoute exact path="/updatepassword" component={App_UpdatePassword} />
                <AuthorProtectedRoute exact path="/create-conf" component={CreateConf} />
                <AuthorProtectedRoute exact path="/myconferences" component={ShowConf} />
                <AuthorProtectedRoute exact path="/conference/:token/mysubmittions" component={ShowMySubs} />
                <AuthorProtectedRoute exact path="/conference/:token/upload" component={Upload} />
                <Route exactpath="/home" >
                  <Redirect to="/" />
                </Route>

                <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
