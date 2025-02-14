<template lang="pug">
.foundedProviders(@keydown.esc='hide')
  .foundedProviders__overlay.visible(@click.self='hide')
    .foundedProviders__box
      .congrats
        .title {{ $t('congratulations') }} 
        .subtitle {{ $t('availableProviders') }}
        .availableProviders(:style="providersStyle")
          div.card(v-for="available in availableProviders",)
            NuxtLink.availableProvider(:to='localePath(`/provider/${available.provider_id}/`)') 
              img.providerLogo(:src="`${available.provider_picture}`")
        .subtitle.bestOfAvailableText(v-if='bestOfAvailable && bestOfAvailable.length', @click.stop.prevent='$emit("showCallBackModal")') {{ $t('favorableTariff') }}
        VueGlide.slider(:options='options' v-if="bestOfAvailable?.length")
          VueGlideSlide(v-for="best in bestOfAvailable" :key="best.plan_id", )
            BetterofferCard(:router='best.router' :hot='best.is_hot' :discountPrice='best.discount_price' :image='best.provider_picture' :name='best.plan_name' :price='best.plan_price' :speed='best.plan_speed' :nSpeed='best.night' :tech='best.tech' :message='best.plan_id')
          template(slot='control')
            button.glide__arrow.glide__arrow--left(data-glide-dir='<') 
              MaterialIcon(:icon='mdiChevronLeft' )
            button.glide__arrow.glide__arrow--right(data-glide-dir='>') 
              MaterialIcon(:icon='mdiChevronRight')
        .bestOfAvailableMobile 
          div(v-for="best in bestOfAvailable" :key="best.plan_id", )
            BetterofferCard(:router='best.router' :hot='best.is_hot' :image='best.provider_picture' :name='best.plan_name' :price='best.plan_price' :speed='best.plan_speed' :nSpeed='best.night' :tech='best.tech' :message='best.plan_id', )
</template>
<script>
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
export default {
  props: {
    availableProviders: {
      type: Array,
      default: undefined,
    },
    bestOfAvailable: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      mdiChevronRight,
      mdiChevronLeft,
      options: {
        perView: 1,
        keyboard: false,
        bound: true,
        breakpoints: {},
      },
    };
  },
  computed: {
    providersStyle() {
      if (window.innerWidth > 768 && this.availableProviders.length <= 2) {
        return { display: "flex", justifyContent: "center" };
      }
      if (this.availableProviders.length <= 2) {
        return { display: "flex", justifyContent: "center" };
      } else {
        return { display: "flex" };
      }
    },
  },
  methods: {
    hide() {
      this.$emit("hide");
    },
  },
};
</script>
<style lang="scss" scoped>
.foundedProviders {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    padding: 1rem;
    color: #2e363e;

    &.visible {
      opacity: 0.999;
      pointer-events: unset;
    }
  }

  &__box {
    max-width: 600px;
    width: 100%;
    background: #f0f8ff;
    border-radius: 30px;
    outline: 5px solid #1bb8d1;
    text-align: center;
  }
  .congrats {
    padding: 1.625rem;
    @media only screen and (max-width: 576px) {
      padding: 5px;
    }
    .title {
      font-size: 2rem;
      font-weight: 600;
      @media only screen and (max-width: 576px) {
        font-size: 1.5rem;
      }
    }
    .subtitle {
      font-size: 0.875rem;
      padding-top: 5px;

      @media only screen and (max-width: 576px) {
        padding-top: 7px;
      }
    }
    .bestOfAvailableText {
      margin: 0 auto;
      color: #fff;
      padding: 10px 10px;
      border-radius: 15px;
      background-color: #1bb8d1;
      width: fit-content;
      margin-top: 30px;
      margin-bottom: -20px;
      cursor: pointer;
      @media only screen and (max-width: 576px) {
        margin-bottom: unset;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 12px;
      }
    }
    .availableProviders {
      width: 100%;
      display: flex;
      padding-top: 15px;
      overflow: auto;
      gap: 10px;
      @media only screen and (max-width: 576px) {
        padding-bottom: 10px;
      }
      .card {
        width: auto;
      }
      .availableProvider {
        max-width: 125px;
        height: 110px;
        border-radius: 30px;
        background-color: white;
        padding: 10px;
        display: inline-block;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        @media only screen and (max-width: 576px) {
          margin-right: 5;
          margin-left: 5px;
          max-width: 110px;
          height: 90px;
        }

        .providerLogo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          height: 70px;
          width: 90px;
        }
      }
    }
    .slider {
      @media only screen and (max-width: 576px) {
        display: none;
      }
    }
    .bestOfAvailableMobile {
      display: none;
      overflow: auto;
      margin-left: 15px;
      justify-content: flex-start;
      gap: 25px;
      width: auto;
      @media only screen and (max-width: 576px) {
        display: flex;
      }
    }
  }
}
//

.glide__arrow--left,
.glide__arrow--right {
  position: absolute;
  border: 0;
  outline: 0;
  padding: 10px;
  border-radius: 50%;
  background: #56c1ff;
  opacity: 0.7;
  color: #fff;
  cursor: pointer;
  transition: opacity, 0.3s;
  @media only screen and (max-width: 431px) {
    padding: 0;
    opacity: unset;
    .MaterialIcon {
      width: 3rem;
      height: 3rem;
      z-index: 1000;
    }
  }
}
.glide__arrow--left {
  left: 5px;
  top: 50%;
  width: 55px;
  &:hover {
    opacity: 1;
  }
}
.glide__arrow--right {
  right: 5px;
  top: 50%;
  width: 55px;

  &:hover {
    opacity: 1;
  }
}
:deep(.glide__slides) {
  display: flex !important;
  justify-content: space-around !important;
  // margin-bottom: 0;
}
.glide__slide {
  padding-top: 45px;
  width: 550px !important;
  margin-left: 100px;
}
</style>
