<template>
  <b-tag :type="`is-${type}`">{{ message }}</b-tag>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'danger',
      validator: (val) => ['danger', 'success'].includes(val),
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
