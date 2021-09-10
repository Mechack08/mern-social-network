import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const ctrpwd = document.getElementById("controlPassword");
  const pwd = document.getElementById("password");
  const confirmPasswordError = document.querySelector(
    ".password-confirm.error"
  );

  //form valideted function
  const handleRegister = async (e) => {
    e.preventDefault();

    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const termsError = document.querySelector(".terms.error");

    confirmPasswordError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas.";
      if (!terms.checked)
        termsError.innerHTML = "Veillez accepter les conditions générales.";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            const errors = res.data.errors;
            pseudoError.innerHTML = errors.pseudo;
            emailError.innerHTML = errors.email;
            passwordError.innerHTML = errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //checked if password matched
  password &&
    ctrpwd.addEventListener("input", (e) => {
      if (password !== e.target.value) {
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas.";
      } else {
        confirmPasswordError.innerHTML = "";
      }
    });
  controlPassword &&
    pwd.addEventListener("input", (e) => {
      controlPassword !== e.target.value
        ? (confirmPasswordError.innerHTML =
            "Les mots de passe ne correspondent pas.")
        : (confirmPasswordError.innerHTML = "");
    });

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Inscription reussi, veillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="controlPassword">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />

          <input type="submit" value="Valider Incription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
