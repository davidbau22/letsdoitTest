<template>
  <div class="register-container">
    <h1>Create account</h1>
    <form class="register-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Your name</label>
        <input type="text" id="name" v-model.trim="name" :class="{'error-input': nameError}" required>
        <span v-if="nameError" class="error-message">{{ nameError }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" :class="{'error-input': emailError}" required>
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password"  placeholder="Enter password">Password</label>
        <input type="password" id="password" v-model.trim="password" :class="{'error-input': passwordError}" required>
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>
      <button type="submit" class="register-button">Continue</button>
    </form>
  </div>
</template>


<script>
import router from "@/router";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
        console.log("exito!!");
        router.push({ path: "/login" })
      }
      } catch (error) {
        console.log(error);
      }
    },
    handleSubmit() {
      // Validar el campo de nombre
      if (this.name === '') {
        this.nameError = 'Por favor ingresa tu nombre'
      } else {
        this.nameError = ''
      }

      // Validar el campo de correo electrónico
      const emailRegex = /^\S+@\S+\.\S+$/
      if (this.email === '') {
        this.emailError = 'Por favor ingresa tu correo electrónico'
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Por favor ingresa un correo electrónico válido'
      } else {
        this.emailError = ''
      }

      // Validar el campo de contraseña
      if (this.password === '') {
        this.passwordError = 'Por favor ingresa tu contraseña'
      } else if (this.password.length < 8) {
        this.passwordError = 'La contraseña debe tener al menos 8 caracteres'
      } else {
        this.passwordError = ''
      }

      // Si no hay errores, enviar el formulario
      if (!this.nameError && !this.emailError && !this.passwordError) {
        console.log('Formulario enviado')
        // Llamamos a la función register() para enviar los datos al servidor
        this.register();
      }
    }
  }
}
</script>

<style>
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 30px;
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  .form-group {
    width: 100%;
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    outline: none;
    box-shadow: 0 0 5px #00bfff;
  }

  button[type="submit"] {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #00bfff;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #0099cc;
  }

</style>