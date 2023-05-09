<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" v-model="password">
      </div>
      <div class="form-control">
        <button type="submit">Login</button>
      </div>
    </form>
    <div class="register">
      <p>Don't have an account? <a href="#" @click="goToRegister">Register</a></p>
    </div>
  </div>
</template>


<script>
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const token = data.token;
        console.log(data.token);
        sessionStorage.setItem("jwt", token);
        console.log("exito!!");
        router.push({ path: "/home" })
      } else {
        console.error(data.message);
      }
    },

    goToRegister() {
      router.push({ path: "/register" });
    },

  },


};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #c1e1fc;
}

h1 {
  margin-top: 0;
  font-size: 2.5rem;
  color: #2196F3;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 100%;
}

.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

input[type="text"], input[type="password"] {
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #f9f9f9;
}

input[type="text"]:focus, input[type="password"]:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgba(33, 150, 243, 0.8);
}

button[type="submit"] {
  background-color: #2196F3;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0d8bf1;
}

.register {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;
}

.register a {
  color: #2196F3;
  text-decoration: none;
}

.register a:hover {
  text-decoration: underline;
}
</style>
