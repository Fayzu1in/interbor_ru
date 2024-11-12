<template lang="pug">
  section.Providers
    .provider 
      template(v-for='provider in groups')
        .provider__title {{ provider.provider_name }}
        .slides(v-if='provider.plans?.length',)
          div(v-for='link in provider.plans' :key='link.id')
            NuxtLink.providerLink(:to='localePath(`/request/${link.id}` )')
              BetterofferCard(:router='link.router' :hot='link.is_hot' :image='link.provider_picture' :name='link.title' :tech='link.tech' :nSpeed='link.night' :speed='link.speed' :price='link.price' :message='link.id')
        //- VueGlide.desktopSlide(v-if="provider.plans?.length" :options='options')
        //-   VueGlideSlide(v-for='link in provider.plans' :key='link.id')
        //-     NuxtLink.providerLink(:to='localePath(`/request/${link.id}` )')
        //-       BetterofferCard(:router='link.router' :hot='link.is_hot' :image='link.provider_picture' :name='link.title' :tech='link.tech' :nSpeed='link.night' :speed='link.speed' :price='link.price' :message='link.id')
        //-   template(slot='control' )
        //-     button.glide__arrow.glide__arrow--left(data-glide-dir='<') 
        //-       MaterialIcon(:icon='mdiChevronLeft' )
        //-     button.glide__arrow.glide__arrow--right(data-glide-dir='>') 
        //-       MaterialIcon(:icon='mdiChevronRight')
        //- .mobileSlide
        //-   div(v-for='link in provider.plans' :key='link.id')
        //-     NuxtLink.providerLink(:to='localePath(`/request/${link.id}` )')
        //-       BetterofferCard(:router='link.router' :hot='link.is_hot' :image='link.provider_picture' :name='link.title' :tech='link.tech' :nSpeed='link.night' :speed='link.speed' :price='link.price' :message='link.id')
  </template>
<script>
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
export default {
  data() {
    return {
      mdiChevronRight,
      mdiChevronLeft,
      plans: [],
    };
  },
  async fetch() {
    try {
      const res = await this.$api.getPlans();
      this.plans = res;
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  },
  computed: {
    groups() {
      return this.plans.reduce((acc, cur) => {
        const provider = acc.find((c) => c.provider_id === cur.provider_id);

        if (provider) {
          provider.plans.push(cur);
        } else {
          acc.push({
            provider_id: cur.provider_id,
            provider_name: cur.provider_name,
            plans: [cur],
          });
        }

        return acc;
      }, []);
    },
  },
};
</script>
<style lang="scss" scoped>
.Providers {
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  padding-top: 120px;
  @media only screen and (max-width: 431px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 60px;
  }

  .provider {
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
        margin-top: 0;
        margin-bottom: 15px;
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

      @media only screen and (max-width: 431px) {
        font-size: 24px;
        padding-bottom: 0px;
        margin: 0;
        padding-top: 0;
      }
    }
    .slides {
      padding-top: 20px;
      display: flex;
      gap: 26px;
      overflow: auto;
    }
    .providerLink {
      text-decoration: none;
      display: flex;
      width: fit-content;
    }
  }
}
.desktopSlide {
  @media only screen and (max-width: 531px) {
    display: none;
  }
}
</style>
