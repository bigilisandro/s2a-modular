<template>
  <section>
    <div>
      <!-- <b-tabs type="is-boxed" expanded>
        <b-tab-item label="Homes"> -->
      <!-- <div class="my-3 is-flex is-justify-content-center">
        <b-button icon-left="plus" size="is-large" type="is-primary" outlined
          >Add Home Model</b-button
        >
      </div> -->
      <!-- Loader  -->
      <div>
        <b-loading v-model="isLoading"></b-loading>
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
                v-for="appliance in appliances"
                :key="appliance.length"
                class="is-flex is-justify-content-space-between py-3"
                style="border-bottom: 2px solid black"
              >
                <div class="is-6">
                  <h6>{{ appliance.title }}</h6>
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
            v-for="interior in interiors"
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
                  {{ interior.title }}
                </p>
              </div></template
            >
            <div class="my-3 is-flex is-justify-content-center">
              <b-button icon-left="plus" type="is-primary"
                >Add Gallery Image</b-button
              >
            </div>
            <div class="p-5">
              <div class="columns">
                <div class="column">
                  <div class="p-4">
                    <h6>Primary Image (Desktop)</h6>
                    <div class="card">
                      <div
                        :style="{ 'background-image': bgImage }"
                        class="bgImage"
                      >
                        <div v-show="hover" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="viewModel"
                            >VIEW</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 1920x1080</p>
                    <h6 class="mt-4">Primary Image (Mobile)</h6>
                    <div class="card">
                      <div
                        :style="{ 'background-image': bgImage }"
                        class="bgImage"
                      >
                        <div v-show="hover" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="viewModel"
                            >VIEW</b-button
                          >
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
                        :style="{ 'background-image': bgImage }"
                        class="bgImage"
                      >
                        <div v-show="hover" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="viewModel"
                            >VIEW</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 1920x1080</p>
                    <h6 class="mt-4">Alternate Image (Mobile)</h6>
                    <div class="card">
                      <div
                        :style="{ 'background-image': bgImage }"
                        class="bgImage"
                      >
                        <div v-show="hover" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="viewModel"
                            >VIEW</b-button
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
                      >
                        <div v-show="hover" class="hoverImage">
                          <b-button
                            type="is-primary"
                            rounded
                            class="px-6"
                            @click.prevent="viewModel"
                            >VIEW</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <p class="subtitle is-7">JPEG, 300x170</p>
                    <div class="mt-5">
                      <b-field label="Short Description" class="my-3">
                        <b-input type="text" maxlength="50"></b-input>
                      </b-field>
                      <b-field label="360º Youtube Link" class="my-3">
                        <b-input type="text"></b-input>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2 is-flex is-justify-content-center">
              <b-button type="is-primary" class="mx-2">Save</b-button>
              <b-button type="is-primary" class="mx-2">Delete</b-button>
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
  data() {
    return {
      isOpen: undefined,
      bgImage: 'url',
      isLoading: true,
      hover: false,
      models: null,
      price: null,
      appliances: [
        {
          title: 'Product 1, LG 2626626262',
        },
        { title: 'Product 2, LG 2626626262' },
        { title: 'Product 3, LG 26266' },
        { title: 'Product 4, LG 26266' },
      ],
      interiors: [
        {
          title: 'Front Exterior 1',
        },
        { title: 'Front Exterior 2' },
        { title: 'Great Room' },
        { title: 'Kitchen' },
        { title: 'Master Bedroom' },
        { title: 'Bathroom' },
      ],
    }
  },
  mounted() {
    this.getData()
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
  },
}
</script>

<style></style>
