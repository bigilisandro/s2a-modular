<template>
  <b-modal :active.sync="isModalActive" :can-cancel="['escape', 'outside']">
    <div class="is-flex is-flex-wrap-wrap-reverse-mobile">
      <div class="columns is-flex mr-2" style="height: 60vh; width: 100%">
        <div class="column p-0">
          <img
            :src="details.images[1].url"
            class="is-fullheight is-fullwidth"
          />
        </div>
        <div class="has-background-white p-5 column" style="overflow: scroll">
          <p class="subtitle is-6 mt-2">
            {{ details.description_price }}
          </p>
        </div>
      </div>
      <a
        class="mx-auto mb-2-mobile"
        style="width: 10vh"
        @click.prevent="cancel"
      >
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
    details: {
      type: Object,
      default: () => {},
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
