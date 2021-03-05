<template>
  <section>
    <div class="bg-home py-6">
      <h1 class="title is-2 has-text-centered my-6">ELIZABETH'S HOMES</h1>
      <!-- HOMES -->
      <div class="mx-5 mx-0-mobile">
        <div class="columns is-multiline">
          <div
            v-for="model in models"
            :key="model.id"
            class="column is-4"
            @mouseover="showByIndex = model"
            @mouseout="showByIndex = null"
          >
            <card-dashboard
              :hover="showByIndex === model"
              :model="model"
              @view-model="viewModel(model.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardDashboard from '@/components/CardDashboard.vue'
import model1 from '@/assets/images/model-1.png'
import model2 from '@/assets/images/model-2.png'
import model3 from '@/assets/images/model-3.png'

export default {
  name: 'HomePage',
  components: {
    CardDashboard,
  },
  data() {
    return {
      showByIndex: null,
      signUpModal: false,
      models: [
        {
          id: 1,
          image: model1,
          title: 'MODEL 1',
          price: '731,500',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          id: 2,
          image: model2,
          title: 'MODEL 6',
          price: '515,000',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          id: 3,
          image: model3,
          title: 'MODEL 11',
          price: '246,800',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          id: 4,
          image: model1,
          title: 'MODEL 4',
          price: '731,900',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
    }
  },
  methods: {
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
}
</style>
