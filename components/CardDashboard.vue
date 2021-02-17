<template>
  <div>
    <div class="card">
      <div :style="{ 'background-image': bgImage }" class="bgImage">
        <div
          class="is-flex is-align-items-flex-end is-justify-content-flex-end is-fullheight"
        >
          <b-tag type="is-primary">{{ model.title }}</b-tag>
        </div>
        <!-- <figure class="image">
          <img :src="model.image" :alt="model.title" class="border-green" />
        </figure> -->
        <!-- <div v-show="hover" class="hoverImage">
          <b-button rounded @click="viewModel">View</b-button>
        </div> -->
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <h4 class="title has-text-primary">
          {{ model.title }} <span class="mx-2">|</span> $ {{ model.price }}
        </h4>
        <p class="subtitle is-7">{{ model.description }}</p>
        <div class="is-flex is-justify-content-space-around">
          <a class="is-flex is-align-items-center">
            <img
              src="@/assets/images/icon_pdf.svg"
              alt="icon_pdf"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Download Specs</p>
          </a>
          <a class="is-flex is-align-items-center">
            <img
              src="@/assets/images/icon_share.svg"
              alt="icon_share"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Share</p>
          </a>
          <a class="is-flex is-align-items-center">
            <img
              src="@/assets/images/icon_edit.svg"
              alt="icon_edit"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Edit Home</p>
          </a>
        </div>
        <div class="is-flex mt-4 is-align-items-center">
          <div>
            <b-button rounded size="is-small">SEND TO S2A</b-button>
          </div>
          <div>
            <p class="subtitle is-7 ml-3">
              A representative will reach out to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bgImage: 'url(' + this.model.image + ')',
    }
  },
}
</script>

<style scoped>
.border-green {
  border-bottom: 5px solid #027881;
}
.bgImage {
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-bottom: 5px solid #027881;
}
</style>
