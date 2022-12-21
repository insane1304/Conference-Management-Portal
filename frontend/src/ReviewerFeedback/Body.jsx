import axios from "axios"
import {
  useState,
  useEffect
} from "react"
import {
  useHistory
} from "react-router";
const Feedback = () => {


  const [data, setData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const responseObject = {};
    const path = "/author/checkifreviewer" + window.location.pathname;
    axios
      .post(path, responseObject, {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        alert("INVALID LINK");
      });
  }, [isLoading]);

  const onSubmit = () => {
    var respObj = [];
    setSubmit(true);
    //##############################################################################################
    if (document.getElementById("q1a").checked) {
      respObj.push("Excellent");
    } else if (document.getElementById("q1b").checked) {
      respObj.push("Good");
    } else if (document.getElementById("q1c").checked) {
      respObj.push("Fair");
    } else if (document.getElementById("q1d").checked) {
      respObj.push("Poor");
    }
    //##############################################################################################
    if (document.getElementById("q2a").checked) {
      respObj.push("Excellent");
    } else if (document.getElementById("q2b").checked) {
      respObj.push("Good");
    } else if (document.getElementById("q2c").checked) {
      respObj.push("Fair");
    } else if (document.getElementById("q2d").checked) {
      respObj.push("Poor");
    }
    //##############################################################################################
    if (document.getElementById("q3a").checked) {
      respObj.push("Excellent");
    } else if (document.getElementById("q3b").checked) {
      respObj.push("Good");
    } else if (document.getElementById("q3c").checked) {
      respObj.push("Fair");
    } else if (document.getElementById("q3d").checked) {
      respObj.push("Poor");
    }
    //##############################################################################################
    if (document.getElementById("q4a").checked) {
      respObj.push("Excellent");
    } else if (document.getElementById("q4b").checked) {
      respObj.push("Good");
    } else if (document.getElementById("q4c").checked) {
      respObj.push("Fair");
    } else if (document.getElementById("q4d").checked) {
      respObj.push("Poor");
    }
    //##############################################################################################
    if (document.getElementById("q5a").checked) {
      respObj.push("Excellent");
    } else if (document.getElementById("q5b").checked) {
      respObj.push("Good");
    } else if (document.getElementById("q5c").checked) {
      respObj.push("Fair");
    } else if (document.getElementById("q5d").checked) {
      respObj.push("Poor");
    }
    //##############################################################################################

    console.log(respObj);
    const path = "/author" + window.location.pathname;
    axios
      .post(path, respObj, {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        alert("Feedback Submitted Successfully");
        history.push(response.data);
      })
      .catch((error) => {
        console.log(error)
        alert("INVALID LINK");
        setSubmit(false);
      });
  }

  if (isLoading) {
    return ( <
      div className = "text-center" >
      <
      div className = "spinner-border text-info m-3"
      role = "status" >
      <
      span className = "sr-only p-2" > Loading... < /span> <
      /div> <
      /div>
    );
  } else
    return ( <
      div > {
        (() => {
          if (data === true) {
            return ( <
              div className = "card card-margin" >
              <
              div >
              <
              h1 className = "feedback-title-ontop" > Paper evaluation < /h1> <
              /div>

              <
              hr / >

              <
              form >
              <
              div className = "card-body" >
              <
              h5 > How well does the proposal meet the conference theme ? ( * ) < /h5> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              id = "q1a"
              value = "Excellent"
              defaultChecked >
              < /input> <
              label class = "form-check-label"
              for = "q1a" >
              4 : Excellent <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Good"
              id = "q1b" >
              < /input> <
              label class = "form-check-label"
              for = "q1b" >
              3: Good <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Fair"
              id = "q1c" >
              < /input> <
              label class = "form-check-label"
              for = "q1c" >
              2: Fair <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Poor"
              id = "q1d" >
              < /input> <
              label class = "form-check-label"
              for = "q1d" >
              1: Poor <
              /label> <
              /div> <
              /div> <
              /form>

              <
              hr / >

              <
              form >
              <
              div className = "card-body" >
              <
              h5 > What is overall conceptual quality of the paper ? ( * ) < /h5> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Excellent"
              id = "q2a"
              defaultChecked >
              < /input> <
              label class = "form-check-label"
              for = "q2a" >
              4 : Excellent <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Good"
              id = "q2b" >
              < /input> <
              label class = "form-check-label"
              for = "q2b" >
              3: Good <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Fair"
              id = "q2c" >
              < /input> <
              label class = "form-check-label"
              for = "q2c" >
              2: Fair <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Poor"
              id = "q2d" >
              < /input> <
              label class = "form-check-label"
              for = "q2d" >
              1: Poor <
              /label> <
              /div> <
              /div> <
              /form>

              <
              hr / >

              <
              form >
              <
              div className = "card-body" >
              <
              h5 > Originality, novelty and innovation of the work ? ( * ) < /h5> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Excellent"
              id = "q3a"
              defaultChecked >
              < /input> <
              label class = "form-check-label"
              for = "q3a" >
              4 : Excellent <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Good"
              id = "q3b" >
              < /input> <
              label class = "form-check-label"
              for = "q3b" >
              3: Good <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Fair"
              id = "q3c" >
              < /input> <
              label class = "form-check-label"
              for = "q3c" >
              2: Fair <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Poor"
              id = "q3d" >
              < /input> <
              label class = "form-check-label"
              for = "q3d" >
              1: Poor <
              /label> <
              /div> <
              /div> <
              /form>

              <
              hr / >

              <
              form >
              <
              div className = "card-body" >
              <
              h5 > Overall evaluation( * ) < /h5> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Excellent"
              defaultChecked id = "q4a" >
              < /input> <
              label class = "form-check-label"
              for = "q4a" >
              4: Excellent <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Good"
              id = "q4b" >
              < /input> <
              label class = "form-check-label"
              for = "q4b" >
              3: Good <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Fair"
              id = "q4c" >
              < /input> <
              label class = "form-check-label"
              for = "q4c" >
              2: Fair <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Poor"
              id = "q4d" >
              < /input> <
              label class = "form-check-label"
              for = "q4d" >
              1: Poor <
              /label> <
              /div> <
              /div> <
              /form>

              <
              hr / >

              <
              form >
              <
              div className = "card-body" >
              <
              h5 > Grammar( * ) < /h5> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              defaultChecked value = "Excellent"
              id = "q5a" >
              < /input> <
              label class = "form-check-label"
              for = "q5a" >
              4: Excellent <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Good"
              id = "q5b" >
              < /input> <
              label class = "form-check-label"
              for = "q5b" >
              3: Good <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Fair"
              id = "q5c" >
              < /input> <
              label class = "form-check-label"
              for = "q5c" >
              2: Fair <
              /label> <
              /div> <
              div class = "form-check" >
              <
              input class = "form-check-input"
              type = "radio"
              name = "flexRadioDefault"
              value = "Poor"
              id = "q5d" >
              < /input> <
              label class = "form-check-label"
              for = "q5d" >
              1: Poor <
              /label> <
              /div> <
              /div> <
              /form>

              <
              hr / >

              <
              div >
              <
              button className = "btn btn-danger feedback-button"
              disabled = {
                submit
              }
              onClick = {
                onSubmit
              } >
              Submit review <
              /button> <
              /div> <
              /div>
            )
          } else {
            return ( <
              div className = "access-denied" >
              <
              h2 > Access Denied < /h2> <
              p > You are not a allowed to review this paper < /p> <
              /div>
            )
          }
        })()
      } <
      /div>

    );
}

export default Feedback;