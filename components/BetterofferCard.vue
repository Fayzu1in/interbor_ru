<template lang="pug">
section.tariffCard
  .hotFlag(v-if='hot')
    img(src='/bestseller.png')
  .tariffCard__top 
    .topLeftLogo
      img.logo(:src='image')
    .topRight 
      p.name(:name='name') {{ this.name || $t('notIndicated') }}
      div.type 
        div.type__left
          p.typeSubtitle {{ $t('type') }} :
          p.typeTitle(:tech='tech') {{this.tech || $t('notIndicated')}}
        div.router(v-if="router")
          p.router__title {{ $t('router') }}
          img.router__image(src="/router-for-card.png")
  .tariffCard__middle
  .tariffCard__bottom
    .tariffCard__bottom-price 
      .priceCount
        .priceFlex
          p.priceBold(:class="{ 'crossed-out': discountPrice, }", :price='price') {{this.price || $t('notIndicated')}}
          p.discountPrice(:discountPrice='discountPrice' ) {{ this.discountPrice }}
        p.priceCountSubtitle {{ $t('priceMonth') }}
      img(src='/pricetag.png')
    NuxtLink.connectButton(:to='localePath(`/request/${this.message}` )', :message='message') {{ $t('connect') }} 
</template>
<script>
import {
  mdiSpeedometer,
  mdiCashMultiple,
  mdiFire,
  mdiRouterWireless,
} from "@mdi/js";
export default {
  props: {
    hot: {
      type: Boolean,
      default: false,
    },
    router: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Number,
      default: null,
    },

    image: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: null,
    },
    speed: {
      type: String,
      default: null,
    },
    bonus: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    discountPrice: {
      type: String,
      default: null,
    },
    nSpeed: {
      type: String,
      default: null,
    },
    tech: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      mdiSpeedometer,
      mdiCashMultiple,
      mdiFire,
      mdiRouterWireless,
      offers: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.tariffCard {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: space-between;
  background: #fff;
  padding: 19px;
  border-radius: 30px;
  color: #000000;
  width: 341px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 15px;
  position: relative;

  font-family: "Montserrat", sans-serif;
  @media only screen and (max-width: 431px) {
    margin-top: 20px;
    max-width: 300px;
    width: 100%;
  }
  .hotFlag {
    position: absolute;
    align-items: center;
    border-radius: 5px;
    top: -15px;
    right: 6px;
    color: #fff;
    width: auto;
    @media only screen and (max-width: 576px) {
      display: none;
    }
    img {
      height: 85px;
      width: fit-content;
    }
  }

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    .topLeftLogo {
      width: 230px;
      height: 60px;
      display: flex;
      justify-content: center;

      .logo {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    .topRight {
      // max-width: 50%;
      width: 100%;
      .type {
        // padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__left {
          padding: 10px 10px;
          border-radius: 15px;
          background-color: #f0f8ff;
          width: 48%;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .router {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0px;
          width: 48%;
          border-radius: 15px;
          background-color: #f0f8ff;
          text-align: center;
          height: 80px;
          // font-size: 14px;
          &__image {
            height: 30px;
            width: auto;
            margin-left: 5px;
          }
        }
      }
      p {
        margin: 0;
      }
      .name {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        text-align: center;
        padding: 10px 0;
        border-radius: 15px;
        background-color: #1bb8d1;
        color: #fff;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* Limit the text to 2 lines */
        overflow: hidden; /* Hide the overflowed text */
        text-overflow: ellipsis; /* Add ellipsis when the text overflows */
        justify-content: center;
        align-items: center;
        height: 62px;
      }
      .typeSubtitle {
        font-size: 18px;
        // padding-bottom: 10px;
      }
    }
  }
  &__middle {
    display: flex;
    justify-content: space-between;
    .speed {
      padding: 10px 5px;
      text-align: center;
      border-radius: 15px;
      background-color: #f0f8ff;
      height: 60px;
      width: 48%;
      margin-top: 10px;
    }
    .nightSpeed {
      padding: 10px 5px;
      border-radius: 15px;
      background-color: #f0f8ff;
      width: 48%;
      height: 60px;
      margin-top: 10px;
      text-align: center;
      &__title {
        font-size: 12px;
        margin: 0;
        color: rgb(193, 191, 191);
      }
      &__text {
        font-size: 18px;
        margin: 0;
        padding-top: 5px;
        @media only screen and (max-width: 431px) {
          font-size: 16px;
        }
      }
    }
    .tech {
      padding-right: 10px;
      &__title {
        font-size: 12px;
        margin: 0;
        color: rgb(193, 191, 191);
      }
      &__text {
        text-align: center;
        font-size: 18px;
        margin: 0;
        padding-top: 5px;
        @media only screen and (max-width: 431px) {
          font-size: 16px;
        }
      }
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-price {
      padding: 10px 10px;
      border-radius: 15px;
      background-color: #f0f8ff;
      width: 48%;
      height: 60px;
      margin-top: 10px;
      font-size: 18px;
      display: flex;
      justify-content: space-around;
      @media only screen and (max-width: 431px) {
        justify-content: space-between;
        font-size: 16px;
      }
      img {
        height: 30px;
        width: auto;
        @media only screen and (max-width: 431px) {
          display: none;
        }
      }
      .priceCount {
        .priceFlex {
          display: flex;
          justify-content: center;
          p {
            width: fit-content;
          }
          .crossed-out {
            text-decoration: line-through;
            color: gray;
            font-size: 14px;
            margin-left: -20px;
          }
        }
      }
      .priceBold {
        font-weight: 500;
      }

      .discountPrice {
        font-weight: bold;
        color: #000000;
        margin-left: 5px; // You can choose any bold color for better visibility
      }
      /* stylelint-disable-next-line no-descending-specificity */
      p {
        margin: 0;
      }
    }
    .priceCountSubtitle {
      font-size: 14px;
    }
    .connectButton {
      text-decoration: none;
      cursor: pointer;
      border: none;
      font-size: 18px;
      color: #fff;
      padding: 5px;
      border-radius: 18px;
      width: 48%;
      text-align: center;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1bb8d1;
      margin-top: 10px;
      @media only screen and (max-width: 431px) {
        font-size: 16px;
      }
    }
  }
}
</style>
