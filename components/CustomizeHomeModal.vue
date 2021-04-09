<template>
  <div>
    <b-modal :active.sync="isModalActive" full-screen>
      <sign-up
        :is-active="isSignUpActive"
        save-home-modal
        @clicked="register"
      />
      <b-modal
        :active.sync="isNameHomeModalActive"
        has-modal-card
        :width="1000"
        :custom-class="'is-fullwidth'"
      >
        <div class="is-flex">
          <div class="modal-card mr-2">
            <form method="post" @submit.prevent="saveHome">
              <section class="modal-card-body px-6 modal-card-name-home">
                <div class="is-flex is-justify-content-center">
                  <img
                    src="~assets/images/logo_s2a.svg"
                    alt="s2a-modular"
                    class="image"
                    style="width: 250px"
                  />
                </div>
                <div class="mx-5">
                  <b-field class="mb-6">
                    <b-input
                      v-model="nameHome"
                      type="text"
                      placeholder="Name your home"
                      required
                      rounded
                      custom-class="name-input"
                    >
                    </b-input>
                  </b-field>

                  <b-button
                    native-type="submit"
                    label="Save"
                    type="is-primary"
                    expanded
                    rounded
                  />
                  <div class="is-flex is-justify-content-center my-2">
                    <Notification v-if="error" :message="error" />
                  </div>
                </div>
              </section>
            </form>
          </div>
          <a @click.prevent="closeNameHomeModal">
            <img
              src="@/assets/images/button_close.svg"
              alt="icon_share"
              class="image is-32x32"
            />
          </a>
        </div>
      </b-modal>
      <b-modal
        :active.sync="isLoginModalActive"
        has-modal-card
        :width="1000"
        :custom-class="'is-fullwidth'"
      >
        <div class="is-flex">
          <div class="modal-card mr-2">
            <form method="post" @submit.prevent="login">
              <section class="modal-card-body px-6 modal-card-name-home">
                <div class="is-flex is-justify-content-center my-4">
                  <img
                    src="~assets/images/logo_s2a.svg"
                    alt="s2a-modular"
                    class="image"
                    style="width: 250px"
                  />
                </div>

                <div>
                  <p class="subtitle is-6 has-text-centered mb-3">
                    Login or Register first.
                  </p>
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
                    <Notification v-if="loginError" :message="loginError" />
                  </div>
                  <b-button
                    type="is-text"
                    expanded
                    class="bg-hover"
                    @click.prevent="signUpModal"
                    >Sign Up</b-button
                  >
                  <p class="subtitle is-7 has-text-centered">
                    Save, share and download specs for all your custom homes.
                  </p>
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
      <div class="mx-6 my-6 py-6">
        <!-- <b-tabs vertical expanded animated type="is-toggle">
        <b-tab-item label="GREENLUX EFFICIENT"></b-tab-item>

        <b-tab-item label="NORMAL POWER GRID"> </b-tab-item>
      </b-tabs> -->
        <b-tabs
          vertical
          expanded
          animated
          multiline
          position="is-centered"
          size="is-small"
        >
          <b-tab-item>
            <template #header>
              <div>
                <b-button type="is-primary" expanded
                  >GREENLUX EFFICIENT</b-button
                >
                <a
                  class="subtitle is-7 has-text-white is-flex is-justify-content-center mt-2 border-0 is-underlined"
                  ><span>What's included?</span></a
                >
              </div>
            </template>
            <div class="container" style="height: 60vh; overflow: scroll">
              <h1 class="title is-4 has-text-white">GREENLUX</h1>
              <div class="columns">
                <div class="is-6 column">
                  <p class="subtitle has-text-white is-7">
                    Nunc nec velit nec libero vestibulum eleifend. Curabitur
                    pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                    ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                    lobortis eget.
                  </p>
                </div>
                <!-- <div class="column is-offset-4">
                  <b-field>
                    <b-switch></b-switch>
                  </b-field>
                </div> -->
              </div>
              <div v-for="greenlux in greenluxProducts" :key="greenlux.length">
                <div class="p-5 border columns is-mobile m-5">
                  <div class="column">
                    <b-carousel
                      :indicator-inside="false"
                      :autoplay="false"
                      :arrow="false"
                    >
                      <b-carousel-item v-for="(item, i) in 3" :key="i">
                        <span class="image">
                          <img :src="getImgUrl(i)" style="height: 20vh" />
                        </span>
                      </b-carousel-item>
                      <template #indicators="props">
                        <span class="al image">
                          <img :src="getImgUrl(props.i)" :title="props.i" />
                        </span>
                      </template>
                    </b-carousel>
                  </div>
                  <div class="column is-6">
                    <h1 class="title is-5 has-text-white">
                      {{ greenlux.title }}
                    </h1>
                    <p class="subtitle mb-0 has-text-white">LG/543434JNKDW</p>
                    <p class="subtitle has-text-white has-text-weight-bold">
                      ${{ greenlux.price }}
                    </p>
                    <p class="subtitle has-text-white is-7">
                      Nunc nec velit nec libero vestibulum eleifend. Curabitur
                      pulvinar congue luctus. Nullam hendrerit iaculis augue
                      vitae ornare. Maecenas vehicula pulvinar tellus, id
                      sodales felis lobortis eget.
                    </p>
                    <ul
                      class="subtitle is-7 has-text-white ml-5"
                      style="list-style: disc"
                    >
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                    </ul>
                  </div>
                  <div class="column">
                    <p class="subtitle is-7 has-text-white">Choose a color</p>
                    <b-field>
                      <b-checkbox
                        ><span class="subtitle is-7 has-text-white"
                          >Black Stainless Steel</span
                        ></b-checkbox
                      >
                    </b-field>
                    <b-field>
                      <b-checkbox
                        ><span class="subtitle is-7 has-text-white"
                          >Stainless Steel</span
                        ></b-checkbox
                      >
                    </b-field>
                    <b-field>
                      <b-checkbox
                        ><span class="subtitle is-7 has-text-white"
                          >White</span
                        ></b-checkbox
                      >
                    </b-field>
                    <b-field>
                      <b-checkbox
                        ><span class="subtitle is-7 has-text-white"
                          >Black</span
                        ></b-checkbox
                      >
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <div>
                <b-button type="is-light" expanded>NORMAL POWER GRID</b-button>
                <div class="mt-2">
                  <p
                    class="has-text-white subtitle is-7 has-text-centered mb-0"
                  >
                    Lorem ipsum dolor sit amet.
                  </p>
                  <p
                    class="has-text-white subtitle is-7 has-text-centered mb-0"
                  >
                    Lorem ipsum dolor sit amet.
                  </p>
                  <p
                    class="has-text-white subtitle is-7 has-text-centered mb-0"
                  >
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
            </template>
          </b-tab-item>
          <!-- <b-tab-item disabled>
            <template #header>
              <div>
                <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                  Lorem ipsum dolor sit amet.
                </p>
                <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                  Lorem ipsum dolor sit amet.
                </p>
                <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </template>
          </b-tab-item> -->

          <b-tab-item>
            <template #header>
              <span class="has-text-white">EXTERIOR</span>
            </template>
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet.
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <span class="has-text-white">INTERIOR</span>
            </template>
            What light is light, if Silvia be not seen? <br />
            What joy is joy, if Silvia be not by— <br />
            Unless it be to think that she is by <br />
            And feed upon the shadow of perfection? <br />
            Except I be by Silvia in the night, <br />
            There is no music in the nightingale.
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <span class="has-text-white">KITCHEN</span>
            </template>
            Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
            congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
            vehicula pulvinar tellus, id sodales felis lobortis eget.
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">MASTER BEDROOM</span>
            </template>
            What light is light, if Silvia be not seen? <br />
            What joy is joy, if Silvia be not by— <br />
            Unless it be to think that she is by <br />
            And feed upon the shadow of perfection? <br />
            Except I be by Silvia in the night, <br />
            There is no music in the nightingale.
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">MASTER BATHROOM</span>
            </template>
            Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
            congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
            vehicula pulvinar tellus, id sodales felis lobortis eget.
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">BEDROOM 2</span>
            </template>
            Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
            congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
            vehicula pulvinar tellus, id sodales felis lobortis eget.
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">BATHROOM 2</span>
            </template>
            Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
            congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
            vehicula pulvinar tellus, id sodales felis lobortis eget.
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">APPLIANCES</span>
            </template>
            <div class="container" style="height: 60vh; overflow: scroll">
              <h1 class="title is-4 has-text-white">APPLIANCES</h1>
              <div v-for="appliance in appliances" :key="appliance.length">
                <div class="p-5 border columns m-5">
                  <div class="column">
                    <b-carousel
                      :indicator-inside="false"
                      :autoplay="false"
                      :arrow="false"
                    >
                      <b-carousel-item v-for="(item, i) in 3" :key="i">
                        <span class="image">
                          <img :src="getImgUrl(i)" style="height: 20vh" />
                        </span>
                      </b-carousel-item>
                      <template #indicators="props">
                        <span class="al image">
                          <img :src="getImgUrl(props.i)" :title="props.i" />
                        </span>
                      </template>
                    </b-carousel>
                  </div>
                  <div class="column is-6">
                    <h1 class="title is-5 has-text-white">
                      {{ appliance.name }}
                    </h1>
                    <p class="subtitle mb-0 has-text-white">
                      {{ appliance.brand }}
                    </p>
                    <p class="subtitle has-text-white has-text-weight-bold">
                      ${{ appliance.appliancePerHousePrice }}
                    </p>
                    <p class="subtitle has-text-white is-7">
                      {{ appliance.description }}
                    </p>
                    <ul
                      class="subtitle is-7 has-text-white ml-5"
                      style="list-style: disc"
                    >
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                      <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                    </ul>
                  </div>
                  <div class="column">
                    <div class="is-grid is-fullheight">
                      <div>
                        <p class="subtitle is-7 has-text-white">
                          Choose a color
                        </p>
                        <b-field class="has-text-white">
                          <b-checkbox size="is-small"
                            >Black Stainless Steel</b-checkbox
                          >
                        </b-field>
                        <b-field class="has-text-white">
                          <b-checkbox size="is-small"
                            >Stainless Steel</b-checkbox
                          >
                        </b-field>
                        <b-field class="has-text-white">
                          <b-checkbox size="is-small">White</b-checkbox>
                        </b-field>
                        <b-field class="has-text-white">
                          <b-checkbox size="is-small">Black</b-checkbox>
                        </b-field>
                      </div>
                      <div class="is-flex is-align-items-flex-end">
                        <a
                          class="subtitle is-7 has-text-white mt-2 border-0 is-underlined"
                          ><span>Remove from Home</span></a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="is-flex is-justify-content-flex-end">
                  <b-button size="is-small" type="is-primary" rounded
                    >+ ADD TO HOME</b-button
                  >
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item>
            <template #header>
              <span class="has-text-white">ELECTRICAL</span>
            </template>
            Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
            congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
            vehicula pulvinar tellus, id sodales felis lobortis eget.
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="footer-modal py-5">
        <div class="is-flex is-justify-content-space-between px-6 my-3">
          <div>
            <h1 class="title is-2 has-text-white mb-0">MODEL 1</h1>
          </div>
          <div class="is-flex is-align-items-center">
            <span class="has-text-white">As configured</span>
            <h1 class="title is-2 has-text-white mb-0 mx-5">$510,250</h1>
            <b-button rounded class="mr-2" @click.prevent="nameHomeModal"
              >SAVE HOME</b-button
            >
            <b-button type="is-primary" rounded @click="cancel"
              >CANCEL</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
