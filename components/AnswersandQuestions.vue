<template lang="pug">
section
  .faqSection
    .faq 
      .faq__list(v-for='item in faq' :key='item.id')
        .question(@click="toggleDropdown(item.id)")
          p {{ item.question }}
          img.arrow(:src='show === item.id ? "/arrow-up.png" : "/arrow-down.png"')
        SmoothReflow(tag='section',)
          .answer(v-show='show === item.id', key="dropdown")
            p {{item.answer}}
</template>
<script>
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
export default {
  data() {
    return {
      mdiChevronDown,
      mdiChevronUp,
      show: false,
      faq: null,
    };
  },
  async fetch() {
    this.faq = await this.$api.getQuestionsAndAnswers();
  },
  methods: {
    toggleDropdown(itemId) {
      this.show = this.show === itemId ? null : itemId;
    },
  },
};
</script>
<style lang="scss">
.faqSection {
  display: flex;
  justify-content: center;
  padding: 23px 0;
  font-family: "Raleway", sans-serif;
  max-width: 1080px;
  width: 100%;
  .faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 30px;
    color: #001b48;
    padding: 11px 0;
    &__title {
      font-size: 32px;
    }
    &__list:not(:last-child) {
      border-bottom: 1px solid #3f62a7;
    }
    &__list {
      width: 100%;
      font-size: 24px;
      cursor: pointer;
      .question {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-weight: 500;
        font-size: 1.25rem;
        text-align: center;
        padding: 14px 0;
        .arrow {
          height: 25px;
          width: 31px;
          margin-right: 46px;
        }
        p {
          margin: 0;
          margin-left: 46px;
        }
      }
      .answer {
        p {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          margin: 0;
          padding: 31px 138px 37px 138px;
          text-align: center;
          @media only screen and (max-width: 900px) {
            padding: 15px 10px;
          }
        }
      }
    }
  }
}
</style>
