<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="model.image" :alt="model.title" class="border-green" />
        </figure>
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <h4 class="title has-text-primary">{{ model.title }}</h4>
        <p class="subtitle is-7">{{ model.description }}</p>
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
}
</script>

<style scoped>
.border-green {
  border-bottom: 5px solid #027881;
}
</style>
