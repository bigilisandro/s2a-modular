<template>
  <div v-if="loading"></div>
  <div v-else class="no-scroll">
    <video-modal
      :video-url="youtubeId"
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
    <div class="sidebar-page is-hidden-touch is-hidden-desktop-only">
      <section class="sidebar-layout">
        <b-sidebar
          :expand-on-hover="true"
          :reduce="true"
          type="is-black"
          open
          fullheight
          style="overflow: hidden"
        >
          <div class="is-flex" style="overflow: auto">
            <div style="width: 95%">
              <hooper
                :vertical="true"
                style="height: 100%; width: 100%"
                infinite-scroll
                :items-to-show="7"
              >
                <slide
                  v-for="(image, index) in imagesDesktop"
                  :key="image.length"
                >
                  <div
                    :style="{
                      'background-image': 'url(' + image.url + ')',
                    }"
                    class="bgImage m-3"
                    @click.prevent="goToSlide(index)"
                  ></div>
                </slide>
              </hooper>
            </div>
            <!-- <div class="is-flex is-align-items-center">
              <img
                src="@/assets/images/button_close.svg"
                alt="icon_share"
                class="image is-32x32"
                style="transform: rotate(-90deg)"
              />
            </div> -->
          </div>
        </b-sidebar>

        <hooper
          ref="carousel"
          style="height: 100vh; width: 100%"
          :settings="hooperSettings"
        >
          <slide v-for="image in imagesDesktop" :key="image.length">
            <div
              :style="{
                'background-image': 'url(' + image.url + ')',
              }"
              class="bgImage container is-fluid margin-nav mt-3"
              style="background-size: 100% 100%"
            >
              <div class="columns content-bottom is-mobile">
                <div class="column is-2">
                  <!-- <p class="subtitle is-6 has-text-white">
                    Living Room 300 sq. ft.
                  </p> -->
                </div>
                <div class="column columns mb-0"></div>
              </div>
            </div>
          </slide>
        </hooper>
        <div class="content-bottom-desktop">
          <div class="column columns mb-0">
            <div class="column">
              <h1 class="title is-2 has-text-white has-text-centered">
                {{ model.model_name.toUpperCase() }}
              </h1>
              <h4
                class="subtitle is-6 has-text-white text-max has-text-centered"
              >
                {{ model.short_description.toUpperCase() }}
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
            <div class="column border-left">
              <div class="columns is-gapless">
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
                    View 360
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
                    Floorplan
                  </p>
                </a>
                <a class="column" @click.prevent="shareModal">
                  <img
                    src="@/assets/images/share.svg"
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
    <div class="is-hidden-widescreen">
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
        <slide v-for="image in imagesMobile" :key="image.length">
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
                <!-- <p class="subtitle is-7 has-text-white">
                  Living Room 300 sq. ft.
                </p> -->
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
              </div>
            </div>
          </div>
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
                  Floorplan
                </p>
              </a>
              <a class="mx-2" @click.prevent="shareModal">
                <img
                  src="@/assets/images/share.svg"
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
      imagesMobile: {},
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
          console.log(this.model, 'model')
          this.images = this.model.gallery
          this.imagesDesktop = this.images.gallery
          this.imagesMobile = this.images.gallery_mobile
          this.loading = false
          this.youtubeId = this.model.video_url
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
      this.isStyleVisualizerActive = false
      this.isViewIn360ModalActive = true
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
  -webkit-line-clamp: 2;
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
  left: 0;
  right: 0;
}
.bottom-content {
  position: absolute;
  bottom: 0%;
  left: 0;
  right: 0;
  height: 21vh;
  background: rgba(0, 0, 0, 0.8);
}
.content-bottom-desktop {
  position: absolute;
  bottom: 0%;
  left: 0;
  right: 0;
  width: 95%;
  margin: auto;
}
.border-left {
  border-left: 1px solid white;
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
@media screen and (min-width: 1200px) {
  .content-bottom-desktop {
    width: 65%;
  }
}
@media screen and (max-width: 1023px) {
  .content-bottom-desktop {
    width: 90%;
  }
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
