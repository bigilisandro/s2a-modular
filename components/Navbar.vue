<template>
  <b-navbar spaced>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~assets/images/logo_s2a.svg"
          alt="s2a-modular"
          class="image is-fullheight is-fullwidth"
        />
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div" class="mr-4">
        <div class="buttons">
          <a>
            <strong>BROWSE HOMES</strong>
          </a>
          <span class="mx-5"> | </span>
          <a>
            <img
              src="~assets/images/icon_profile.svg"
              alt="s2a-modular"
              class="image is-24x24"
            />
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {}
</script>
