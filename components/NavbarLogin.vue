<template>
  <div>
    <sign-up :is-active="isSignUpActive" @cancel="trashCancel" />
    <forgot-password
      :is-active="isForgotPasswordActive"
      @cancel="trashCancel"
    />
    <nav
      class="navbar py-4 is-flex is-justify-content-space-between is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <figure class="image width-17bh-mobile">
            <img src="~assets/images/logo_s2a.svg" alt="s2a-modular" />
          </figure>
        </b-navbar-item>
      </div>

      <div class="navbar-end">
        <b-navbar-item tag="div" class="mr-4">
          <div class="buttons">
            <nuxt-link to="/">
              <strong class="is-size-7-mobile">BROWSE HOMES</strong>
            </nuxt-link>
            <span class="mx-5 mx-3-mobile"> | </span>
            <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
              <template #trigger>
                <a>
                  <img
                    src="~assets/images/icon_profile.svg"
                    alt="s2a-modular"
                    class="image is-24x24"
                  />
                </a>
              </template>

              <b-dropdown-item
                aria-role="menu-item"
                :focusable="false"
                custom
                paddingless
              >
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

                      <b-field class="mb-0">
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
                      <div class="mb-3">
                        <a
                          class="subtitle is-7 has-text-primary"
                          @click.prevent="forgotPasswordModal"
                          >Forgot password?</a
                        >
                      </div>
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
                      <b-button
                        type="is-text"
                        expanded
                        class="bg-hover"
                        @click.prevent="signUpModal"
                        >Sign Up</b-button
                      >
                      <p class="subtitle is-7 has-text-centered">
                        Save, share and download specs for all your custom
                        homes.
                      </p>
                    </section>
                  </div>
                </form>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-item>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from '@/components/Notification.vue'
import SignUp from './SignUp.vue'
import ForgotPassword from './ForgotPassword.vue'
export default {
  components: {
    SignUp,
    Notification,
    ForgotPassword,
  },
  data() {
    return {
      isSignUpActive: false,
      email: '',
      password: '',
      loadingButton: true,
      error: null,
      isForgotPasswordActive: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('./')
    }
  },
  methods: {
    signUpModal() {
      this.isSignUpActive = true
    },
    forgotPasswordModal() {
      this.isForgotPasswordActive = true
    },
    trashCancel() {
      this.isSignUpActive = false
      this.isForgotPasswordActive = false
    },
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
        // this.$buefy.toast.open({
        //   message: 'Welcome again ' + this.loggedInUser.firstName + '!',
        //   type: 'is-success',
        // })
      } catch (e) {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          this.loadingButton = true
          this.$router.push('/')
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
      }
    },
  },
}
</script>

<style scoped>
.bg-hover:hover {
  background: none !important;
  color: #363636 !important;
}
</style>
