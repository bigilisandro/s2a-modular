<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex">
      <div class="modal-card mr-2">
        <form method="post" @submit.prevent="signup">
          <section class="modal-card-body px-6">
            <div class="is-flex is-justify-content-center my-4">
              <img
                src="~assets/images/logo_s2a.svg"
                alt="s2a-modular"
                class="image"
                style="width: 250px"
              />
            </div>
            <b-field>
              <b-input
                v-model="user.firstName"
                type="text"
                placeholder="First Name"
                required
                rounded
              >
              </b-input>
            </b-field>

            <b-field>
              <b-input
                v-model="user.lastName"
                type="text"
                placeholder="Last Name"
                required
                rounded
              >
              </b-input>
            </b-field>
            <b-field>
              <b-input
                v-model="user.email"
                type="email"
                placeholder="Email"
                required
                rounded
              >
              </b-input>
            </b-field>

            <b-field>
              <b-input
                v-model="user.mobilePhone"
                type="phone"
                placeholder="Mobile Phone"
                required
                rounded
              >
              </b-input>
            </b-field>
            <b-field>
              <b-input
                v-model="user.zipCode"
                type="number"
                placeholder="ZIP"
                required
                rounded
              >
              </b-input>
            </b-field>

            <!-- <b-field>
              <b-input
                v-model="user.password"
                type="password"
                password-reveal
                placeholder="Choose Password"
                required
                rounded
              >
              </b-input>
            </b-field> -->
            <p class="subtitle is-6 has-text-centered mb-2">
              Communication Preference
            </p>
            <b-field position="is-centered">
              <b-radio-button
                v-model="user.communicationPreference"
                native-value="PHONE"
                type="is-text"
              >
                <span>Phone</span>
              </b-radio-button>

              <b-radio-button
                v-model="user.communicationPreference"
                native-value="EMAIL"
                type="is-text"
              >
                <span>Email</span>
              </b-radio-button>
            </b-field>
            <b-checkbox
              >I agree to the
              <a class="is-underlined has-text-black"
                >Terms of Use</a
              ></b-checkbox
            >
            <b-button
              native-type="submit"
              label="Save Changes"
              type="is-primary"
              expanded
              rounded
            />
            <div class="is-flex is-justify-content-center">
              <Notification v-if="error" :message="error" />
            </div>
            <a
              class="is-flex is-justify-content-center my-4 is-underlined has-text-black"
            >
              Privacy Policy
            </a>
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
import { mapGetters } from 'vuex'
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
      user: {},
      isModalActive: false,
      firstName: '',
      lastName: '',
      email: '',
      zipCode: undefined,
      mobilePhone: undefined,
      communicationPreference: '',
      password: '',
      loadingButton: true,
      error: null,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
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
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('./')
    }
    this.user = this.loggedInUser.user
  },

  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style></style>
