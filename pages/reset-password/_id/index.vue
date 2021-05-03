<template>
  <div>
    <section>
      <div
        class="columns is-centered"
        style="height: 80vh; align-items: center"
      >
        <div class="column is-6 has-text-centered">
          <h1 class="title is-2 pb-1">Reset your password</h1>
          <Notification v-if="success" type="success" :message="success" />
          <Notification v-if="error" type="danger" :message="error" />
          <div class="columns is-centered mx-2-mobile">
            <div class="column is-7">
              <form class="my-4" method="post" @submit.prevent="resetPassword">
                <b-field>
                  <b-input
                    v-model="password1"
                    type="password"
                    placeholder="New Password"
                    password-reveal
                    required
                    rounded
                  ></b-input>
                </b-field>
                <b-field>
                  <b-input
                    v-model="password2"
                    type="password"
                    password-reveal
                    placeholder="Confirm new Password"
                    required
                    rounded
                  ></b-input>
                </b-field>
                <div class="buttons is-centered mt-5">
                  <b-button
                    native-type="submit"
                    type="is-primary"
                    expanded
                    rounded
                  >
                    Reset password
                  </b-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Notification from '~/components/Notification'
export default {
  components: {
    Notification,
  },
  data() {
    return {
      password1: '',
      password2: '',
      token: null,
      error: null,
      success: null,
    }
  },
  mounted() {
    if (this.$route.params.id === undefined) {
      this.$router.push('/forgot-password')
    } else {
      this.token = this.$route.params.id
    }
  },
  methods: {
    async resetPassword() {
      this.error = null
      if (this.password1 !== this.password2) {
        this.error = 'Passwords do not match.'
        return
      }
      try {
        await this.$axios.post('auth/recover-password/' + this.token, {
          newPassword: this.password2,
        })
        this.success =
          'Password updated successfully. You can now use it to log in to your account.'
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      } catch (e) {
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
