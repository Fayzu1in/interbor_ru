<template lang="pug">
.container-fluid
  .TopProviders
    .TopProviders__top
      .TopProviders__top-left
        .connect {{ $t('providers') }}
        .title  {{ $t('topProviders') }}
        .subtitle {{ $t('bestProvidersUzbekistan') }}
      .TopProviders__top-right
        img(src='/router.gif')
    .TopProviders__bottom(:style="TopProvidersStyle")
      .providerCard(v-for="provider in topProviders" :key='provider.provider_id')
        NuxtLink.topProviders__card(:to='localePath(`/provider/${provider.provider_id}` )', :message='topProviders')
          img.topProviders__card-img(:src='provider.provider_picture')
</template>
<script>
export default {
  data() {
    return {
      topProviders: [],
    };
  },
  async fetch() {
    this.topProviders = await this.$api.getTopProviers();
  },
  computed: {
    TopProvidersStyle() {
      if (window.innerWidth > 768 && this.topProviders.length <= 4) {
        return { display: "flex", justifyContent: "center" };
      } else {
        return { display: "flex" };
      }
    },
  },
};
</script>
<style lang="scss">
.TopProviders {
  padding-bottom: 45px;
  padding-top: 48px;
  &__top {
    display: flex;
    padding-top: 65px;
    align-items: center;
    padding-bottom: 93px;
    @media only screen and (max-width: 576px) {
      flex-direction: column;
      padding-top: 0;
      padding-bottom: 20px;
    }

    &-left {
      color: #fff;
      .connect {
        width: fit-content;
        font-size: 11px;
        color: #2e363e;
        padding: 10px 18px;
        background-color: #fff;
        border-radius: 5px;
        font-family: "Montserrat", sans-serif;
      }
      .title {
        font-size: 2.75rem;
        padding-top: 24px;
        font-weight: bold;
        line-height: 60px;
        padding-bottom: 14px;
        font-family: "Raleway", sans-serif;
        @media only screen and (max-width: 576px) {
          font-size: 2rem;
          line-height: 35px;
        }
      }
      .subtitle {
        font-size: 20px;
        font-weight: 400;
        font-family: "Montserrat", sans-serif;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      @media only screen and (max-width: 576px) {
        display: none;
      }
      img {
        height: 174px;
        width: 165px;
      }
    }
  }
  &__bottom {
    display: flex;
    gap: 30px;
    @media only screen and (max-width: 576px) {
      overflow-x: auto;
      overflow-y: hidden;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .providerCard {
      border-radius: 13px;
      max-width: 146px;
      width: 100%;
      @media only screen and (max-width: 576px) {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
        margin-right: 70px;
      }

      .topProviders {
        display: flex;
        justify-content: center;
        align-items: center;
        // padding-bottom: 30px;
        // transition: all 0.6s;
        @media only screen and (max-width: 431px) {
          flex-direction: column;
          padding-bottom: 0;
        }
        .topCard {
          width: 250px;
          height: 125px;
          margin-left: 10px;
          margin-right: 10px;
          @media only screen and (max-width: 431px) {
            display: flex;
            justify-content: center;

            margin: 0 0;
            height: unset;
          }
        }
        &__card {
          &-img {
            background-color: #ffffff;
            height: 100%;
            width: 100%;
            object-fit: contain;
            padding: 10px;

            border-radius: 15px;
            // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            //   rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            // box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

            transition: transform 0.3s;
            @media only screen and (max-width: 431px) {
              margin-left: 0;
              padding: 20px;
              height: 200px;
              width: 200px;
              margin-bottom: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
