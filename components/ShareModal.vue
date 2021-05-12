<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    :width="1000"
    :custom-class="'is-fullwidth'"
  >
    <div class="is-flex is-flex-wrap-wrap-reverse">
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
            <a
              href="https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https%3A%2F%2Fwww.s2amodular.com%2F&display=popup&ref=plugin&src=share_button"
              target="_blank"
            >
              <div class="is-flex is-justify-content-center">
                <b-icon icon="facebook" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Facebook</p>
            </a>
            <a
              href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw&text=Check%20out&tw_p=tweetbutton&url=https%3A%2F%2Fwww.s2amodular.com%2F"
              target="_blank"
            >
              <div class="is-flex is-justify-content-center">
                <b-icon icon="twitter" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Twitter</p>
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=www.s2amodular.com"
              target="_blank"
            >
              <div class="is-flex is-justify-content-center">
                <b-icon icon="linkedin" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Linkedin</p>
            </a>
          </div>
          <div class="is-flex is-justify-content-space-around my-6">
            <a
              href="mailto:?Subject=Check%20this%20website%20www.s2amodular.com"
              target="_blank"
            >
              <div class="is-flex is-justify-content-center">
                <b-icon icon="email" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Email</p>
            </a>
            <a @click.prevent="copyLink">
              <div class="is-flex is-justify-content-center">
                <b-icon icon="content-copy" size="is-large"></b-icon>
              </div>
              <p class="subtitle has-text-centered is-7">Copy Link</p>
            </a>
          </div>
        </section>
      </div>
      <a class="mx-auto" @click.prevent="cancel">
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
      toCopy: 'www.s2amodular.com',
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
    copyLink() {
      this.$buefy.toast.open({
        message: 'Link was copied successfully to your clipboard!',
        type: 'is-success',
      })
    },
  },
}
</script>

<style></style>
