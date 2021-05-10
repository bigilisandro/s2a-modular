<template>
  <div>
    <share-modal :is-active="isShareModalActive" @cancel="trashCancel" />
    <edit-home-modal
      :is-active="isEditModalHomeActive"
      :appliances="appliances"
      @cancel="trashCancel"
    />
    <div class="card">
      <div
        :style="{ 'background-image': 'url(' + model.mainImage + ')' }"
        class="bgImage"
      >
        <div
          class="is-flex is-align-items-flex-end is-justify-content-flex-end is-fullheight"
        >
          <div class="model-bottom">{{ model.model_name }}</div>
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
          {{ model.name }} <span class="mx-2">|</span> $ {{ model.price }}
        </h4>
        <p class="subtitle is-7">{{ model.description }}</p>
        <div class="is-flex is-justify-content-space-around">
          <a
            v-if="model.pdfSpecs"
            :href="model.pdfSpecs"
            download
            target="_blank"
            class="is-flex is-align-items-center"
          >
            <img
              src="@/assets/images/icon_pdf.svg"
              alt="icon_pdf"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Download Specs</p>
          </a>
          <a class="is-flex is-align-items-center" @click.prevent="shareModal">
            <img
              src="@/assets/images/icon_share.svg"
              alt="icon_share"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Share</p>
          </a>
          <a class="is-flex is-align-items-center" @click.prevent="editModal">
            <img
              src="@/assets/images/icon_edit.svg"
              alt="icon_edit"
              class="image is-32x32 mr-2"
            />
            <p class="subtitle is-7">Edit Home</p>
          </a>
        </div>
        <div
          class="is-flex mt-4 is-align-items-center is-flex-wrap-wrap is-justify-content-center-mobile"
        >
          <div>
            <b-button
              type="is-primary"
              rounded
              size="is-small"
              class="px-6 my-2"
              >SEND TO S2A</b-button
            >
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
import EditHomeModal from '@/components/EditHomeModal.vue'
import ShareModal from '@/components/ShareModal.vue'
export default {
  components: { EditHomeModal, ShareModal },
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    appliances: {
      type: Array,
      default: () => {},
    },
    areas: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      // bgImage: null,
      isEditModalHomeActive: false,
      isShareModalActive: false,
    }
  },
  // computed: {
  //   bgImage() {
  //     return 'url(' + this.model.mainImage + ')'
  //   },
  // },
  methods: {
    editModal() {
      this.isEditModalHomeActive = true
    },
    shareModal() {
      this.isShareModalActive = true
    },
    trashCancel() {
      this.isShareModalActive = false
      this.isEditModalHomeActive = false
    },
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
