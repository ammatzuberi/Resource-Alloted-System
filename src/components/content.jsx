import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import styled from "styled-components";
import Navbar from "../Navbar";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import authService from "../context/auth.server";

import * as postmark from "postmark";
import "./login.css";
import axios from "axios";
import { email } from "react-admin";
// import { Logout } from "react-admin";

// npm i @emailjs/browsers
const url = "http://localhost:5000/issue/addIssue";
const get_email = "http://localhost:5000/issue/getUserIssues";
const postmarkEmail = "https://api.postmarkapp.com/email";

// var postmark = require("postmark");s

var serverToken = "51d9f0ab-51f5-447e-9bd5-259a2db2f3f5";
var client = new postmark.ServerClient(serverToken);

const Contact = () => {
  var tkn = JSON.parse(localStorage.getItem("user"));
  var user_email = tkn?.email;

  var newtoken = tkn.token;

  const [data, setData] = useState({
    name: "",
    email_user: "",
    date: "",
    supervisor: "",
    // productType: "",
    need: "",
    department: "",
    remarks: "",
  });

  // console.log("email");
  const get_emailValue = () => {
    document.getElementById("email_user").value = user_email;
    let useremaildata = data;
    useremaildata.email_user = user_email;
    setData(useremaildata);
  };

  // console.log(document.getElementById("email_user"))
  // console.log(user_email)
  const statuscheck = () => {
    window.location.href = "/";
  };

  function handlesubmit() {
    authService.logout();
  }

  var tkn = JSON.parse(localStorage.getItem("user"));
  // console.log(tkn.token);
  // console.log(tkn.role);
  var role = tkn.role;
  var newtoken = tkn.token;

  const form = useRef();

  useEffect(() => {
    get_emailValue();
  }, []);

  const postmarkMail = async (e) => {
    await axios
      .post(
        postmarkEmail,
        {
          From: "ammatzuberi@enggenv.com",
          To: "shehryarsmadil@enggenv.com",
          Subject: "Test",
          TextBody: "Hello from Postmark!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Postmark-Server-Token": serverToken,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )

      .then((res) => {
        console.log(res);
        alert("message sent form postmark ");
        window.location.href = "/";
      });
  };

  const sendEmail = (e) => {
    console.log(url);
    e.preventDefault();
    axios
      .post(
        url,
        {
          name: data.name,
          email: data.email_user,
          supervisor: data.supervisor,
          date: data.date,
          productType: data.productType,
          need: data.need,
          department: data.department,
          remarks: data.remarks,
        },
        {
          headers: {
            "x-api-key": newtoken,
            // "X-Postmark-Server-Token":serverToken,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("message sent Successfully ");
        window.location.href = "/";
      })

      .then(
        (result) => {
          console.log(result.text);
          alert("message sent ");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function handle(e) {
    const newdata = { ...data };
    // newdata = { ...data, [e.target.id]: e.target.value };
    newdata[e.target.id] = e.target.value;
    // user_email=data;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <>
      <Navbar />

      <div className="">
        <form ref={form} onSubmit={sendEmail} className="content">
          <div
            className="row"
            style={{
              display: "flex",

              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <h2 className="headingform"> E&E RESOURCE REQUEST FORM </h2>
          </div>
          <div className="row">
            <div className="col">
              <label>Name</label>
              <input
                onChange={(e) => handle(e)}
                value={data.name}
                id="name"
                type="te  xt"
                name="to_name"
                required
                className="form-control"
                placeholder="Please Enter Your Name"
              />
            </div>
            <div className="col">
              <label>Email</label>
              <input
                onChange={(e) => handle(e)}
                value={data.email}
                id="email_user"
                type="email"
                name="from_name"
                required
                className="form-control"
                placeholder="Please Enter Your Email"
              />
            </div>
            <div className="col">
              <label>Date</label>
              <input
                onChange={(e) => handle(e)}
                value={data.date}
                id="date"
                type="date"
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col" required>
              <label>Supervisor</label>
              <select
                className="form-control"
                onChange={(e) => handle(e)}
                value={data.supervisor}
                id="supervisor"
                name="head"
                required
              >
                <option value=""> --Select--</option>
                <option name="head">Shah Saud Abdali</option>
                <option name="head">Syed Abu Rehan</option>
                <option name="head">Mohammad Hamza</option>
                <option name="head">Mohammad Munzir</option>
                <option name="head"> Mehtaab Ahmad</option>
                <option name="head">Naseem beig</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Item Need</label>

              <input
                onChange={(e) => handle(e)}
                value={data.need}
                name="need"
                id="need"
                type="text"
                className="form-control"
                placeholder="Enter  Your Need. "
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Department </label>
              <select
                className="form-control"
                onChange={(e) => handle(e)}
                value={data.department}
                id="department"
                name="Department"
                required
              >
                <option value=""> --Select--</option>
                <option name="Department">PIEZO</option>
                <option name="Department">R&D </option>
                <option name="Department"> IT</option>
                <option name="Department">Sale & Finance </option>
                <option name="Department">SITE ENGINEER </option>
              </select>
            </div>

            <div className="col">
              <label> Remarks</label>
              <textarea
                onChange={(e) => handle(e)}
                value={data.remarks}
                id="remarks"
                name="message"
                className="form-control"
                placeholder="Enter Details.."
                required
              />
            </div>

            <input
              type="submit"
              className="btnsumbit"
              value="Send For Approval "
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
