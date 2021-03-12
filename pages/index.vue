<template>
  <section>
    <div class="bg-home py-6">
      <h1 class="title is-2 has-text-centered my-6">
        40 MASTERFULLY CRAFTED HOMES<br />TO CHOOSE FROM
      </h1>
      <!-- TABS -->
      <b-tabs
        position="is-centered"
        type="is-toggle"
        class="block"
        size="is-small"
        multiline
      >
        <b-tab-item
          label="ALL HOMES"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="0-2,500 SQ. FT."
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="2,500-5,000 SQ. FT."
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="4 BEDROOM"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="MODERN"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="TRADITIONAL"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="CRAFTSMAN"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
        <b-tab-item
          label="COLONIAL"
          header-class="mx-4 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
        ></b-tab-item>
      </b-tabs>
      <!-- HOMES -->
      <div class="mx-5 mx-0-mobile">
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
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card.vue'
// import model1 from '@/assets/images/model-1.png'
// import model2 from '@/assets/images/model-2.png'
// import model3 from '@/assets/images/model-3.png'

export default {
  name: 'Homepage',
  components: {
    Card,
  },
  data() {
    return {
      showByIndex: null,
      signUpModal: false,
      models: {},
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        await this.$axios.get('/management/getAllModels').then((r) => {
          this.models = r.data
          // eslint-disable-next-line no-console
          console.log(this.models)
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
