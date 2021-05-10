<template>
  <section>
    <div v-if="authenticated" class="mt-6">
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
    <div v-else>
      <!-- <b-tabs type="is-boxed" expanded>
        <b-tab-item label="Homes"> -->
      <!-- <div class="my-3 is-flex is-justify-content-center">
        <b-button icon-left="plus" size="is-large" type="is-primary" outlined
          >Add Home Model</b-button
        >
      </div> -->
      <!-- Loader  -->
      <div>
        <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
      </div>
      <b-collapse
        v-for="(model, index) of models"
        :key="index"
        class="card"
        animation="slide"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <template #trigger="props">
          <div class="card-header" role="button">
            <p class="card-header-title">
              {{ model.house.houseModel }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content px-1">
          <b-collapse animation="slide" :open="false">
            <template #trigger>
              <div
                class="card-header has-background-primary my-1"
                role="button"
              >
                <p class="card-header-title has-text-primary-light">
                  Appliances
                </p>
              </div></template
            >
            <div class="p-3">
              <div
                v-for="appliance in model.appliances"
                :key="appliance.length"
                class="is-flex is-justify-content-space-between py-3"
                style="border-bottom: 2px solid black"
              >
                <div class="is-6">
                  <h6>{{ appliance.name }}, {{ appliance.brand }}</h6>
                </div>
                <div class="is-flex is-align-items-center">
                  <div class="is-flex mx-2 is-align-items-center">
                    <h6 class="mr-2 subtitle is-7 mb-0">Price Override</h6>
                    <form
                      class="is-flex"
                      @submit.prevent="
                        changePrice(model.house.houseId, appliance)
                      "
                    >
                      <b-input
                        v-model="appliance.price"
                        type="number"
                        class="mr-2"
                        name="price"
                        size="is-small"
                        required
                        expanded
                      ></b-input>
                      <b-button
                        native-type="submit"
                        size="is-small"
                        type="is-primary"
                        >Override Price</b-button
                      >
                    </form>
                  </div>
                  <!-- <div class="is-flex mx-2 is-align-items-center">
                    <h6 class="mr-2 subtitle is-7 mb-0">Remove from Home</h6>
                    <b-checkbox></b-checkbox>
                  </div> -->
                  <div class="mx-2">
                    <b-button
                      size="is-small"
                      type="is-primary"
                      @click.prevent.prevent="
                        removeAppliance(model.house.houseId, appliance)
                      "
                      >Remove from Home</b-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
          <b-collapse
            v-for="interior in model.areas"
            :key="interior.length"
            animation="slide"
            :open="false"
          >
            <template #trigger>
              <div
                class="card-header has-background-primary my-1"
                role="button"
              >
                <p class="card-header-title has-text-primary-light">
                  {{ interior.areaName }}
                </p>
              </div></template
            >
            <!-- <div class="my-3 is-flex is-justify-content-center">
              <b-button icon-left="plus" type="is-primary"
                >Add Gallery Image</b-button
              >
            </div> -->
            <div class="p-5">
              <div class="columns">
                <div class="column">
                  <div class="p-4">
                    <h6>Primary Image (Desktop)</h6>
                    <div class="card">
                      <div
                        :style="{
                          'background-image': 'url(' + interior.url + ')',
                        }"
                        class="bgImage"
                        @mouseover="primaryImageDesktop = interior"
                        @mouseout="primaryImageDesktop = null"
                      >
                        <div
                          v-show="primaryImageDesktop === interior"
                          class="hoverImage"
                        >
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="editModel"
                            >EDIT</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 1920x1080</p>
                    <h6 class="mt-4">Primary Image (Mobile)</h6>
                    <div class="card">
                      <img :src="file" style="width: 200px" />
                      <div
                        :style="{
                          'background-image':
                            'url(' + interior.imageField + ')',
                        }"
                        class="bgImage"
                        @mouseover="primaryImageMobile = interior"
                        @mouseout="primaryImageMobile = null"
                      >
                        <div
                          v-show="primaryImageMobile === interior"
                          class="hoverImage"
                        >
                          <b-upload
                            v-model="interior.imageField"
                            accept="image/*"
                            class="file-label"
                            @input="updatePhoto"
                          >
                            <span class="button is-primary px-6 is-rounded">
                              EDIT
                            </span>
                          </b-upload>
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, (Pixel Dimensions TBA)</p>
                  </div>
                </div>
                <div class="column">
                  <div class="p-4">
                    <h6>Alternate Image (Desktop)</h6>
                    <div class="card">
                      <div
                        :style="{
                          'background-image':
                            'url(' + interior.imageFormats + ')',
                        }"
                        class="bgImage"
                        @mouseover="alternateImageDesktop = interior"
                        @mouseout="alternateImageDesktop = null"
                      >
                        <div
                          v-show="alternateImageDesktop === interior"
                          class="hoverImage"
                        >
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="editModel"
                            >EDIT</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 1920x1080</p>
                    <h6 class="mt-4">Alternate Image (Mobile)</h6>
                    <div class="card">
                      <div
                        :style="{
                          'background-image': 'url(' + interior.imageName + ')',
                        }"
                        class="bgImage"
                        @mouseover="alternateImageMobile = interior"
                        @mouseout="alternateImageMobile = null"
                      >
                        <div
                          v-show="alternateImageMobile === interior"
                          class="hoverImage"
                        >
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="editModel"
                            >EDIT</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, (Pixel Dimensions TBA)</p>
                  </div>
                </div>
                <div class="column">
                  <div class="p-4">
                    <h6>Thumbnail</h6>
                    <div class="card">
                      <div
                        :style="{ 'background-image': bgImage }"
                        class="bgImage"
                        @mouseover="thumbnail = interior"
                        @mouseout="thumbnail = null"
                      >
                        <div v-show="thumbnail === interior" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="editModel"
                            >EDIT</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 300x170</p>
                    <div class="mt-5">
                      <b-field label="Short Description" class="my-3">
                        <b-input
                          v-model="interior.shortDescription"
                          type="text"
                          maxlength="50"
                        ></b-input>
                      </b-field>
                      <b-field label="360º Youtube Link" class="my-3">
                        <b-input
                          v-model="interior.youtubeLink360"
                          type="text"
                        ></b-input>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2 is-flex is-justify-content-center">
              <b-button type="is-primary" class="mx-2">Save</b-button>
              <!-- <b-button type="is-primary" class="mx-2">Delete</b-button> -->
            </div>
          </b-collapse>
        </div>
        <!-- <div class="mb-2 is-flex is-justify-content-center">
          <b-button type="is-primary" class="mx-2">Save Changes</b-button>
          <b-button type="is-primary" class="mx-2">Delete Home</b-button>
        </div> -->
      </b-collapse>
      <!-- </b-tab-item> -->
      <!-- <b-tab-item label="Catalog"></b-tab-item>
        <b-tab-item label="GREENLUX Catalog"></b-tab-item>
        <b-tab-item label="Sales"></b-tab-item> -->
      <!-- </b-tabs> -->
    </div>
  </section>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      authenticated: true,
      isOpen: undefined,
      bgImage: 'url',
      isLoading: true,
      hover: false,
      primaryImageDesktop: null,
      primaryImageMobile: null,
      alternateImageDesktop: null,
      alternateImageMobile: null,
      thumbnail: null,
      models: null,
      price: null,
      file: null,
      email: '',
      password: '',
      loadingButton: true,
      error: null,
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.getData()
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      this.$axios.get('/admin/houses-info/').then((r) => {
        this.models = r.data.data
        this.isLoading = false
        console.log(r, 'data')
      })
    },
    removeAppliance(id, appliance) {
      this.$axios
        .post('/admin/delete-appliance-house', {
          applianceId: appliance.applianceId,
          houseId: id,
        })
        .then((r) => {
          console.log(r, 'response')
          this.getData()
        })
    },
    changePrice(id, appliance) {
      this.$axios
        .post('/admin/save-appliance-price', {
          overridePrice: parseInt(appliance.price),
          applianceId: 1,
          houseId: id,
        })
        .then((r) => {
          console.log(r, 'response')
          this.getData()
        })
    },
    updatePhoto(photo) {
      photo = URL.createObjectURL(photo)
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
        this.isAuthenticated = false
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
