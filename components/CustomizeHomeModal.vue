<template>
  <div>
    <b-modal :active.sync="isModalActive" full-screen>
      <sign-up
        :is-active="isSignUpActive"
        save-home-modal
        @clicked="register"
        @cancel="cancelRegisterModal"
      />
      <b-modal
        :active.sync="isNameHomeModalActive"
        has-modal-card
        :width="1000"
        :custom-class="'is-fullwidth'"
      >
        <div class="is-flex is-flex-wrap-wrap-reverse">
          <div class="modal-card mx-2">
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
          <a class="mx-auto" @click.prevent="closeNameHomeModal">
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
        <div class="is-flex is-flex-wrap-wrap-reverse">
          <div class="modal-card mx-2">
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
          <a class="mx-auto" @click.prevent="cancelLoginModal">
            <img
              src="@/assets/images/button_close.svg"
              alt="icon_share"
              class="image is-32x32"
            />
          </a>
        </div>
      </b-modal>
      <div class="is-hidden-touch">
        <div class="mx-6 my-6 py-6">
          <!-- <b-tabs vertical expanded animated type="is-toggle">
        <b-tab-item label="GREENLUX EFFICIENT"></b-tab-item>

        <b-tab-item label="NORMAL POWER GRID"> </b-tab-item>
      </b-tabs> -->
          <b-tabs
            v-model="tabIndex"
            vertical
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
                    @click.prevent="whatsIncluded"
                    ><span>What's included?</span></a
                  >
                </div>
              </template>
              <div
                class="container"
                style="height: 60vh; overflow-x: hidden; overflow-y: scroll"
              >
                <h1 class="title is-4 has-text-white">GREENLUX</h1>
                <p class="subtitle is-6 has-text-white">
                  orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  id fermentum quam. Proin sagittis, nibh id hendrerit
                  imperdiet, elit sapien laoreet elit, ac scelerisque diam velit
                  in nisl. Nunc maximus ex non laoreet semper. Nunc scelerisque,
                  libero sit amet pretium dignissim, augue purus placerat justo,
                  sit amet porttitor dui metus in nisl. Nulla non leo placerat,
                  porta metus eu, laoreet ris
                </p>
                <!-- TABS -->
                <b-tabs
                  v-model="tab"
                  type="is-toggle"
                  class="block"
                  size="is-small"
                  multiline
                >
                  <b-tab-item
                    label="HOME BATTERY STORAGE"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div class="columns is-flex-wrap-wrap">
                      <div class="column is-6">
                        <div class="p-5 border m-5">
                          <div class="columns" style="height: 23vh">
                            <div class="column">
                              <span class="image">
                                <img style="height: 20vh" />
                              </span>
                            </div>
                            <div class="column is-6">
                              <h1 class="title is-5 has-text-white">
                                TESLA POWERWALL
                              </h1>
                              <p class="subtitle mb-0 has-text-white">
                                21GSOLCI
                              </p>
                              <p class="subtitle has-text-white is-7">
                                RESIDENTIAL MODULAR ENERGY STORAGE SYSTEM
                              </p>
                            </div>
                          </div>
                          <div>
                            <div class="column">
                              <div class="is-grid is-fullheight">
                                <div>
                                  <p class="subtitle is-7 has-text-white mb-2">
                                    Choose an option
                                  </p>
                                  <div class="is-flex">
                                    <div
                                      v-for="option in options"
                                      :key="option.length"
                                      class="is-flex is-align-items-center mr-2"
                                    >
                                      <div
                                        class="option"
                                        :style="{
                                          'background-color': option.color,
                                        }"
                                      ></div>
                                      <span
                                        class="subtitle is-7 has-text-white"
                                        >{{ option.title }}</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="is-flex is-align-items-flex-end is-justify-content-flex-end"
                                >
                                  <b-button
                                    size="is-small"
                                    type="is-primary"
                                    rounded
                                    @click="addAppliance(appliance)"
                                    >+ ADD TO HOME</b-button
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab-item>
                  <b-tab-item
                    label="FILTER 2"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                  <b-tab-item
                    label="FILTER 3"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                </b-tabs>
              </div>
            </b-tab-item>

            <b-tab-item>
              <template #header>
                <div>
                  <b-button type="is-light" expanded
                    >NORMAL POWER GRID</b-button
                  >
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

            <b-tab-item>
              <template #header>
                <span class="has-text-white">APPLIANCES</span>
              </template>
              <div
                class="container"
                style="height: 60vh; overflow-x: hidden; overflow-y: scroll"
              >
                <h1 class="title is-4 has-text-white">APPLIANCES</h1>
                <!-- TABS -->
                <b-tabs
                  v-model="tab"
                  type="is-toggle"
                  class="block"
                  size="is-small"
                  multiline
                >
                  <b-tab-item
                    label="CABINETRY"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div class="columns is-flex-wrap-wrap">
                      <div
                        v-for="appliance in model.appliances"
                        :key="appliance.length"
                        class="column is-6"
                      >
                        <div
                          :class="{
                            'border-green-customize': selectedAppliances.includes(
                              appliance.applianceId
                            ),
                          }"
                          class="p-5 border m-5"
                        >
                          <div class="columns" style="height: 23vh">
                            <div class="column">
                              <b-carousel
                                :indicator-inside="false"
                                :autoplay="false"
                                :arrow="false"
                              >
                                <b-carousel-item
                                  v-for="(item, i) in appliance"
                                  :key="i"
                                >
                                  <span class="image">
                                    <img :src="item.url" style="height: 20vh" />
                                  </span>
                                </b-carousel-item>
                                <!-- <template #indicators="props">
                            <span class="al image">
                              <img
                                :src="
                                  getImgUrl(appliance.gallery.gallery, props.i)
                                "
                                :title="props.i"
                              />
                            </span>
                          </template> -->
                              </b-carousel>
                            </div>
                            <div class="column is-6">
                              <h1 class="title is-5 has-text-white">
                                {{ appliance.name }}
                              </h1>
                              <p class="subtitle mb-0 has-text-white">
                                {{ appliance.brand }}
                              </p>
                              <p
                                class="subtitle has-text-white has-text-weight-bold"
                              >
                                ${{ appliance.price }}
                              </p>
                              <p class="subtitle has-text-white is-7">
                                {{ appliance.description }}
                              </p>
                              <ul
                                class="subtitle is-7 has-text-white ml-5"
                                style="list-style: disc"
                              >
                                <li>
                                  Nunc nec velit nec libero vestibulum eleifend.
                                </li>
                                <li>
                                  Nunc nec velit nec libero vestibulum eleifend.
                                </li>
                                <li>
                                  Nunc nec velit nec libero vestibulum eleifend.
                                </li>
                                <li>
                                  Nunc nec velit nec libero vestibulum eleifend.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div class="column">
                              <div class="is-grid is-fullheight">
                                <div>
                                  <p class="subtitle is-7 has-text-white mb-2">
                                    Choose an option
                                  </p>
                                  <div class="is-flex">
                                    <div
                                      v-for="option in options"
                                      :key="option.length"
                                      class="is-flex is-align-items-center mr-2"
                                    >
                                      <div
                                        class="option"
                                        :style="{
                                          'background-color': option.color,
                                        }"
                                      ></div>
                                      <span
                                        class="subtitle is-7 has-text-white"
                                        >{{ option.title }}</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-if="
                                    !selectedAppliances.includes(
                                      appliance.applianceId
                                    )
                                  "
                                  class="is-flex is-align-items-flex-end is-justify-content-flex-end"
                                >
                                  <b-button
                                    size="is-small"
                                    type="is-primary"
                                    rounded
                                    @click="addAppliance(appliance)"
                                    >+ ADD TO HOME</b-button
                                  >
                                </div>
                                <div
                                  v-if="
                                    selectedAppliances.includes(
                                      appliance.applianceId
                                    )
                                  "
                                  class="is-flex is-align-items-flex-end is-justify-content-flex-end"
                                >
                                  <a
                                    class="subtitle is-7 has-text-white mt-2 border-0 is-underlined"
                                    @click="removeAppliance(appliance)"
                                    ><span>Remove from Home</span></a
                                  >
                                  <b-button
                                    size="is-small"
                                    rounded
                                    class="button-green"
                                    ><b-icon
                                      type="is-white"
                                      icon="check"
                                    ></b-icon
                                  ></b-button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab-item>
                  <b-tab-item
                    label="COUNTERTOP"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                  <b-tab-item
                    label="FAUCET"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                  <b-tab-item
                    label="SINK"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                  <b-tab-item
                    label="PAINT"
                    header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh is-size-7-mobile"
                  >
                    <div></div>
                  </b-tab-item>
                </b-tabs>
              </div>
            </b-tab-item>
            <b-tab-item v-for="area in model.areas" :key="area.length">
              <template #header>
                <span class="has-text-white">{{ area.areaName }}</span>
              </template>
              Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
              congue luctus. Nullam hendrerit iaculis augue vitae ornare.
              Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
          </b-tabs>
        </div>
        <div class="footer-modal py-5">
          <div class="is-flex is-justify-content-space-between px-6 my-3">
            <div>
              <h1 class="title is-2 has-text-white mb-0">
                {{ model.model_name.toUpperCase() }}
              </h1>
            </div>
            <div class="is-flex is-align-items-center">
              <!-- <span class="has-text-white">As configured</span>
            <h1 class="title is-2 has-text-white mb-0 mx-5">$510,250</h1> -->
              <b-button rounded class="mr-2" @click.prevent="nameHomeModal"
                >SAVE HOME</b-button
              >
              <b-button type="is-primary" rounded @click="cancel"
                >CANCEL</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="is-hidden-desktop">
        <div class="has-background-primary p-4 top-title">
          <h1 class="title is-4 has-text-white has-text-centered mt-2 mb-1">
            {{ model.model_name.toUpperCase() }}
          </h1>
          <div class="is-flex is-justify-content-center">
            <b-tabs type="is-toggle" size="is-small" position="is-centered">
              <b-tab-item>
                <template #header>
                  <div>
                    <b-button size="is-small" type="is-primary" expanded
                      >GREENLUX EFFICIENT</b-button
                    >
                  </div>
                </template>
                <div class="px-3">
                  <a
                    class="subtitle is-7 has-text-white is-flex is-justify-content-center mb-1 border-0 is-underlined"
                    @click.prevent="whatsIncluded"
                    ><span>What's included?</span></a
                  >
                  <p class="subtitle is-7 is-text-centered has-text-white">
                    Nunc nec velit nec libero vestibulum eleifend. Curabitur
                    pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                    ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                    lobortis eget.
                  </p>
                </div>
              </b-tab-item>
              <b-tab-item>
                <template #header>
                  <div>
                    <b-button size="is-small" type="is-light" expanded
                      >NORMAL POWER GRID</b-button
                    >
                  </div>
                </template>
                <div class="px-3">
                  <p class="subtitle is-7 is-text-centered has-text-white">
                    Nunc nec velit nec libero vestibulum eleifend. Curabitur
                    pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                    ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                    lobortis eget.
                  </p>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
        <div>
          <b-tabs position="is-centered" class="block">
            <b-tab-item>
              <template #header>
                <span class="has-text-white">APPLIANCES</span>
              </template>
              <div class="container" style="height: 60vh; overflow: scroll">
                <!-- <h1 class="title is-4 has-text-white">APPLIANCES</h1> -->
                <div
                  v-for="appliance in model.appliances"
                  :key="appliance.length"
                >
                  <div class="p-5 border m-4">
                    <div class="columns is-flex">
                      <div class="column">
                        <b-carousel
                          :indicator-inside="false"
                          :autoplay="false"
                          :arrow="false"
                        >
                          <b-carousel-item
                            v-for="(item, i) in appliance"
                            :key="i"
                          >
                            <span class="image">
                              <img :src="item.url" style="height: 20vh" />
                            </span>
                          </b-carousel-item>
                          <!-- <template #indicators="props">
                            <span class="al image">
                              <img
                                :src="
                                  getImgUrl(
                                    appliance.gallery.gallery_mobile,
                                    props.i
                                  )
                                "
                                :title="props.i"
                              />
                            </span>
                          </template> -->
                        </b-carousel>
                        <div>
                          <p class="subtitle is-7 has-text-white mb-2">
                            Choose an option
                          </p>
                          <div class="is-flex">
                            <div
                              v-for="option in options"
                              :key="option.length"
                              class="is-flex is-align-items-center mr-2"
                            >
                              <div
                                class="option"
                                :style="{
                                  'background-color': option.color,
                                }"
                              ></div>
                              <span class="subtitle is-7 has-text-white">{{
                                option.title
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="column">
                        <h1 class="title is-5 has-text-white">
                          {{ appliance.name }}
                        </h1>
                        <p class="subtitle mb-0 has-text-white">
                          {{ appliance.brand }}
                        </p>
                        <p class="subtitle has-text-white has-text-weight-bold">
                          ${{ appliance.price }}
                        </p>
                        <p class="subtitle has-text-white is-7">
                          {{ appliance.description }}
                        </p>
                        <ul
                          class="subtitle is-7 has-text-white ml-5"
                          style="list-style: disc"
                        >
                          <li>
                            Nunc nec velit nec libero vestibulum eleifend.
                          </li>
                          <li>
                            Nunc nec velit nec libero vestibulum eleifend.
                          </li>
                          <li>
                            Nunc nec velit nec libero vestibulum eleifend.
                          </li>
                          <li>
                            Nunc nec velit nec libero vestibulum eleifend.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          v-if="
                            !selectedAppliances.includes(appliance.applianceId)
                          "
                          class="is-flex is-justify-content-center"
                        >
                          <b-button
                            size="is-small"
                            type="is-primary"
                            rounded
                            @click="addAppliance(appliance)"
                            >+ ADD TO HOME</b-button
                          >
                        </div>
                        <div
                          v-if="
                            selectedAppliances.includes(appliance.applianceId)
                          "
                          class="is-flex is-justify-content-center"
                        >
                          <a
                            class="subtitle is-7 has-text-white mt-2 border-0 is-underlined"
                            @click="removeAppliance(appliance)"
                            ><span>Remove from Home</span></a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>
            <b-tab-item v-for="area in model.areas" :key="area.length">
              <template #header>
                <span class="has-text-white">{{ area.areaName }}</span>
              </template>
              Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
              congue luctus. Nullam hendrerit iaculis augue vitae ornare.
              Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
          </b-tabs>
        </div>
        <div class="footer-modal py-3">
          <div
            class="is-flex is-justify-content-space-between px-5 my-2 is-align-items-center"
          >
            <div>
              <h1 class="title is-5 has-text-white mb-0">
                {{ model.model_name.toUpperCase() }}
              </h1>
            </div>
            <div class="is-flex is-align-items-center">
              <!-- <span class="has-text-white">As configured</span>
            <h1 class="title is-2 has-text-white mb-0 mx-5">$510,250</h1> -->
              <b-button
                size="is-small"
                rounded
                class="mr-1"
                @click.prevent="nameHomeModal"
                >SAVE HOME</b-button
              >
              <b-button
                size="is-small"
                type="is-primary"
                rounded
                @click="cancel"
                >CANCEL</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
import SignUp from '@/components/SignUp.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Notification, SignUp },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tabIndex: 2,
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
      selectedAppliances: [],
      options: [
        {
          color: 'white',
          title: 'White',
        },
        {
          color: 'grey',
          title: 'Gray',
        },
        {
          color: 'tan',
          title: 'Wood',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isStrategy', 'loggedInUser']),
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
    cancelLoginModal() {
      this.isLoginModalActive = false
    },
    cancelRegisterModal() {
      this.isSignUpActive = false
    },
    signUpModal() {
      this.isLoginModalActive = false
      this.isSignUpActive = true
    },
    getImgUrl(gallery, value) {
      return gallery[value].url
    },
    nameHomeModal() {
      this.isNameHomeModalActive = true
    },
    closeNameHomeModal() {
      this.isNameHomeModalActive = false
    },
    addAppliance(appliance) {
      this.selectedAppliances.push(appliance.applianceId)
    },
    removeAppliance(appliance) {
      const index = this.selectedAppliances.indexOf(appliance.applianceId)
      if (index > -1) {
        this.selectedAppliances.splice(index, 1)
      }
    },
    async saveHome() {
      this.error = null
      const config = {
        idHouseStrapi: this.$route.params.id,
        name: this.nameHome,
        appliances: this.selectedAppliances,
      }
      if (!this.$auth.loggedIn || this.isStrategy === 'admin') {
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
    whatsIncluded() {
      this.$buefy.dialog.confirm({
        title: "What's included",
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
.footer-modal {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #027881;
}
.border {
  border: 2px solid #027881;
  height: 80%;
}
/* .border:hover {
  border: 2px solid #027881;
} */
.option {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.border-green-customize {
  border-color: #48c78e;
}
.button-green {
  background-color: #48c78e;
  color: #fff;
}
</style>
