<template>
  <b-modal :active.sync="isModalActive" full-screen>
    <div class="container my-6 py-6">
      <b-tabs vertical expanded animated type="is-toggle">
        <b-tab-item label="GREENLUX EFFICIENT"> </b-tab-item>

        <b-tab-item label="NORMAL POWER GRID"> </b-tab-item>
      </b-tabs>
      <b-tabs vertical expanded animated>
        <b-tab-item disabled>
          <template #header>
            <div>
              <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                Lorem ipsum dolor sit amet.
              </p>
              <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                Lorem ipsum dolor sit amet.
              </p>
              <p class="has-text-white subtitle is-7 has-text-centered mb-0">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </template>
        </b-tab-item>

        <b-tab-item>
          <template #header>
            <span class="has-text-white">EXTERIOR</span>
          </template>
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet.
        </b-tab-item>

        <b-tab-item>
          <template #header>
            <span class="has-text-white">INTERIOR</span>
          </template>
          What light is light, if Silvia be not seen? <br />
          What joy is joy, if Silvia be not by— <br />
          Unless it be to think that she is by <br />
          And feed upon the shadow of perfection? <br />
          Except I be by Silvia in the night, <br />
          There is no music in the nightingale.
        </b-tab-item>

        <b-tab-item>
          <template #header>
            <span class="has-text-white">KITCHEN</span>
          </template>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">MASTER BEDROOM</span>
          </template>
          What light is light, if Silvia be not seen? <br />
          What joy is joy, if Silvia be not by— <br />
          Unless it be to think that she is by <br />
          And feed upon the shadow of perfection? <br />
          Except I be by Silvia in the night, <br />
          There is no music in the nightingale.
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">MASTER BATHROOM</span>
          </template>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">BEDROOM 2</span>
          </template>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">BATHROOM 2</span>
          </template>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">APPLIANCES</span>
          </template>
          <div class="container">
            <h1 class="title is-4 has-text-white">APPLIANCES</h1>
          </div>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <span class="has-text-white">ELECTRICAL</span>
          </template>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
      </b-tabs>
    </div>
    <div class="footer-modal py-5">
      <div class="is-flex is-justify-content-space-between px-6 my-3">
        <div>
          <h1 class="title is-2 has-text-white mb-0">MODEL 1</h1>
        </div>
        <div class="is-flex is-align-items-center">
          <span class="has-text-white">As configured</span>
          <h1 class="title is-2 has-text-white mb-0 mx-5">$510,250</h1>
          <b-button rounded>SAVE HOME</b-button>
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

<style scoped>
.footer-modal {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #027881;
}
.test a {
  border: none !important;
}
</style>
