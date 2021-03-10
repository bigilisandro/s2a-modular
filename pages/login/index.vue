<template>
  <div>
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
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="0-2,500 SQ. FT."
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="2,500-5,000 SQ. FT."
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="4 BEDROOM"
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="MODERN"
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="TRADITIONAL"
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="CRAFTSMAN"
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
          <b-tab-item
            label="COLONIAL"
            header-class="mx-2 has-background-white my-2 border-radius-30px has-text-weight-bold w-15vh"
          ></b-tab-item>
        </b-tabs>
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
              <Card
                :hover="showByIndex === model"
                :model="model"
                @view-model="viewModel(model.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import model1 from '@/assets/images/model-1.png'
import model2 from '@/assets/images/model-2.png'
import model3 from '@/assets/images/model-3.png'

export default {
  name: 'Login',
  components: {
    Card,
  },
  auth: 'guest',
  // layout: 'login',
  data() {
    return {
      showByIndex: null,
      signUpModal: false,
      models: [
        {
          id: 1,
          image: model1,
          title: 'MODEL 1',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        },
        {
          id: 2,
          image: model2,
          title: 'MODEL 6',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        },
        {
          id: 3,
          image: model3,
          title: 'MODEL 11',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        },
        {
          id: 4,
          image: model1,
          title: 'MODEL 4',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        },
        {
          id: 5,
          image: model2,
          title: 'MODEL 2',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        },
        {
          id: 6,
          image: model3,
          title: 'MODEL 22',
          description:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
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
