<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex is-flex-wrap-wrap-reverse">
      <div class="modal-card mr-2">
        <form method="post" @submit.prevent="signup">
          <section class="modal-card-body px-6">
            <div class="content-sign-up">
              <div class="is-flex is-justify-content-center mt-5 mb-6">
                <img
                  src="~assets/images/logo_s2a.svg"
                  alt="s2a-modular"
                  class="image"
                  style="width: 250px"
                />
              </div>
              <b-field>
                <b-input
                  v-model="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  rounded
                >
                </b-input>
              </b-field>

              <b-field>
                <b-input
                  v-model="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  rounded
                >
                </b-input>
              </b-field>
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

              <b-field>
                <b-input
                  v-model="mobilePhone"
                  type="tel"
                  placeholder="Mobile Phone"
                  required
                  rounded
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  v-model="zipCode"
                  type="text"
                  pattern="[0-9]*"
                  placeholder="ZIP"
                  required
                  rounded
                >
                </b-input>
              </b-field>

              <b-field>
                <b-input
                  v-model="password"
                  type="password"
                  password-reveal
                  placeholder="Choose Password"
                  required
                  rounded
                >
                </b-input>
              </b-field>
              <p class="subtitle is-6 has-text-centered mb-2">
                Communication Preference
              </p>
              <b-field position="is-centered">
                <b-radio-button
                  v-model="communicationPreference"
                  native-value="PHONE"
                  class="mr-5"
                  expanded
                >
                  <span>Phone</span>
                </b-radio-button>

                <b-radio-button
                  v-model="communicationPreference"
                  native-value="EMAIL"
                  class="ml-5"
                  expanded
                >
                  <span>Email</span>
                </b-radio-button>
              </b-field>
              <b-field>
                <b-checkbox required size="is-small"
                  >I agree to the
                  <a
                    class="is-underlined has-text-black"
                    @click.prevent="termsOfUse"
                    >Terms of Use</a
                  ></b-checkbox
                >
              </b-field>
              <b-button
                native-type="submit"
                label="Sign Up"
                type="is-primary"
                expanded
                rounded
              />
              <div class="is-flex is-justify-content-center my-2">
                <Notification v-if="error" :message="error" />
              </div>
              <a
                class="is-flex is-justify-content-center my-4 is-underlined has-text-black is-7 subtitle"
                @click.prevent="privacyPolicy"
              >
                Privacy Policy
              </a>
            </div>
          </section>
        </form>
      </div>
      <a class="mx-auto" @click.prevent="cancel">
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
    saveHomeModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
  // computed: {
  //   ...mapGetters(['isAuthenticated']),
  // },
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
  // mounted() {
  //   if (this.isAuthenticated) {
  //     this.$router.push('./')
  //   }
  // },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async signup() {
      this.loadingButton = false
      this.error = null
      try {
        await this.$axios.post('/auth/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          mobilePhone: parseFloat(this.mobilePhone),
          password: this.password,
          zipCode: parseFloat(this.zipCode),
          communicationPreference: this.communicationPreference,
        })
        this.error = null
        this.loadingButton = true
        if (this.saveHomeModal) {
          this.$emit('clicked', this.email, this.password)
        } else {
          this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          this.cancel()
          this.$router.push('/')
          this.$buefy.toast.open({
            message: 'Welcome ' + this.firstName + '!',
            type: 'is-success',
          })
        }
      } catch (e) {
        this.loadingButton = true
        if (e.response.data.message != null) {
          this.error = e.response.data.message
        } else {
          this.error = e.response.data.error
        }
      }
    },
    privacyPolicy() {
      this.$buefy.dialog.confirm({
        title: 'Privacy Policy',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.`,
      })
    },
    termsOfUse() {
      this.$buefy.dialog.confirm({
        title: 'Terms of Use',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.`,
      })
    },
  },
}
</script>

<style>
.content-sign-up {
  width: 70%;
  margin: auto;
}
</style>
