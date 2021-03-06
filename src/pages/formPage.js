import "../styles.css";
import moneybag from "../images/svg/money-bag.svg";
import user from "../data.json";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// define global variables
let fieldsCheck;
let firstName,
  firstNameError,
  lastName,
  lastNameError,
  province,
  provinceError,
  email,
  emailError,
  dob,
  dobError,
  password,
  passwordError,
  bmdConsent,
  bmdConsentError;
let errorsDetected;
let globalUserSetter;

// form validation
let isNotEmpty = function (userInput) {
  let pattern = /^[a-zA-Z]+$/;
  if (pattern.test(userInput.field.value.trim())) {
    return true;
  }
  return false;
};
let isValidProvince = function (userInput) {
  let pattern = /^(BC|AB|MN|NB|NL|NWT|NS|NU|ON|PI|QC|SK|YK)$/;
  if (pattern.test(userInput.field.value.trim())) {
    return true;
  }
  return false;
};
let isValidEmail = function (userInput) {
  let pattern = /^[a-zA-Z0-9_.!#$%^&*()?~+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
  //  a-zA-Z0-9     ====>  Matches all letters and numbers,
  // _.!#$%^&*()?~+   ==>  Matches all those symbols.
  // +   ===============> Matches all the previous rules one or unlimited times.
  // @  ================> Matches the @
  // Then it is the anytext (did not include symbols) FOLLOWED by a dot ( \.  ), and whatever for the TLD.

  //The regex above is still too restrictive as basically any character from any character is allowed on email addresses. But it checks for a basic part1@part2.part3 pattern.
  if (pattern.test(userInput.field.value.trim())) {
    return true;
  }
  return false;
};
let isValidDate = function (userInput) {
  let pattern = /^[0-9]+[-|\/][0-9]+[-|\/][0-9]+$/;
  //Match any number for an unlimited amount of characters (probably could limit that to four at most)
  //Match either - or / ONCE.
  if (pattern.test(userInput.field.value.trim())) {
    return true;
  }
  return false;
};
let isValidPassword = function (userInput) {
  let invalidPattern = /^([^a-z]{1,}|[^A-Z]{1,}|[^0-9]{1,}|[^\W]{1,}|.{0,5})$/;
  //The pattern above matches INVALID passwords.
  // [^a-z]{1,} finds passwords that DO NOT have one or more lowercases
  // [^A-Z]{1,} finds passwords that do not have one or more uppercases.
  // [^\W]{1,} does not have at least one symbol
  // .{0,5} is less than 6 characters.
  if (invalidPattern.test(userInput.field.value.trim())) {
    return false; //This one returns false WHEN the pattern matches.
  }
  return true;
};
let hasUserAcceptedTerms = function (userInput) {
  if (userInput.field.checked) {
    return true;
  }
  return false;
};

let formChecker = function (e) {
  errorsDetected = 0;
  errorsReset();
  e.preventDefault(); //Prevent default form submit behavior.
  fieldsCheck.forEach((field) => {
    if (field.checker(field) === false) {
      field.error.innerText = field.msg;
      errorsDetected++;
    }
  });
  if (errorsDetected > 0) {
  } else {
    //Submit user data
    console.log("Awesome. You are ready to play");
    let lastParticipated = new Date().setYear(1980);
    let userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      province: province.value,
      email: email.value,
      dateOfBirth: dob.value,
      password: password.value,
      consent: bmdConsent.value,
      lastParticipated: lastParticipated,
      //lastParticipated : new Date()
    };
    user.user = [...user.user, userData];
    globalUserSetter(userData);
    console.log(user.user);
    return user.user;
  }
};

let errorsReset = function () {
  fieldsCheck.forEach((input) => {
    input.error.innerText = "";
  });
};