import SignUp from '@/components/SignUp.vue'
export default {
  components: { Notification, SignUp },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    appliances: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isModalActive: false,
      isNameHomeModalActive: false,
      isLoginModalActive: false,
      isSignUpActive: false,
      nameHome: '',
      error: null,
      email: '',
      password: '',
      loadingButton: true,
      loginError: null,
      // appliances: [
      //   {
      //     title: 'REFRIGERATOR',
      //     price: '2,000',
      //   },
      //   {
      //     title: 'MICROWAVE',
      //     price: '500',
      //   },
      //   {
      //     title: 'OVEN',
      //     price: '1000',
      //   },
      // ],
      greenluxProducts: [
        {
          title: 'GREENLUX PRODUCT',
          price: '2,000',
        },
        {
          title: 'GREENLUX TECH',
          price: '500',
        },
        {
          title: 'GREENLUX FEATURE',
          price: '1000',
        },
      ],
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
    signUpModal() {
      this.isLoginModalActive = false
      this.isSignUpActive = true
    },
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`
    },
    nameHomeModal() {
      this.isNameHomeModalActive = true
    },
    closeNameHomeModal() {
      this.isNameHomeModalActive = false
    },
    async saveHome() {
      this.error = null
      const config = {
        idHouseStrapi: this.$route.params.id,
        name: this.nameHome,
        appliances: [1, 2, 3],
      }
      if (!this.$auth.loggedIn) {
        this.isNameHomeModalActive = false
        this.isLoginModalActive = true
      } else {
        try {
          await this.$axios.post('/management/save-house', config)
          this.error = null
          this.$router.push('/dashboard')
        } catch (e) {
          // this.loadingButton = true
          if (e.response.data.message != null) {
            this.error = e.response.data.message
          } else {
            this.error = e.response.data.error
          }
        }
      }
    },
    async login() {
      this.loadingButton = false
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.loadingButton = true
        this.saveHome()
      } catch (e) {
        this.loadingButton = true
        if (e.response.data.message != null) {
          this.loginError = e.response.data.message
        } else {
          this.loginError = e.response.data.error
        }
      }
    },
    async register(email, password) {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email,
            password,
          },
        })
        this.loadingButton = true
        this.saveHome()
      } catch (e) {
        this.loadingButton = true
        if (e.response.data.message != null) {
          this.loginError = e.response.data.message
        } else {
          this.loginError = e.response.data.error
        }
      }
    },
  },
}
</script>

<style>
.footer-modal {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #027881;
}
.border {
  border: 2px solid white;
}
.border:hover {
  border: 2px solid #027881;
}
</style>
