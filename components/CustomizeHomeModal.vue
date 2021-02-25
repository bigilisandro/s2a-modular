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
          <div
            class="container"
            style="width: 90vh; height: 50vh; overflow: scroll"
          >
            <h1 class="title is-4 has-text-white">APPLIANCES</h1>
            <div
              v-for="appliance in appliances"
              :key="appliance.length"
              class="p-5 border columns m-5"
            >
              <div class="column">
                <b-carousel :indicator-inside="false" :autoplay="false">
                  <b-carousel-item v-for="(item, i) in 3" :key="i">
                    <span class="image">
                      <img :src="getImgUrl(i)" style="height: 20vh" />
                    </span>
                  </b-carousel-item>
                  <template #indicators="props">
                    <span class="al image">
                      <img :src="getImgUrl(props.i)" :title="props.i" />
                    </span>
                  </template>
                </b-carousel>
              </div>
              <div class="column is-6">
                <h1 class="title is-5 has-text-white">{{ appliance.title }}</h1>
                <p class="subtitle mb-0 has-text-white">LG/543434JNKDW</p>
                <p class="subtitle has-text-white has-text-weight-bold">
                  ${{ appliance.price }}
                </p>
                <p class="subtitle has-text-white is-7">
                  Nunc nec velit nec libero vestibulum eleifend. Curabitur
                  pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                  ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                  lobortis eget.
                </p>
                <ul
                  class="subtitle is-7 has-text-white ml-5"
                  style="list-style: disc"
                >
                  <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                  <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                  <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                  <li>Nunc nec velit nec libero vestibulum eleifend.</li>
                </ul>
              </div>
              <div class="column">
                <p class="subtitle is-7 has-text-white">Choose a color</p>
                <b-field class="has-text-white">
                  <b-checkbox size="is-small">Black Stainless Steel</b-checkbox>
                </b-field>
                <b-field class="has-text-white">
                  <b-checkbox size="is-small">Stainless Steel</b-checkbox>
                </b-field>
                <b-field class="has-text-white">
                  <b-checkbox size="is-small">White</b-checkbox>
                </b-field>
                <b-field class="has-text-white">
                  <b-checkbox size="is-small">Black</b-checkbox>
                </b-field>
              </div>
            </div>
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
      appliances: [
        {
          title: 'REFRIGERATOR',
          price: '2,000',
        },
        {
          title: 'MICROWAVE',
          price: '500',
        },
        {
          title: 'OVEN',
          price: '1000',
        },
      ],
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
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`
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
.border {
  border: 2px solid white;
}
</style>
