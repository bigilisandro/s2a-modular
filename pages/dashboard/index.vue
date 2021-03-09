<template>
  <div v-if="!loggedInUser"></div>
  <section v-else>
    <div class="bg-home py-6">
      <h1 class="title is-2 has-text-centered my-6">
        {{ loggedInUser.firstName.toUpperCase() }}'S HOMES
      </h1>
      <!-- HOMES -->
      <div class="mx-5 mx-0-mobile">
        <div class="columns is-multiline">
          <div
            v-for="model in models"
            :key="model.house.id"
            class="column is-4"
            @mouseover="showByIndex = model"
            @mouseout="showByIndex = null"
          >
            <card-dashboard
              :hover="showByIndex === model"
              :model="model.house[0]"
              @view-model="viewModel(model.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardDashboard from '@/components/CardDashboard.vue'

export default {
  name: 'HomePage',
  components: {
    CardDashboard,
  },
  data() {
    return {
      showByIndex: null,
      signUpModal: false,
      models: {},
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {
    this.getData()
    if (!this.isAuthenticated) {
      this.$router.push('./')
    }
  },
  methods: {
    async getData() {
      // const config = {
      //   headers: {
      //     Authorization: this.$auth.getToken('local'),
      //   },
      // }
      try {
        await this.$axios.get('/auth/user').then((r) => {
          // eslint-disable-next-line no-console
          console.log(r)
          this.models = r.data.data
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
  background-image: url(~assets/images/background.png);
  background-size: cover;
  height: 100vh;
}
</style>
