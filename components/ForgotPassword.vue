<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex">
      <div class="modal-card mr-2">
        <form method="post" @submit.prevent="forgot">
          <section class="modal-card-body px-6">
            <div class="is-flex is-justify-content-center my-4">
              <img
                src="~assets/images/logo_s2a.svg"
                alt="s2a-modular"
                class="image"
                style="width: 250px"
              />
            </div>
            <div>
              <h3 class="title has-text-centered is-5 mb-4">
                Forgot your password?
              </h3>
            </div>
            <div>
              <p class="subtitle has-text-centered mb-4">
                Enter your email adress and we’ll send you a link to reset your
                password
              </p>
            </div>

            <b-field v-if="notSent">
              <b-input
                v-model="email"
                type="email"
                placeholder="Email"
                required
                rounded
              >
              </b-input>
            </b-field>

            <div v-if="!notSent">
              <p class="subtitle has-text-centered mb-4 has-text-weight-bold">
                A reset password link has been sent to your email account.
                Please click on the link to complete the password reset.
              </p>
            </div>

            <b-button
              v-if="notSent"
              native-type="submit"
              label="Reset password"
              type="is-primary"
              expanded
              rounded
            />
            <div class="is-flex is-justify-content-center my-2">
              <Notification v-if="error" :message="error" />
            </div>
          </section>
        </form>
      </div>
      <a @click.prevent="cancel">
        <img
          src="@/assets/images/button_close.svg"
          alt="icon_share"
          class="image is-32x32"
        />
      </a>
    </div>
  </b-modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import Notification from '@/components/Notification.vue'
export default {
  components: {
    Notification,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      email: '',
      notSent: true,
      loadingButton: true,
      error: null,
    }
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },

  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async forgot() {
      this.loadingButton = false
      this.error = null
      try {
        await this.$axios.post('/auth/forget-password', {
          email: this.email,
        })
        this.error = null
        this.loadingButton = true
        this.notSent = false
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
