<template lang="pug">
#app
  NewNavbar
  transition(name='category-tabs', appear)
    Nuxt.wrapper
  TheFooter
</template>
<script>
export default {
  head() {
    return {
      title: this.$t("browserTitle"),
    };
  },
  methods: {
    async redirectToTelegram() {
      try {
        await this.$api.clickCatcher("telegram");
      } catch (error) {
        this.$error("Error occured", error);
      } finally {
        window.open("https://telegram.me/InternetBor", "_blank");
      }
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}
a {
  text-decoration: none;
}
html {
  font-family: "Poppins", sans-serif;

  color: #fff;
  ::-webkit-scrollbar {
    width: 7px;
    height: 10px;
    border-radius: 30px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #9bd6e1c7;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-thumb {
    background: #119fb5;
    border-radius: 30px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #1bb8d1;
  }
}
body {
  background: linear-gradient(to bottom, #9bd7e1 0%, #1bb8d1 100%);
}

.container-fluid {
  display: flex;
  justify-content: center;
  max-width: 1280px;
  width: 100%;
  padding-left: 100px;
  padding-right: 100px;
  margin: 0 auto;
  @media only screen and (max-width: 431px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}
.wrapper {
  min-height: 88vh;
}
.telegramGif {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  height: 60px;
  background: none;
  cursor: pointer;
}
.page-enter-active,
.page-leave-active,
.category-tabs-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.category-tabs-enter-active {
  transition: opacity 0.5s, transform 0.5s;
  transition-delay: 0.5s;
}

.page-leave-to,
.category-tabs-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.page-enter,
.category-tabs-enter {
  opacity: 0;
  transform: translateY(2rem);
}

.page-enter-to,
.category-tabs-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
