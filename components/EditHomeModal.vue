<template>
  <div>
    <b-modal :active.sync="isModalActive" full-screen>
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
              <div class="container" style="height: 60vh; overflow: scroll">
                <h1 class="title is-4 has-text-white">APPLIANCES</h1>
                <div
                  v-for="appliance in houseData.appliances"
                  :key="appliance.length"
                >
                  <div class="p-5 border columns m-5">
                    <div class="column">
                      <b-carousel
                        :indicator-inside="false"
                        :autoplay="false"
                        :arrow="false"
                      >
                        <b-carousel-item
                          v-for="(item, i) in appliance.gallery.gallery"
                          :key="i"
                        >
                          <span class="image">
                            <img :src="item.url" style="height: 20vh" />
                          </span>
                        </b-carousel-item>
                        <template #indicators="props">
                          <span class="al image">
                            <img
                              :src="
                                getImgUrl(appliance.gallery.gallery, props.i)
                              "
                              :title="props.i"
                            />
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
                        ${{ appliance.price }}
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
                        <div
                          v-if="
                            !selectedAppliances.includes(appliance.applianceId)
                          "
                          class="is-flex is-align-items-flex-end"
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
                          class="is-flex is-align-items-flex-end"
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
            <b-tab-item v-for="area in houseData.areas" :key="area.length">
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
                {{ model.userModelName.toUpperCase() }}
              </h1>
            </div>
            <div>
              <div class="is-flex is-align-items-center">
                <!-- <span class="has-text-white">As configured</span>
            <h1 class="title is-2 has-text-white mb-0 mx-5">$510,250</h1> -->

                <b-button
                  v-if="loadingButton"
                  rounded
                  class="mr-2"
                  @click.prevent="saveHome"
                  >SAVE HOME</b-button
                >
                <b-button v-else rounded class="mr-2" @click.prevent="saveHome"
                  >SAVING</b-button
                >

                <b-button type="is-primary" rounded @click="cancel"
                  >CANCEL</b-button
                >
              </div>
              <div class="is-flex is-justify-content-center my-2">
                <Notification v-if="error" :message="error" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="is-hidden-desktop">
        <div class="has-background-primary p-4 top-title">
          <h1 class="title is-4 has-text-white has-text-centered mt-2 mb-1">
            {{ model.userModelName.toUpperCase() }}
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
                <div>
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
                <div>
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
                  v-for="appliance in houseData.appliances"
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
                            v-for="(item, i) in appliance.gallery
                              .gallery_mobile"
                            :key="i"
                          >
                            <span class="image">
                              <img :src="item.url" style="height: 20vh" />
                            </span>
                          </b-carousel-item>
                          <template #indicators="props">
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
                          </template>
                        </b-carousel>
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
            <b-tab-item v-for="area in houseData.areas" :key="area.length">
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
                {{ model.userModelName.toUpperCase() }}
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
import { mapGetters } from 'vuex'
import Notification from '@/components/Notification.vue'
export default {
  components: { Notification },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Object,
      default: null,
    },
    appliances: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      tabIndex: 2,
      isModalActive: false,
      loadingButton: true,
      selectedAppliances: [],
      houseData: {},
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
  mounted() {
    this.getData()
    for (let index = 0; index < this.appliances.length; index++) {
      console.log(this.appliances[index])
      this.selectedAppliances.push(this.appliances[index].id)
    }
    console.log(this.selectedAppliances)
  },
  methods: {
    getData() {
      this.$axios.get('/management/getModel/' + this.model.id).then((r) => {
        this.houseData = r.data
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    getImgUrl(gallery, value) {
      return gallery[value].url
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
      this.loadingButton = false
      this.error = null
      const config = {
        idHouseStrapi: this.model.id,
        name: this.nameHome,
        appliances: this.selectedAppliances,
      }
      if (!this.$auth.loggedIn || this.isStrategy === 'admin') {
        this.error = 'You are not allowed!'
        this.$emit('cancel')
        this.loadingButton = true
      } else {
        try {
          await this.$axios.post('/management/save-house', config)
          this.error = null
          this.$emit('cancel')
          this.loadingButton = true
          this.getData()
          this.$buefy.toast.open({
            message: 'Changes were saved correctly!',
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
  border: 2px solid white;
}
.border:hover {
  border: 2px solid #027881;
}
</style>
