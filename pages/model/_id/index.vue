<template>
  <div v-if="loading"></div>
  <div v-else class="no-scroll">
    <video-modal
      :video-url="model.video_url"
      :is-active="isVideoModalActive"
      @cancel="trashCancel"
    />
    <details-modal :is-active="isDetailsModalActive" @cancel="trashCancel" />
    <floorplan-modal
      :is-active="isFloorplanModalActive"
      @cancel="trashCancel"
    />
    <customize-home-modal
      :is-active="isCustomizeHomeModalActive"
      :appliances="model.appliances"
      @cancel="trashCancel"
    />
    <div class="sidebar-page is-hidden-touch">
      <section class="sidebar-layout">
        <b-sidebar
          position="static"
          :expand-on-hover="true"
          :reduce="true"
          type="is-black"
          open
          fullheight
        >
          <hooper
            :vertical="true"
            style="height: 100%; width: 100%"
            :items-to-show="images.length"
            infinite-scroll
          >
            <slide v-for="(image, index) in images" :key="image.length">
              <div
                :style="{
                  'background-image': 'url(' + image.url + ')',
                }"
                class="bgImage m-3"
                @click.prevent="goToSlide(index)"
              ></div>
            </slide>
          </hooper>
        </b-sidebar>

        <hooper
          ref="carousel"
          style="height: 100vh; width: 100%"
          :settings="hooperSettings"
        >
          <slide v-for="image in images" :key="image.length">
            <div
              :style="{
                'background-image': 'url(' + image.url + ')',
              }"
              class="bgImage container is-fluid margin-nav"
              style="background-size: 100% 100%"
            >
              <div class="columns content-bottom is-mobile">
                <div class="column is-2">
                  <p class="subtitle is-6 has-text-white">
                    Living Room 300 sq. ft.
                  </p>
                </div>
                <div class="column columns mb-0">
                  <div class="column">
                    <h1 class="title is-2 has-text-white has-text-centered">
                      {{ model.model_name }}
                    </h1>
                    <h4
                      class="subtitle is-5 has-text-white text-max has-text-centered"
                    >
                      {{ model.short_description }}
                    </h4>
                  </div>
                  <!-- <div>
                <h1 class="title is-1 has-text-white">|</h1>
              </div> -->
                  <div
                    class="column is-3 is-flex is-justify-content-space-around border-left"
                  >
                    <!-- <div>
                      <h1 class="title is-2 has-text-white">
                        ${{ model.price }}
                      </h1>
                      <h4 class="subtitle is-5 has-text-white text-max">
                        {{ model.description_price }}
                      </h4>
                    </div> -->
                    <div class="is-flex is-align-items-center">
                      <b-button
                        type="is-primary"
                        rounded
                        @click.prevent="customizeModal"
                        >CUSTOMIZE HOME</b-button
                      >
                    </div>
                  </div>
                  <!-- <div>
                <h1 class="title is-1 has-text-white">|</h1>
              </div> -->
                  <div class="column border-left">
                    <div class="is-flex is-justify-content-space-around">
                      <a @click.prevent="videoModal">
                        <img
                          src="@/assets/images/icon_video.svg"
                          alt="icon_pdf"
                          class="image is-48x48 m-auto"
                        />
                        <p
                          class="subtitle is-6 has-text-white mt-3 has-text-centered"
                        >
                          Video
                        </p>
                      </a>
                      <a>
                        <img
                          src="@/assets/images/icon_360.svg"
                          alt="icon_pdf"
                          class="image is-48x48 m-auto"
                        />
                        <p
                          class="subtitle is-6 has-text-white mt-3 has-text-centered"
                        >
                          View in 360º
                        </p>
                      </a>
                      <a @click.prevent="detailsModal">
                        <img
                          src="@/assets/images/icon_details.svg"
                          alt="icon_share"
                          class="image is-48x48 m-auto"
                        />
                        <p
                          class="subtitle is-6 has-text-white mt-3 has-text-centered"
                        >
                          Details
                        </p>
                      </a>
                      <a @click.prevent="floorplanModal">
                        <img
                          src="@/assets/images/icon_floorplans.svg"
                          alt="icon_edit"
                          class="image is-48x48 m-auto"
                        />
                        <p
                          class="subtitle is-6 has-text-white mt-3 has-text-centered"
                        >
                          Foorplan
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div>
                    <!-- <a class="is-align-items-center columns">
                      <div class="column is-8">
                        <p
                          class="subtitle is-6 has-text-white has-text-centered"
                        >
                          View in 360º
                        </p>
                      </div>
                      <div class="column">
                        <img
                          src="@/assets/images/icon_360.svg"
                          alt="icon_pdf"
                          class="image is-48x48"
                        />
                      </div>
                    </a> -->
                    <a class="is-align-items-center columns">
                      <div class="column is-8">
                        <p
                          class="subtitle is-6 has-text-white has-text-centered"
                        >
                          Change interior
                        </p>
                      </div>
                      <div class="column">
                        <img
                          src="@/assets/images/icon_interior.svg"
                          alt="icon_pdf"
                          class="image is-48x48"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </hooper>
      </section>
    </div>
    <div class="is-hidden-desktop">
      <div class="has-background-primary p-4 top-title">
        <h1 class="title is-3 has-text-white has-text-centered">
          {{ model.model_name }}
        </h1>
        <h4 class="subtitle is-6 has-text-white has-text-centered text-max">
          {{ model.short_description }}
        </h4>
      </div>
      <hooper
        :vertical="true"
        style="height: 100vh; width: 100%; margin-top: 3.25rem"
        :items-to-show="1.5"
        infinite-scroll
      >
        <slide v-for="image in images" :key="image.length">
          <div
            :style="{
              'background-image': 'url(' + image.url + ')',
            }"
            class="bgImage container is-fluid"
          >
            <div
              class="content-bottom is-flex is-justify-content-space-between"
            >
              <div>
                <p class="subtitle is-7 has-text-white">
                  Living Room 300 sq. ft.
                </p>
              </div>
              <div>
                <!-- <a class="is-align-items-center columns is-flex">
                  <div class="column is-8">
                    <p class="subtitle is-7 has-text-white has-text-centered">
                      View in 360º
                    </p>
                  </div>
                  <div class="column">
                    <img
                      src="@/assets/images/icon_360.svg"
                      alt="icon_pdf"
                      class="image is-48x48"
                    />
                  </div>
                </a> -->
                <a class="is-align-items-center columns is-flex">
                  <div class="column is-8">
                    <p class="subtitle is-7 has-text-white has-text-centered">
                      Change interior
                    </p>
                  </div>
                  <div class="column">
                    <img
                      src="@/assets/images/icon_interior.svg"
                      alt="icon_pdf"
                      class="image is-48x48"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </slide>
      </hooper>
      <div class="bottom-content columns">
        <div
          class="column is-half is-offset-one-quarter is-grid mt-5 is-fullheight"
        >
          <!-- <div>
            <h1 class="title is-3 has-text-white has-text-centered">
              ${{ model.price }}
            </h1>
            <h4 class="subtitle is-6 has-text-white has-text-centered text-max">
              {{ model.description_price }}
            </h4>
          </div> -->
          <div>
            <div class="is-flex is-justify-content-center my-2">
              <a class="mx-2" @click.prevent="videoModal">
                <img
                  src="@/assets/images/icon_video.svg"
                  alt="icon_pdf"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Video
                </p>
              </a>
              <a class="mx-2" @click.prevent="videoModal">
                <img
                  src="@/assets/images/icon_360.svg"
                  alt="icon_pdf"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  View in 360º
                </p>
              </a>
              <a class="mx-2" @click.prevent="detailsModal">
                <img
                  src="@/assets/images/icon_details.svg"
                  alt="icon_share"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Details
                </p>
              </a>
              <a class="mx-2" @click.prevent="floorplanModal">
                <img
                  src="@/assets/images/icon_floorplans.svg"
                  alt="icon_edit"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Foorplan
                </p>
              </a>
            </div>
          </div>
          <div class="is-flex is-justify-content-center">
            <b-button
              type="is-primary"
              size="is-small"
              rounded
              @click.prevent="customizeModal"
              >CUSTOMIZE HOME</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import VideoModal from '@/components/VideoModal.vue'
