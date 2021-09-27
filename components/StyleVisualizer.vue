<template>
  <b-modal
    :active.sync="isModalActive"
    full-screen
    :can-cancel="['escape', 'outside']"
  >
    <div>
      <div class="my-6 py-6">
        <b-carousel-list
          v-model="values"
          :data="specialGallery"
          :items-to-show="1.2"
        >
          <template #item="list">
            <img :src="list[0].url" alt="" />
          </template>
        </b-carousel-list>
      </div>
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
            >
            </b-pagination>
          </div>
          <div class="is-flex is-align-items-center">
            <b-button type="is-primary" rounded class="mr-2" @click="browse"
              >BROWSE ALL OPTIONS</b-button
            >
            <b-button rounded @click="cancel">CLOSE</b-button>
          </div>
        </div>
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
.footer-modal-style {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