// get form values on load
let initForm = function (setUser) {
  //Setting the user setter here
  globalUserSetter = setUser;
  firstName = document.querySelector("#firstName");
  firstNameError = document.querySelector("#firstNameError");
  lastName = document.querySelector("#lastName");
  lastNameError = document.querySelector("#lastNameError");
  province = document.querySelector("#province");
  provinceError = document.querySelector("#provinceError");
  email = document.querySelector("#email");
  emailError = document.querySelector("#emailError");
  dob = document.querySelector("#dob");
  dobError = document.querySelector("#dobError");
  password = document.querySelector("#password");
  passwordError = document.querySelector("#passwordError");
  bmdConsent = document.querySelector("#bmd-consent");
  bmdConsentError = document.querySelector("#bmdConsentError");

  fieldsCheck = [
    {
      field: firstName,
      checker: isNotEmpty,
      error: firstNameError,
      msg: "Please enter your firstname.",
    },
    {
      field: lastName,
      checker: isNotEmpty,
      error: lastNameError,
      msg: "Please enter your lastname.",
    },
    {
      field: province,
      checker: isValidProvince,
      error: provinceError,
      msg: "Please enter a valid location.",
    },
    {
      field: email,
      checker: isValidEmail,
      error: emailError,
      msg: "Please enter a valid email.",
    },
    {
      field: dob,
      checker: isValidDate,
      error: dobError,
      msg: "Please enter a valid date",
    },
    {
      field: bmdConsent,
      checker: hasUserAcceptedTerms,
      error: bmdConsentError,
      msg: "Please accept the terms before proceeding.",
    },
    {
      field: password,
      checker: isValidPassword,
      error: passwordError,
      msg: "Password required lowercase, uppercase, numbers, symbols, and at least 8 characters. ",
    },
  ];

  let formSubmit = document.querySelector("#formSubmit");
  if (formSubmit) {
    formSubmit.addEventListener("click", formChecker);
  }
};

const FormPage = (props) => {
  // routing hooks
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/contest", { replace: true }),
    [navigate]
  );

  useEffect(() => {
    initForm(props.setUser);
  });

  return (
    <section id="main" className="main">
      <main className="main-container grid-container">
        <div className="grid-x grid-padding-x">
          <div id="advertisement-Panel" className="large-7 medium-6 small-12">
            <h1 className="brandName">BuyMore Dollars</h1>
            <h2>Scratch and Win Contest</h2>
            <p id="bmd-description">
              Sign up. Scratch! And claim your prize once every 72 hours.
            </p>
            <img src={moneybag} id="prizeBag" alt="logo" />
            <div className="bmd-prizes">
              <p>1 Prize of 10,000 BMD</p>
              <p>5 Prizes of 750 BMD</p>
              <p>10 Prizes of 100 BMD</p>
              <p>100 Prizes of 20 BMD</p>
            </div>
          </div>
          <div id="form-Panel" className="large-5 medium-6 small-12">
            <h3 id="bmd-form-title">Create an account</h3>
            <form id="bmd_form" action="#">
              <fieldset>
                <label htmlFor="firstName" className="firstName inputLabel">
                  First Name
                </label>
                <input name="firstName" id="firstName" type="text" />
                <p className="bmd-error" id="firstNameError"></p>
              </fieldset>
              <fieldset>
                <label htmlFor="lastName" className="lastName inputLabel">
                  Last Name
                </label>
                <input name="lastName" id="lastName" type="text" />
                <p className="bmd-error" id="lastNameError"></p>
              </fieldset>
              <fieldset>
                <label htmlFor="dob" className="dob inputLabel">
                  Date of Birth
                </label>
                <input type="date" id="dob" name="dob" />
                <p className="bmd-error" id="dobError"></p>
              </fieldset>
              <fieldset>
                <label htmlFor="province" className="province inputLabel">
                  Province
                </label>
                <select name="province" id="province">
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MN">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NWT">Northwest Territories</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NU">Nunavut</option>
                  <option value="ON">Ontario</option>
                  <option value="PI">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="YK">Yukon</option>
                </select>
                <p className="bmd-error" id="provinceError"></p>
              </fieldset>
              <fieldset>
                <label htmlFor="email" className="email inputLabel">
                  Email
                </label>
                <input name="email" id="email" type="text" />
                <p className="bmd-error" id="emailError"></p>
              </fieldset>
              <fieldset>
                <label htmlFor="password" className="password inputLabel">
                  Password
                </label>
                <input name="password" id="password" type="password" />
                <p className="bmd-error" id="passwordError"></p>
              </fieldset>
              <fieldset id="bmd-consent-fieldset" className="large-7 cell">
                <input id="bmd-consent" type="checkbox" />
                <label id="bmd-consent-label" htmlFor="bmd-consent">
                  I consent to the terms and conditions.
                </label>
              </fieldset>
              <p className="bmd-error" id="bmdConsentError"></p>
              <input
                type="submit"
                value="Let Me Play!"
                id="formSubmit"
                className="button"
                onClick={() => {
                  errorsDetected === 0 && handleOnClick();
                }}
              />
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default FormPage;
