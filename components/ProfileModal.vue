<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex">
      <div class="modal-card mr-2">
        <form method="post" @submit.prevent="saveChanges">
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
                class="mx-5"
                expanded
              >
                <span>Phone</span>
              </b-radio-button>

              <b-radio-button
                v-model="user.communicationPreference"
                native-value="EMAIL"
                class="mx-5"
                expanded
              >
                <span>Email</span>
              </b-radio-button>
            </b-field>
            <!-- <b-checkbox
              >I agree to the
              <a
                class="is-underlined has-text-black"
                @click.prevent="termsOfUse"
                >Terms of Use</a
              ></b-checkbox
            > -->
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
              class="is-flex is-justify-content-center my-4 is-underlined has-text-black is-7 subtitle"
              @click.prevent="privacyPolicy"
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
    this.user = this.loggedInUser
  },

  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async saveChanges() {
      this.loadingButton = false
      this.error = null
      try {
        await this.$axios.put('/auth/update-user', {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          ...(this.user.email !== this.loggedInUser.email
            ? { email: this.user.email }
            : {}),
          mobilePhone: parseFloat(this.user.mobilePhone),
          zipCode: parseFloat(this.user.zipCode),
          communicationPreference: this.user.communicationPreference,
        })
        this.error = null
        this.loadingButton = true
        this.cancel()
        this.$buefy.toast.open({
          message:
            'You successfully changed your profile data ' +
            this.user.firstName +
            '!',
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

<style></style>
