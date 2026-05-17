import { app } from "./firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const auth = getAuth(app);

/* =========================
   SIGNUP
========================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const loadingBox = document.getElementById("loadingBox");

    if (loadingBox) {
      loadingBox.style.display = "flex";
    }

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {

        const user = userCredential.user;

        // Kullanıcı adını kaydet
        localStorage.setItem("username", username);

        // Admin kontrolü
        if (user.email === "mdadm1444@gmail.com") {

          localStorage.setItem("role", "admin");

        } else {

          localStorage.setItem("role", "user");

        }

        alert("Kayıt başarılı!");

        window.location.href = "../index.html";

      })

      .catch((err) => {

        if (loadingBox) {
          loadingBox.style.display = "none";
        }

        alert(err.message);

      });

  });

}

/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const loadingBox = document.getElementById("loadingBox");

    if (loadingBox) {
      loadingBox.style.display = "flex";
    }

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {

        const user = userCredential.user;

        // Şimdilik emaili username gibi kullan
        localStorage.setItem("username", email);

        // Admin kontrolü
        if (user.email === "mdadm1444@gmail.com") {

          localStorage.setItem("role", "admin");

          window.location.href = "../index.html";

        } else {

          localStorage.setItem("role", "user");

          window.location.href = "../index.html";

        }

      })

      .catch((err) => {

        if (loadingBox) {
          loadingBox.style.display = "none";
        }

        alert(err.message);

      });

  });

}