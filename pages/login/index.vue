<template>
  <div class="mt-6">
    <form method="post" @submit.prevent="login">
      <div class="modal-card" style="width: 300px">
        <section class="modal-card-body">
          <b-field>
            <b-input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              rounded
            >
            </b-input>
          </b-field>

          <b-field class="mb-3">
            <b-input
              v-model="password"
              type="password"
              password-reveal
              placeholder="Password"
              required
              rounded
            >
            </b-input>
          </b-field>
          <b-button
            v-if="loadingButton"
            native-type="submit"
            label="Login"
            type="is-primary"
            expanded
            rounded
          />
          <b-button v-else type="is-primary" rounded expanded
            >Logging in
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-small"
              custom-class="fa-spin ml-4"
            ></b-icon
          ></b-button>
          <div class="is-flex is-justify-content-center my-2">
            <Notification v-if="error" :message="error" />
          </div>
          <p class="subtitle is-7 has-text-centered">Login for Admin panel</p>
        </section>
      </div>
    </form>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
export default {
  components: {
    Notification,
  },
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      loadingButton: true,
      error: null,
    }
  },
  methods: {
    async login() {
      this.loadingButton = false
      this.error = null
      try {
        await this.$auth.loginWith('admin', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.loadingButton = true

        this.$router.push('/admin')
        this.$buefy.toast.open({
          message: 'Welcome again ' + this.loggedInUser.firstName + '!',
          type: 'is-success',
        })
      } catch (e) {
        this.loadingButton = true
        if (e.response.data.message != null) {
          this.error = e.response.data.message
        } else {
          this.error = e.response.data.error
        }
      }
    },
  },
}
</script>

<style></style>