import DetailsModal from '@/components/DetailsModal.vue'
import FloorplanModal from '@/components/FloorplanModal.vue'
import CustomizeHomeModal from '@/components/CustomizeHomeModal.vue'

export default {
  components: {
    Hooper,
    Slide,
    VideoModal,
    DetailsModal,
    FloorplanModal,
    CustomizeHomeModal,
  },
  // auth: 'guest',
  data() {
    return {
      isVideoModalActive: false,
      isDetailsModalActive: false,
      isFloorplanModalActive: false,
      isCustomizeHomeModalActive: false,
      hooperSettings: {
        vertical: true,
        centerMode: true,
        infiniteScroll: true,
      },
      loading: true,
      model: {},
      images: {},
    }
  },
  mounted() {
    if (this.$route.params.id === undefined) {
      this.$router.push('/')
    }
    this.getData()
  },
  methods: {
    getData() {
      this.$axios
        .get('/management/getModel/' + this.$route.params.id)
        .then((r) => {
          this.model = r.data
          this.images = this.model.images
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(this.model)
        })
    },
    goToSlide(index) {
      this.$refs.carousel.slideTo(index)
    },
    videoModal() {
      this.isVideoModalActive = true
    },
    detailsModal() {
      this.isDetailsModalActive = true
    },
    floorplanModal() {
      this.isFloorplanModalActive = true
    },
    customizeModal() {
      this.isCustomizeHomeModalActive = true
    },
    trashCancel() {
      this.isVideoModalActive = false
      this.isDetailsModalActive = false
      this.isFloorplanModalActive = false
      this.isCustomizeHomeModalActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
// body {
//   height: 100vh;
//   overflow: hidden;
// }
.text-max {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.no-scroll {
  height: 100vh;
  overflow: hidden;
}
.top-title {
  position: fixed;
  top: 4rem;
  z-index: 30;
  left: 0;
  right: 0;
}
.bottom-content {
  position: absolute;
  bottom: 0%;
  left: 0;
  right: 0;
  height: 23vh;
  background: rgba(0, 0, 0, 0.8);
}
.border-left {
  border-left: 2px solid white;
}
.bgImage {
  height: inherit;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
// .margin-nav {
//   margin-top: 3.25rem;
// }
.content-bottom {
  height: 95%;
  align-items: flex-end;
}
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
