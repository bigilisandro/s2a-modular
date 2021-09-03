<template>
  <div v-if="loading"></div>
  <div v-else class="no-scroll">
    <video-modal
      :video-url="'https://www.youtube.com/embed/' + youtubeId"
      :is-active="isVideoModalActive"
      @cancel="trashCancel"
    />
    <details-modal
      :is-active="isDetailsModalActive"
      :details="model"
      @cancel="trashCancel"
    />
    <floorplan-modal
      :floor-plan="model.floorPlan"
      :is-active="isFloorplanModalActive"
      @cancel="trashCancel"
    />
    <view-in-360-modal
      :view="model.youtube_360"
      :is-active="isViewIn360ModalActive"
      @cancel="trashCancel"
    />
    <customize-home-modal
      :is-active="isCustomizeHomeModalActive"
      :model="model"
      @cancel="trashCancel"
    />
    <style-visualizer
      :is-active="isStyleVisualizerActive"
      :model="model"
      @cancel="trashCancel"
      @browse="browseAllOptions"
    />
    <share-modal :is-active="isShareModalActive" @cancel="trashCancel" />
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
            :items-to-show="imagesDesktop.length"
            infinite-scroll
          >
            <slide
              v-for="(image, index) in imagesDesktopAndAlternative"
              :key="image.length"
            >
              <div
                v-show="image.imageDesktop.imageField === 'gallery'"
                :style="{
                  'background-image': 'url(' + image.imageDesktop.url + ')',
                }"
                class="bgImage m-3"
                @click.prevent="goToSlide(index)"
              ></div>
              <div
                v-show="image.imageDesktop.imageField === 'alternative'"
                :style="{
                  'background-image': 'url(' + image.imageAlternative.url + ')',
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
          <slide
            v-for="image in imagesDesktopAndAlternative"
            :key="image.length"
          >
            <div
              v-show="image.imageDesktop.imageField === 'gallery'"
              :style="{
                'background-image': 'url(' + image.imageDesktop.url + ')',
              }"
              class="bgImage container is-fluid margin-nav mt-2"
              style="background-size: 100% 100%"
            >
              <div class="columns content-bottom is-mobile">
                <div class="column is-2">
                  <p class="subtitle is-6 has-text-white">
                    Living Room 300 sq. ft.
                  </p>
                </div>
                <div class="column columns mb-0"></div>
                <!-- <div class="column is-2">
                  <div>
                    <a
                      class="is-align-items-center columns"
                      @click.prevent="
                        image.imageDesktop.imageField = 'alternative'
                      "
                    >
                      <div class="column is-8">
                        <p
                          class="subtitle is-6 has-text-white has-text-centered"
                        >
                          Change to interior
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
                </div> -->
              </div>
            </div>
            <!-- <div
              v-show="image.imageDesktop.imageField === 'alternative'"
              :style="{
                'background-image': 'url(' + image.imageAlternative.url + ')',
              }"
              class="bgImage container is-fluid margin-nav mt-2"
              style="background-size: 100% 100%"
            >
              <div class="columns content-bottom is-mobile">
                <div class="column is-2">
                  <p class="subtitle is-6 has-text-white">
                    Living Room 300 sq. ft.
                  </p>
                </div>
                <div class="column columns mb-0"></div>
                <div class="column is-2">
                  <div>
                    <a
                      class="is-align-items-center columns"
                      @click.prevent="image.imageDesktop.imageField = 'gallery'"
                    >
                      <div class="column is-8">
                        <p
                          class="subtitle is-6 has-text-white has-text-centered"
                        >
                          Change to exterior
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
            </div> -->
          </slide>
        </hooper>
        <div class="content-bottom-desktop">
          <div class="column columns mb-0">
            <div class="column">
              <h1 class="title is-2 has-text-white has-text-centered">
                {{ model.model_name.toUpperCase() }}
              </h1>
              <h4
                class="subtitle is-5 has-text-white text-max has-text-centered"
              >
                {{ model.short_description }}
              </h4>
            </div>
            <div
              class="column is-flex is-justify-content-space-around border-left"
            >
              <!-- <div>
                <h1 class="title is-2 has-text-white">${{ model.price }}</h1>
                <h4 class="subtitle is-5 has-text-white text-max">
                  {{ model.description_price }}
                </h4>
              </div> -->
              <div class="is-flex is-align-items-center">
                <b-button
                  type="is-primary"
                  rounded
                  class="mx-2"
                  @click.prevent="styleVisualizerModal"
                  >STYLE VISUALIZER</b-button
                >
                <b-button
                  type="is-primary"
                  rounded
                  class="mx-2"
                  @click.prevent="customizeModal"
                  >CUSTOMIZE HOME</b-button
                >
              </div>
            </div>
            <div class="column is-4 border-left">
              <div class="columns">
                <a
                  v-if="model.video_url"
                  class="column"
                  @click.prevent="videoModal"
                >
                  <img
                    src="@/assets/images/icon_video.svg"
                    alt="icon_pdf"
                    class="image is-48x48 m-auto"
                  />
                  <p
                    class="subtitle is-7 has-text-white mt-3 has-text-centered"
                  >
                    Video
                  </p>
                </a>
                <a
                  v-if="model.youtube_360"
                  class="column"
                  :href="model.youtube_360"
                  target="_blank"
                >
                  <img
                    src="@/assets/images/icon_360.svg"
                    alt="icon_pdf"
                    class="image is-48x48 m-auto"
                  />
                  <p
                    class="subtitle is-7 has-text-white mt-3 has-text-centered"
                  >
                    View in 360º
                  </p>
                </a>
                <a class="column" @click.prevent="detailsModal">
                  <img
                    src="@/assets/images/icon_details.svg"
                    alt="icon_share"
                    class="image is-48x48 m-auto"
                  />
                  <p
                    class="subtitle is-7 has-text-white mt-3 has-text-centered"
                  >
                    Details
                  </p>
                </a>
                <a
                  v-if="model.floorPlan"
                  class="column"
                  @click.prevent="floorplanModal"
                >
                  <img
                    src="@/assets/images/icon_floorplans.svg"
                    alt="icon_edit"
                    class="image is-48x48 m-auto"
                  />
                  <p
                    class="subtitle is-7 has-text-white mt-3 has-text-centered"
                  >
                    Foorplan
                  </p>
                </a>
                <a class="column" @click.prevent="shareModal">
                  <img
                    src="@/assets/images/icon_floorplans.svg"
                    alt="icon_edit"
                    class="image is-48x48 m-auto"
                  />
                  <p
                    class="subtitle is-7 has-text-white mt-3 has-text-centered"
                  >
                    Share
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
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
        <slide v-for="image in imagesMobileAndAlternative" :key="image.length">
          <div
            v-show="image.imageMobile.imageField === 'gallery_mobile'"
            :style="{
              'background-image': 'url(' + image.imageMobile.url + ')',
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
                <!-- <a
                  class="is-flex"
                  @click.prevent="
                    image.imageMobile.imageField = 'gallery_alternative_mobile'
                  "
                >
                  <div class="is-flex is-align-items-center mr-3">
                    <p class="subtitle is-7 has-text-white has-text-centered">
                      Change to interior
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/icon_interior.svg"
                      alt="icon_pdf"
                      class="image is-24x24 ml-auto"
                    />
                  </div>
                </a> -->
              </div>
            </div>
          </div>
          <!-- <div
            v-show="
              image.imageMobile.imageField === 'gallery_alternative_mobile'
            "
            :style="{
              'background-image':
                'url(' + image.imageMobileAlternative.url + ')',
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
                <a class="is-align-items-center columns is-flex">
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
                </a>
                <a
                  class="is-flex"
                  @click.prevent="
                    image.imageMobile.imageField = 'gallery_mobile'
                  "
                >
                  <div class="is-flex is-align-items-center mr-3">
                    <p class="subtitle is-7 has-text-white has-text-centered">
                      Change to exterior
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/icon_interior.svg"
                      alt="icon_pdf"
                      class="image is-24x24 ml-auto"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div> -->
        </slide>
      </hooper>
      <div class="bottom-content columns mb-0">
        <div class="column is-half is-offset-one-quarter is-grid is-fullheight">
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
              <a
                v-if="model.video_url"
                class="mx-2"
                @click.prevent="videoModal"
              >
                <img
                  src="@/assets/images/icon_video.svg"
                  alt="icon_pdf"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Video
                </p>
              </a>
              <a class="mx-2" :href="model.youtube_360" target="_blank">
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
              <a
                v-if="model.floorPlan"
                class="mx-2"
                @click.prevent="floorplanModal"
              >
                <img
                  src="@/assets/images/icon_floorplans.svg"
                  alt="icon_edit"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Foorplan
                </p>
              </a>
              <a class="mx-2" @click.prevent="shareModal">
                <img
                  src="@/assets/images/icon_floorplans.svg"
                  alt="icon_edit"
                  class="image is-32x32 m-auto"
                />
                <p class="subtitle is-7 has-text-white mt-3 has-text-centered">
                  Share
                </p>
              </a>
            </div>
          </div>
          <div class="is-flex is-justify-content-center">
            <b-button
              type="is-primary"
              size="is-small"
              rounded
              @click.prevent="styleVisualizerModal"
              >STYLE VISUALIZER</b-button
            >
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
import ViewIn360Modal from '@/components/ViewIn360Modal.vue'
import CustomizeHomeModal from '@/components/CustomizeHomeModal.vue'
import StyleVisualizer from '@/components/StyleVisualizer.vue'

