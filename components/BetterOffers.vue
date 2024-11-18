<template lang="pug">
section.betterOffers(:style="betterOffersStyle")
  .offerCards(v-for='offer in bestOffers' :key="bestOffers.plan_id")
    NuxtLink.betterOffers__card-link(:to='localePath(`/request/${offer.plan_id}` )')
      BetterofferCard.offerCard(:router='offer.router' :hot='offer.is_hot' :image='offer.provider_picture', :name='offer.title', :speed='offer.speed', :nSpeed='offer.night' :tech='offer.tech' :price='offer.price' :message='offer.plan_id')
</template>
<script>
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
export default {
  data() {
    return {
      bestOffers: [],
      offers: [],
      first: "",
      second: "",
      third: "",
      mdiChevronRight,
      mdiChevronLeft,
    };
  },
  async fetch() {
    this.offers = await this.$api.getOffers();
    this.bestOffers = this.offers[0].plans;
  },
  computed: {
    betterOffersStyle() {
      if (window.innerWidth > 768 && this.bestOffers.length <= 3) {
        return { display: "flex", justifyContent: "center" };
      } else {
        return { display: "flex" };
      }
    },
  },
};
</script>
<style lang="scss">
.betterOffers {
  display: flex;
  text-decoration: none;
  overflow: auto;
  margin-top: 15px;
  gap: 26px;
  .offerCards {
    width: auto;
    display: flex;
  }
}
</style>
