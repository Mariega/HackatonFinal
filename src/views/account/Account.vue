<template>
  <div id="view-account">
    <h1>Perfil</h1>
    <form class="form" @submit.prevent="handleSubmit" action>
      <h2>Configuración de cuenta</h2>
      <Input
        @input="(value) => (username = value)"
        :value="username"
        placeholder="Usuario"
        label="Nombre de Usuario"
        required
        disabled
      />
      <Input
        @input="(value) => (password = value)"
        :value="password"
        type="password"
        placeholder="Escriba aqui"
        label="Contraseña actual"
        required
      />
      <Input
        @input="(value) => (password = value)"
        :value="password"
        type="password"
        placeholder="Escriba aqui"
        label="Nueva contraseña"
        required
      />
      <Input
        @input="(value) => (password = value)"
        :value="password"
        type="password"
        placeholder="Escriba aqui"
        label="Confirmar nueva contraseña"
        required
      />
      <Button class="btn" type="secondary">Guardar Cambios</Button>
    </form>
    <form class="form" @submit.prevent="handleSubmit" action>
      <h2>Mi Perfil</h2>
      <Input
        @input="(value) => (profile = value)"
        :value="profile"
        placeholder="Perfil"
        label="Perfil"
        required
        class="perfil"
      />
      <Input
        @input="(value) => (specialization = value)"
        :value="specialization"
        placeholder="Escriba aqui"
        label="Programa de especialización"
        required
        disabled
      />
      <Input
        @input="(value) => (phone = value)"
        :value="phone"
        placeholder="Escriba aqui"
        label="Celular"
        required
      />
      <Input
        @input="(value) => (place = value)"
        :value="place"
        placeholder="Sede"
        label="Sede"
        required
        disabled
      />
      <Input
        @input="(value) => (email = value)"
        :value="email"
        placeholder="Escriba aqui"
        label="Correo Electrónico"
        required
      />
      <Button class="btn" type="secondary">Guardar Cambios</Button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_USER } from "@/views/auth/store/mutatios-type";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
export default {
  name: "Account",
  components: {
    Input,
    Button
  },
  data() {
    return {
      username: "",
      password: "",
      profile: "",
      phone: "",
      place: "",
      specialization: "",
      email: "",
      id: ""
    };
  },
  computed: {
    ...mapState({
      user(state) {
        console.log("state.authStore.user", state.authStore.user);
        this.username = state.authStore.user.username;
        this.password = state.authStore.user.password;
        this.profile = state.authStore.user.profile;
        this.phone = state.authStore.user.phone;
        this.place = state.authStore.user.place;
        this.specialization = state.authStore.user.specialization;
        this.email = state.authStore.user.email;
        this.id = state.authStore.user.id;
      }
    })
  },
  watch: {
    user(user) {
      console.log("user", user);
    }
  },
  methods: {
    ...mapMutations({
      setUser: `authStore/${SET_USER}`
    }),
    handleSubmit() {
      fetch(
        `https://my-json-server.typicode.com/Mariega/jsonServerHackatonFinal/users/${this.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            profile: this.profile,
            email: this.email,
            phone: this.phone
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      )
        .then(response => response.json())
        .then(user => this.setUser(user));
    }
  }
};
</script>

<style lang="scss" scoped>
#view-account {
  padding: 30px;
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3%;
    grid-row-gap: 30px;
    margin: 40px 0 40px 0;
    > * {
      margin: 20px 0 20px 0;
    }
    @media (max-width: 700px) {
      display: block;
    }
    .perfil {
      grid-column: 1/3;
    }
    > h2 {
      grid-column: 1 / 3;
      font-size: 20px;
    }
    .btn {
      grid-column: 2/3;
      @media (max-width: 900px) {
        grid-column: 1/3;
      }
    }
  }
}
</style>