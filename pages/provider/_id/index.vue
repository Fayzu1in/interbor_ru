<template lang="pug">
section.container-fluid.tariffWrapperr
  .tariff
    .tariff__title {{ providerName }}
    VueGlide.desktopSlide(v-if="data && data.length" :options='options')
      VueGlideSlide(v-for='tariff in data' :key='tariff.id' )
        NuxtLink.tariffLink(:to='localePath(`/request/${tariff.id}` )')
          BetterofferCard.card(:router='tariff.router' :hot='tariff.is_hot' :image='tariff.provider_picture' :name='tariff.title' :tech='tariff.tech' :price='tariff.price' :discountPrice='tariff.discount_price' :message='tariff.id')
    .mobileSlide(v-if="data && data.length" :options='options')
      div(v-for='tariff in data' :key='tariff.id' )
        NuxtLink.tariffLink(:to='localePath(`/request/${tariff.id}` )')
          BetterofferCard.card(:router='tariff.router' :hot='tariff.is_hot' :image='tariff.provider_picture' :name='tariff.title' :nSpeed='tariff.night' :tech='tariff.tech' :speed='tariff.speed' :price='tariff.price' :discountPrice='tariff.discount_price' :message='tariff.id')
      
</template>
<script>
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

export default {
  data() {
    return {
      providerID: this.$route.params.id,
      providerName: this.topProviders,
      data: null,
      mdiChevronRight,
      mdiChevronLeft,
    };
  },

  async fetch() {
    this.data = await this.$api.getPlans({ provider: this.providerID });
    this.providerName = this.data[0].provider_name;
  },
};
</script>
<style lang="scss" scoped>
* {
  width: auto;
}
.tariffWrapperr {
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 531px) {
    padding-top: 30px;
  }
}
.tariff {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 120px;
  @media only screen and (max-width: 531px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .providersText {
    width: fit-content;
    font-size: 11px;
    color: #2e363e;
    padding: 10px 18px;
    background-color: #fff;
    border-radius: 5px;
    margin-left: 30px;
    margin-top: 50px;
    @media only screen and (max-width: 531px) {
      margin-left: 0;
    }
  }
  &__title {
    font-size: 32px;
    margin-left: 30px;
    margin-bottom: -20px;
    padding-top: 0;
    text-align: left;
    font-weight: bold;
    padding-top: 25px;
    padding-bottom: 20px;
    @media only screen and (max-width: 531px) {
      margin-left: 0;
      padding-bottom: 15px;
      padding-top: 10px;
    }
  }
  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media only screen and (max-width: 431px) {
      justify-content: center;
    }
    .card {
      margin-right: 10px;
      margin-left: 10px;
      margin-top: 10px;
    }
  }
  .tariffLink {
    text-decoration: none;
  }
}
.desktopSlide {
  @media only screen and (max-width: 531px) {
    display: none;
  }
}
.mobileSlide {
  display: none;
  @media only screen and (max-width: 531px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.glide__slide {
  width: 350px !important;
  padding-top: 20px;
}
:deep(.glide__slides) {
  display: flex !important;
  width: 1070px !important;
  overflow: auto !important;
  justify-content: space-around !important;
}
</style>
