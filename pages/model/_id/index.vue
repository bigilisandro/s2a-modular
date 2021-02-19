<template>
  <div>
    <video-modal :is-active="isVideoModalActive" @cancel="trashCancel" />
    <details-modal :is-active="isDetailsModalActive" @cancel="trashCancel" />
    <floorplan-modal
      :is-active="isFloorplanModalActive"
      @cancel="trashCancel"
    />
    <hooper
      :vertical="true"
      style="height: 100vh"
      :items-to-show="1"
      :center-mode="true"
    >
      <slide v-for="image in images" :key="image.length">
        <div
          :style="{ 'background-image': image.bgImage }"
          class="bgImage container is-fluid"
        >
          <div class="columns content-bottom">
            <div class="column is-2">
              <p class="subtitle is-6 has-text-white">
                Living Room 300 sq. ft.
              </p>
            </div>
            <div class="column columns mb-0">
              <div class="column is-3">
                <h1 class="title is-2 has-text-white">MODEL 1</h1>
                <h4 class="subtitle is-5 has-text-white">
                  2,000 SQ FT · 2 BED 2 BATH
                </h4>
              </div>
              <!-- <div>
                <h1 class="title is-1 has-text-white">|</h1>
              </div> -->
              <div
                class="column is-flex is-justify-content-space-around border-left"
              >
                <div>
                  <h1 class="title is-2 has-text-white">$510,250</h1>
                  <h4 class="subtitle is-5 has-text-white">
                    GREENLUX Configuration
                  </h4>
                </div>
                <div class="is-flex is-align-items-center">
                  <b-button rounded>CUSTOMIZE HOME</b-button>
                </div>
              </div>
              <!-- <div>
                <h1 class="title is-1 has-text-white">|</h1>
              </div> -->
              <div class="column is-3 border-left">
                <div class="is-flex is-justify-content-space-around">
                  <a @click.prevent="videoModal">
                    <img
                      src="@/assets/images/icon_video.svg"
                      alt="icon_pdf"
                      class="image is-48x48"
                    />
                    <p
                      class="subtitle is-6 has-text-white mt-3 has-text-centered"
                    >
                      Video
                    </p>
                  </a>
                  <a @click.prevent="detailsModal">
                    <img
                      src="@/assets/images/icon_details.svg"
                      alt="icon_share"
                      class="image is-48x48"
                    />
                    <p
                      class="subtitle is-6 has-text-white mt-3 has-text-centered"
                    >
                      Details
                    </p>
                  </a>
                  <a @click.prevent="floorplanModal">
                    <img
                      src="@/assets/images/icon_floorplans.svg"
                      alt="icon_edit"
                      class="image is-48x48"
                    />
                    <p
                      class="subtitle is-6 has-text-white mt-3 has-text-centered"
                    >
                      Foorplan
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div class="column is-2">
              <div>
                <a class="is-align-items-center columns">
                  <div class="column is-8">
                    <p class="subtitle is-6 has-text-white has-text-centered">
                      View in 360º
                    </p>
                  </div>
                  <div class="column">
                    <img
                      src="@/assets/images/icon_360.svg"
                      alt="icon_pdf"
                      class="image is-48x48"
                    />
                  </div>
                </a>
                <a class="is-align-items-center columns">
                  <div class="column is-8">
                    <p class="subtitle is-6 has-text-white has-text-centered">
                      Change interior
                    </p>
                  </div>
                  <div class="column">
                    <img
                      src="@/assets/images/icon_interior.svg"
                      alt="icon_pdf"
                      class="image is-48x48"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import model1 from '@/assets/images/model-1.png'
import model2 from '@/assets/images/model-2.png'
import model3 from '@/assets/images/model-3.png'
import VideoModal from '@/components/VideoModal.vue'
import DetailsModal from '@/components/DetailsModal.vue'
import FloorplanModal from '@/components/FloorplanModal.vue'

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    VideoModal,
    DetailsModal,
    FloorplanModal,
  },
  data() {
    return {
      isVideoModalActive: false,
      isDetailsModalActive: false,
      isFloorplanModalActive: false,
      images: [
        {
          bgImage: 'url(' + model1 + ')',
        },
        {
          bgImage: 'url(' + model2 + ')',
        },
        {
          bgImage: 'url(' + model3 + ')',
        },
      ],
    }
  },
  methods: {
    videoModal() {
      this.isVideoModalActive = true
    },
    detailsModal() {
      this.isDetailsModalActive = true
    },
    floorplanModal() {
      this.isFloorplanModalActive = true
    },
    trashCancel() {
      this.isVideoModalActive = false
      this.isDetailsModalActive = false
      this.isFloorplanModalActive = false
    },
  },
}
</script>

<style scoped>
.border-left {
  border-left: 2px solid white;
}
.bgImage {
  height: inherit;
  background-repeat: no-repeat;
  background-size: contain;
}
.content-bottom {
  height: 90%;
  align-items: flex-end;
}
</style>
