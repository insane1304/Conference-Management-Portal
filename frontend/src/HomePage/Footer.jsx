import React from "react";
import ReactDOM from "react-dom";
import "./compStyles.css";

const y = new Date();
const ye = y.getFullYear();

function Footer() {
  return (
    <div class="container">
      <hr></hr>
      <footer class="py-5">
        <div class="row">
          <div class="col-4">
            <h5>Services</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Create conference
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Registration
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Invitation
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Upload paper
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Review paper
                </a>
              </li>
            </ul>
          </div>

          <div class="col-4">
            <h5>Contact Us</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Email
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Twitter
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Facebook
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Linkedin
                </a>
              </li>
              {/* <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  About
                </a>
              </li> */}
            </ul>
          </div>

          <div class="col-4">
            <h5>Other</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Recent conferences
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Feedback
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Overview
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted">
                  Visiting
                </a>
              </li>
              <li class="nav-item mb-2">
                <a class="nav-link p-0 text-muted">FAQs</a>
              </li>
            </ul>
          </div>

          {/* <div class="col-4 offset-1">
            <form>
              <h5>..</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div class="d-flex w-100 gap-2">
                <label for="newsletter1" class="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  class="form-control"
                  placeholder="Email address"
                ></input>
                <button class="btn btn-primary" type="button">
                  Send
                </button>
              </div>
            </form>
          </div> */}
        </div>

        <div class="d-flex justify-content-between py-4 my-4 border-top">
          <p>Conference management portal© {ye}, Inc. All rights reserved.</p>
          <ul class="list-unstyled d-flex">
            <p>
              <a href="#">Twitter</a> | <a href="#">Facebook</a> |{" "}
              <a href="#">Linkedin</a>
            </p>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
