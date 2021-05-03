<template>
  <b-modal :active.sync="isModalActive">
    <div class="is-flex">
      <div class="mr-2">
        <!-- <img :src="viewIn360" /> -->
        <iframe
          width="100%"
          height="640"
          style="width: 854px; height: 640px; border: none; max-width: 100%"
          frameborder="0"
          allowfullscreen
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          scrolling="no"
          :src="view"
        ></iframe>
      </div>
      <a @click.prevent="cancel">
        <img
          src="@/assets/images/button_close.svg"
          alt="icon_share"
          class="image is-32x32"
        />
      </a>
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
    view: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
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
  },
}
</script>

<style></style>
