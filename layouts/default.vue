<template>
  <div>
    <Navbar v-if="isAuthenticated" />
    <NavbarLogin v-else />

    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarLogin from '@/components/NavbarLogin.vue'
import Navbar from '../components/Navbar'
export default {
  components: Navbar,
  NavbarLogin,
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
