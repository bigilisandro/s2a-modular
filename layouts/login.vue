<template>
  <div>
    <NavbarAdmin v-if="isAuthenticated && isStrategy === 'admin'" />
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarAdmin from '@/components/NavbarAdmin.vue'
export default {
  components: NavbarAdmin,
  computed: {
    ...mapGetters(['isAuthenticated', 'isStrategy', 'loggedInUser']),
  },
}
</script>
