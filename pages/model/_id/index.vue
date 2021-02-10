<template>
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
            <p class="subtitle has-text-white">Living Room 300 sq. ft.</p>
          </div>
          <div class="column columns">
            <div class="column is-3">
              <h1 class="title is-2 has-text-white">MODEL 1</h1>
              <h4 class="title is-4 has-text-white">
                2,000 SQ FT - 2 BED 2 BATH
              </h4>
            </div>
            <div>
              <h1 class="title is-1 has-text-white">|</h1>
            </div>
            <div class="column is-5 is-flex is-align-items-center">
              <div>
                <h1 class="title is-2 has-text-white">$510,250</h1>
                <h4 class="title is-4 has-text-white">
                  GREENLUX Configuration
                </h4>
              </div>
              <div>
                <b-button rounded>CUSTOMIZE HOME</b-button>
              </div>
            </div>
            <div>
              <h1 class="title is-1 has-text-white">|</h1>
            </div>
            <div class="column is-3"></div>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import model1 from '@/assets/images/model-1.png'
import model2 from '@/assets/images/model-2.png'
import model3 from '@/assets/images/model-3.png'

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  data() {
    return {
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
}
</script>

<style scoped>
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
