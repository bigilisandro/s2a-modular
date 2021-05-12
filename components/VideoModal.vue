<template>
  <b-modal :active.sync="isModalActive" :can-cancel="['escape', 'outside']">
    <div class="is-flex is-flex-wrap-wrap-reverse-mobile">
      <div class="mx-2 is-fullwidth">
        <iframe
          width="100%"
          height="480"
          :src="videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a class="mx-auto mb-2-mobile" @click.prevent="cancel">
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
    videoUrl: {
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
