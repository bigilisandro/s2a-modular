<template>
  <b-modal
    :active.sync="isModalActive"
    full-screen
    :can-cancel="['escape', 'outside']"
  >
    <div>
      <div>
        <b-carousel-list
          v-model="values"
          :data="specialGallery"
          :items-to-show="1"
        >
          <template #item="list">
            <img
              :src="list[imageValue].url"
              :alt="list[imageValue].url"
              class="image-specialGallery"
            />
            <div class="footer-modal-style py-5 px-5">
              <div class="is-flex is-justify-content-space-between px-6 my-3">
                <div>
                  <b-pagination
                    v-model="current"
                    :total="total"
                    :range-after="rangeAfter"
                    :order="order"
                    rounded
                    :per-page="perPage"
                    @change="setImage"
                  >
                  </b-pagination>
                </div>
                <div class="is-flex is-align-items-center">
                  <b-button
                    type="is-primary"
                    rounded
                    class="mr-2"
                    @click="browse"
                    >BROWSE ALL OPTIONS</b-button
                  >
                  <b-button rounded @click="cancel">CLOSE</b-button>
                </div>
              </div>
            </div>
          </template>
        </b-carousel-list>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isModalActive: false,
      total: 5,
      current: 1,
      perPage: 1,
      rangeAfter: 2,
      values: 0,
      imageValue: 0,
    }
  },
  computed: {
    specialGallery() {
      return Object.values(this.model.specialGallery)
    },
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    setImage() {
      this.imageValue = this.current - 1
      console.log(this.values, this.current)
    },
    cancel() {
      this.$emit('cancel')
    },
    browse() {
      this.$emit('browse')
    },
  },
}
</script>

<style>
/* .footer-modal-style {
  position: absolute;
  bottom: 0;
  width: 100%;
} */
.image-specialGallery {
  width: 100%;
  height: 80%;
}
</style>
