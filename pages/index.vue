<template>
  <section>
    <div class="bg-home py-6">
      <h1 class="title is-2 is-size-3-mobile has-text-centered my-6">
        40 MASTERFULLY CRAFTED HOMES<br />TO CHOOSE FROM
      </h1>
      <!-- TABS -->
      <b-tabs
        v-model="tab"
        position="is-centered"
        type="is-toggle"
        class="block"
        size="is-small"
        multiline
      >
        <b-tab-item
          label="ALL HOMES"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- Loader -->
          <div v-if="isLoading">
            <skeleton-loader />
          </div>
          <!-- Loader -->
          <!-- ALL HOMES -->
          <div v-else class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in models"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- ALL HOMES --></b-tab-item
        >
        <b-tab-item
          label="0-2,500 SQ. FT."
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 0-2,500 SQ. FT. HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in smallModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 0-2,500 SQ. FT. HOMES --></b-tab-item
        >
        <b-tab-item
          label="2,500-5,000 SQ. FT."
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 2,500-5,000 SQ. FT. HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in bigModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 2,500-5,000 SQ. FT. HOMES --></b-tab-item
        >
        <b-tab-item
          label="1-2 BEDROOM"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 1-2 BEDROOM HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in fourBedsModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 1-2 BEDROOM HOMES --></b-tab-item
        >
        <b-tab-item
          label="3 BEDROOM"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 3 BEDROOM HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in modernModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 3 BEDROOM HOMES --></b-tab-item
        >
        <b-tab-item
          label="4+ BEDROOM"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 4+ BEDROOM HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in traditionalModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 4+ BEDROOM HOMES --></b-tab-item
        >
        <b-tab-item
          label="SINGLE LEVEL"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- SINGLE LEVEL HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in craftsmanModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- SINGLE LEVEL HOMES --></b-tab-item
        >
        <b-tab-item
          label="2+ LEVELS"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold is-size-7-mobile"
        >
          <!-- 2+ LEVELS HOMES -->
          <div class="mx-5 mx-0-mobile">
            <div class="columns is-multiline">
              <div
                v-for="model in colonialModels"
                :key="model.houseId"
                class="column is-4"
                @mouseover="showByIndex = model"
                @mouseout="showByIndex = null"
              >
                <Card
                  :hover="showByIndex === model"
                  :model="model"
                  @view-model="viewModel(model.houseId)"
                />
              </div>
            </div>
          </div>
          <!-- 2+ LEVELS HOMES --></b-tab-item
        >
      </b-tabs>
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

export default {
  name: 'Homepage',
  components: {
    Card,
    SkeletonLoader,
  },
  data() {
    return {
      showByIndex: null,
      signUpModal: false,
      models: {},
      colonialModels: {},
      craftsmanModels: {},
      smallModels: {},
      bigModels: {},
      modernModels: {},
      traditionalModels: {},
      fourBedsModels: {},
      isLoading: true,
      tab: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        await this.$axios.get('/management/getAllModels').then((r) => {
          this.models = r.data.data
          this.colonialModels = this.models.filter((model) =>
            model.tag.includes('Colonial')
          )
          this.craftsmanModels = this.models.filter((model) =>
            model.tag.includes('Craftsman')
          )
          this.smallModels = this.models.filter((model) =>
            model.tag.includes('0-2,500 SQ. FT.')
          )
          this.bigModels = this.models.filter((model) =>
            model.tag.includes('2,500-5,000 SQ. FT.')
          )
          this.modernModels = this.models.filter((model) =>
            model.tag.includes('Modern')
          )
          this.traditionalModels = this.models.filter((model) =>
            model.tag.includes('Traditional')
          )
          this.fourBedsModels = this.models.filter((model) =>
            model.tag.includes('4 Bedroom')
          )

          // eslint-disable-next-line no-console
          console.log(this.models)
          this.isLoading = false
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    viewModel(idModel) {
      this.$router.push({ name: 'model-id', params: { id: idModel } })
    },
  },
}
</script>

<style scoped>
.bg-home {
  background-image: url(~assets/images/background.jpg);
  background-size: cover;
  height: 100vh;
}
</style>
