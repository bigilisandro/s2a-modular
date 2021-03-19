<template>
  <section>
    <div>
      <b-tabs type="is-boxed" expanded>
        <b-tab-item label="Homes">
          <div class="my-3 is-flex is-justify-content-center">
            <b-button
              icon-left="plus"
              size="is-large"
              type="is-primary"
              outlined
              >Add Home Model</b-button
            >
          </div>
          <b-collapse
            v-for="(model, index) of models"
            :key="index"
            class="card"
            animation="slide"
            :open="isOpen == index"
            @open="isOpen = index"
          >
            <template #trigger="props">
              <div class="card-header" role="button">
                <p class="card-header-title">
                  {{ model.title }}
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                {{ model.text }}
              </div>
            </div>
          </b-collapse>
        </b-tab-item>
        <b-tab-item label="Catalog"></b-tab-item>
        <b-tab-item label="GREENLUX Catalog"></b-tab-item>
        <b-tab-item label="Sales"></b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: 0,
      models: [
        {
          title: 'Model 1',
          text: 'Text 1',
        },
        {
          title: 'Model 2',
          text: 'Text 2',
        },
        {
          title: 'Model 3',
          text: 'Text 3',
        },
        {
          title: 'Model 4',
          text: 'Text 4',
        },
      ],
    }
  },
}
</script>

<style></style>
