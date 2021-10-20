<template>
  <div v-if="!loggedInUser"></div>
  <section v-else>
    <!-- Loader -->
    <div v-if="isLoading">
      <skeleton-loader />
    </div>
    <!-- Loader -->
    <div v-else class="bg-home py-6">
      <div class="mx-6">
        <nuxt-link to="/dashboard" class="subtitle is-7"
          >&#60; My Homes</nuxt-link
        >

        <share-modal :is-active="isShareModalActive" @cancel="trashCancel" />
        <edit-home-modal
          :is-active="isEditModalHomeActive"
          :appliances="appliances"
          :model="model"
          @cancel="trashCancel"
        />
        <div class="columns is-justify-content-center">
          <div class="column is-4 has-text-centered">
            <h1 class="title is-2 is-size-3-mobile mb-6">
              {{ model.userModelName }}
              <span class="mx-2">|</span>
              ${{ model.data.price }}
            </h1>
            <p class="subtitle is-5 has-text-weight-bold">
              {{ model.data.model_name }}
            </p>
            <p class="subtitle is-7">{{ model.data.description }}</p>
            <div class="is-flex is-justify-content-space-around">
              <a
                v-if="model.data.pdfSpecs"
                :href="model.data.pdfSpecs"
                download
                target="_blank"
                class="is-flex is-align-items-center"
              >
                <img
                  src="@/assets/images/icon_pdf.svg"
                  alt="icon_pdf"
                  class="image is-32x32 mr-2"
                />
                <p class="subtitle is-7">Download Specs</p>
              </a>
              <a
                class="is-flex is-align-items-center"
                @click.prevent="shareModal"
              >
                <img
                  src="@/assets/images/icon_share.svg"
                  alt="icon_share"
                  class="image is-32x32 mr-2"
                />
                <p class="subtitle is-7">Share</p>
              </a>
              <a
                class="is-flex is-align-items-center"
                @click.prevent="editModal"
              >
                <img
                  src="@/assets/images/icon_edit.svg"
                  alt="icon_edit"
                  class="image is-32x32 mr-2"
                />
                <p class="subtitle is-7">Edit Home</p>
              </a>
            </div>
          </div>
        </div>
        <!-- <div
          v-if="areas.length"
          class="my-4"
          style="height: 250px; overflow: hidden"
        >
          <b-carousel-list
            v-model="values"
            :data="areas[0].images"
            :items-to-show="3"
          >
            <template #item="list">
              <img :src="list.url" alt="" />
            </template>
          </b-carousel-list>
        </div> -->
        <section>
          <h4 class="title is-4 has-text-primary">EXTERIOR</h4>
          <div class="columns is-multiline">
            <div
              v-for="appliance in appliances"
              :key="appliance.id"
              class="column is-2"
            >
              <div class="card p-4">
                <p class="subtitle is-6 has-text-weight-bold mb-0">
                  {{ appliance.name }}
                </p>
                <p class="subtitle is-7 mb-2">{{ appliance.brand }}</p>
                <b-skeleton width="100%" height="80px"></b-skeleton>
                <div class="is-flex mt-3 is-align-items-center">
                  <a class="level-item mr-3">
                    <span class="icon is-medium">
                      <b-skeleton width="30px" height="30px"></b-skeleton>
                    </span>
                  </a>
                  <p class="subtitle is-7 mb-2">{{ appliance.color }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h4 class="title is-4 has-text-primary mt-5">INTERIOR</h4>
          <div class="columns is-multiline">
            <div
              v-for="appliance in appliances"
              :key="appliance.id"
              class="column is-2"
            >
              <div class="card p-4">
                <p class="subtitle is-6 has-text-weight-bold mb-0">
                  {{ appliance.name }}
                </p>
                <p class="subtitle is-7 mb-2">{{ appliance.brand }}</p>
                <b-skeleton width="100%" height="80px"></b-skeleton>
                <div class="is-flex mt-3 is-align-items-center">
                  <a class="level-item mr-3">
                    <span class="icon is-medium">
                      <b-skeleton width="30px" height="30px"></b-skeleton>
                    </span>
                  </a>
                  <p class="subtitle is-7 mb-2">{{ appliance.color }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

export default {
  name: 'Dashboard',
  components: {
    SkeletonLoader,
  },
  data() {
    return {
      models: {},
      model: {},
      areas: {},
      appliances: {},
      isLoading: true,
      isEditModalHomeActive: false,
      isShareModalActive: false,
      values: 1,
      perList: 4,
      increment: 1,
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
      try {
        await this.$axios.get('/auth/user').then((r) => {
          console.log(r, 'r')
          // eslint-disable-next-line no-console
          this.models = r.data.data
          for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].house.id === this.$route.params.id) {
              this.model = this.models[i].house
              this.areas = this.models[i].areas
              this.appliances = this.models[i].appliances
              console.log(this.models[i], 'model')
            }
          }
          this.isLoading = false
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    editModal() {
      this.isEditModalHomeActive = true
    },
    shareModal() {
      this.isShareModalActive = true
    },
    trashCancel() {
      this.isShareModalActive = false
      this.isEditModalHomeActive = false
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
