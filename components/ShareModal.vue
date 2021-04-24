<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex">
      <div class="modal-card mr-2">
        <section class="modal-card-body px-6">
          <div class="is-flex is-justify-content-center my-5">
            <img
              src="~assets/images/logo_s2a.svg"
              alt="s2a-modular"
              class="image"
              style="width: 250px"
            />
          </div>
          <div>
            <h3 class="title has-text-centered is-5 mb-6">Share with</h3>
          </div>
          <div class="is-flex is-justify-content-space-around my-6">
            <div>
              <div class="is-flex is-justify-content-center">
                <b-icon icon="facebook" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Facebook</p>
            </div>
            <div>
              <div class="is-flex is-justify-content-center">
                <b-icon icon="twitter" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Twitter</p>
            </div>
            <div>
              <div class="is-flex is-justify-content-center">
                <b-icon icon="linkedin" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Linkedin</p>
            </div>
          </div>
          <div class="is-flex is-justify-content-space-around my-6">
            <div>
              <div class="is-flex is-justify-content-center">
                <b-icon icon="email" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Email</p>
            </div>
            <div>
              <div class="is-flex is-justify-content-center">
                <b-icon icon="content-copy" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Copy Link</p>
            </div>
          </div>
        </section>
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