export default {
  components: {
    Hooper,
    Slide,
    VideoModal,
    DetailsModal,
    FloorplanModal,
    ViewIn360Modal,
    CustomizeHomeModal,
    StyleVisualizer,
  },
  // auth: 'guest',
  data() {
    return {
      isVideoModalActive: false,
      isDetailsModalActive: false,
      isFloorplanModalActive: false,
      isViewIn360ModalActive: false,
      isCustomizeHomeModalActive: false,
      isStyleVisualizerActive: false,
      isShareModalActive: false,
      hooperSettings: {
        vertical: true,
        centerMode: true,
        infiniteScroll: true,
      },
      loading: true,
      youtubeId: '',
      model: {},
      images: {},
      imagesDesktop: {},
      imagesDesktopAlternative: {},
      imagesMobile: {},
      imagesMobileAlternative: {},
    }
  },
  computed: {
    imagesDesktopAndAlternative() {
      return this.imagesDesktop.map((imageDesktop, i) => {
        return {
          imageDesktop,
          imageAlternative: this.imagesDesktopAlternative[i],
        }
      })
    },
    imagesMobileAndAlternative() {
      return this.imagesMobile.map((imageMobile, i) => {
        return {
          imageMobile,
          imageMobileAlternative: this.imagesMobileAlternative[i],
        }
      })
    },
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
          this.images = this.model.gallery
          this.imagesDesktop = this.images.gallery
          this.imagesDesktopAlternative = this.images.gallery_alternative
          this.imagesMobile = this.images.gallery_mobile
          this.imagesMobileAlternative = this.images.gallery_alternative_mobile
          this.loading = false
          this.youtubeId = this.model.video_url.substring(17)
          // eslint-disable-next-line no-console
          console.log(this.model, this.imagesDesktop)
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
    view360Modal() {
      this.isViewIn360ModalActive = true
    },
    customizeModal() {
      this.isCustomizeHomeModalActive = true
    },
    styleVisualizerModal() {
      this.isStyleVisualizerActive = true
    },
    browseAllOptions() {
      this.isCustomizeHomeModalActive = true
      this.isStyleVisualizerActive = false
    },
    shareModal() {
      this.isShareModalActive = true
    },
    trashCancel() {
      this.isVideoModalActive = false
      this.isDetailsModalActive = false
      this.isFloorplanModalActive = false
      this.isViewIn360ModalActive = false
      this.isCustomizeHomeModalActive = false
      this.isShareModalActive = false
      this.isStyleVisualizerActive = false
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
  position: absolute;
  top: 5rem;
  z-index: 25;
}
.bottom-content {
  position: absolute;
  bottom: 0%;
  left: 0;
  right: 0;
  height: 18vh;
  background: rgba(0, 0, 0, 0.8);
}
.content-bottom-desktop {
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  width: 60%;
  margin: auto;
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
  height: 90%;
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
