import axios from "axios";
async function IsAuthenticated(){
  console.log("huI");
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

function IsAuth(){
  console.log(localStorage.token);
  const token=localStorage.token;
  if(token!==undefined){
    console.log(true);
    return true;
  }
  else {
    console.log(false);
    return false;
  }
}
export{IsAuthenticated,IsAuth};
