import axios from "axios";
async function isAuthenticated(){
  const responseObject={check:true};
  const path="/author/isauth";
  var result=false;
  await axios
      .post(path, responseObject, {
          headers: {
              "auth-token": localStorage.token,
              "Content-Type": "application/json",
          },
      })
        .then((response) => {
          console.log(response.data)
          if(response.data==="true"){
            result= true;
          }
          else result= false;

        })
        .catch((error) =>{
           console.log(error)
           // alert("INVALID LINK");
        });
        return result;
}

class Auth {
    constructor() {
        this.authenticatedStudent = false;
        this.authenticatedAdmin = false;
        this.authenticatedAuthor = false;
    }

    loginStudent(callback) {
        this.authenticatedStudent = true;
        callback();
    }
    loginAuthor(callback) {
        this.authenticatedAuthor = true;
        callback();
    }

    loginAdmin(callback) {
        this.authenticatedAdmin = true;
        callback();
    }

    logoutStudent(callback) {
        this.authenticatedStudent = false;
        callback();
    }
    logoutAuthor(callback) {
        this.authenticatedAuthor = false;
        callback();
    }

    logoutAdmin(callback) {
        this.authenticatedAdmin = false;
        callback();
    }

    isAuthenticatedStudent() {

        return this.authenticatedStudent;
    }
    isAuthenticatedAuthor() {
      if(localStorage.token!=undefined){
        return true;
      }
      else return false;
        return this.authenticatedAuthor;
    }

    isAuthenticatedAdmin() {
        return this.authenticatedAdmin;
    }

}

export default new Auth();
