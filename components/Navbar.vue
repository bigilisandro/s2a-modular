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
          <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
            <template #trigger>
              <a>
                <img
                  src="~assets/images/icon_profile.svg"
                  alt="s2a-modular"
                  class="image is-24x24"
                />
              </a>
            </template>

            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless
            >
              <form action="">
                <div class="modal-card" style="width: 300px">
                  <section class="modal-card-body">
                    <b-field>
                      <b-input
                        type="email"
                        placeholder="Email"
                        required
                        rounded
                      >
                      </b-input>
                    </b-field>

                    <b-field>
                      <b-input
                        type="password"
                        password-reveal
                        placeholder="Password"
                        required
                        rounded
                      >
                      </b-input>
                    </b-field>
                    <b-button
                      label="Login"
                      type="is-primary"
                      expanded
                      rounded
                    />
                    <b-button type="is-text" expanded class="bg-hover"
                      >Sign Up</b-button
                    >
                    <p class="subtitle is-7 has-text-centered">
                      Save, share and download specs for all your custom homes.
                    </p>
                  </section>
                </div>
              </form>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped>
.bg-hover:hover {
  background: none !important;
}
</style>
