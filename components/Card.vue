<template>
  <div>
    <div class="card">
      <div :style="{ 'background-image': bgImage }" class="bgImage">
        <!-- <figure class="image">
          <img :src="model.image" :alt="model.title" class="border-green" />
        </figure> -->
        <div v-show="hover" class="hoverImage">
          <b-button
            type="is-primary"
            rounded
            class="px-6 has-text-weight-normal"
            @click="viewModel"
            >VIEW</b-button
          >
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <h4 class="title is-4 has-text-primary">
          {{ model.houseModel.toUpperCase() }}
        </h4>
        <p class="subtitle is-6">{{ model.shortHouseDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import model1 from '@/assets/images/model-1.png'
export default {
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    hover: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      bgImage: 'url(' + this.model.url + ')',
    }
  },
  methods: {
    viewModel() {
      this.$emit('view-model')
    },
  },
}
</script>

<style>
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
.hoverImage {
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
