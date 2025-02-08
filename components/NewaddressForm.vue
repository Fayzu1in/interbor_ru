<template lang="pug">
div
  form.addressForm(action="" method="post", @submit.prevent="formSubmit")
    .addressForm__district
      label.inputWrapper(for='city')
        input.addressForm__field(type='text' :placeholder=`$t('city')` required v-model="inputCity" @input="showCities = inputCity.length > 0" @click="toggleShowCities" )
        ul.suggestionList(v-if="showCities" )
          li.suggestionItem(v-for="city in filteredCities", :key="city.id", @click="selectCity(city.name)") {{ city.name }}
    .addressForm__district
      label.inputWrapper(for='district')
        input.addressForm__field(type='text' :placeholder=`$t('district')` required v-model="inputDistrict" @input="showDistrict = inputDistrict.length > 0" @click='toggleShowDistrict' :disabled="isSecondDisabled" )
        ul.suggestionList(v-if="showDistrict && districts.length" )
          li.suggestionItem(v-for="district in filteredDistricts"  @click="selectDistrict(district.name)") {{ district.name }}
        ul.suggestionList(v-else-if='showDistrict')
          li.suggestionItem Загружаем
    .addressForm__street
      label.inputWrapper(for='street')
        input.addressForm__field(type='text' :placeholder=`$t('street')` required v-model="inputStreet" @input="showStreets = inputStreet.length > 0" @click="toggleShowStreets" :disabled="isThirdDisabled" )
        ul.suggestionList(v-if="showStreets && streets.length")
          li.suggestionItem(v-for="str in filteredStreets"  @click="selectStreet(str.name)") {{ str.name }}
        ul.suggestionList(v-else-if='showStreets')
          li.suggestionItem Загружаем
    .addressForm__house 
      label.inputWrapper(for='house')
        input.addressForm__field(type='text' :placeholder=`$t('house')` required v-model="inputHouse" @click='toggleShowHouses' :disabled="isForthDisabled", style="border-right: none; border-bottom: unset")
        ul.suggestionList(v-if="showHouses && houses.length")
          li.suggestionItem(v-for="house in filteredHouses" @click="selectHouse(house)" ) {{ house }}
        ul.suggestionList(v-else-if='showHouses')
          li.suggestionItem Загружаем
    button.addressForm__search 
      | {{ $t('search') }}
      MaterialIcon(v-if="isLoading", :icon="mdiLoading", size="16px", color="#fff", class="loading-icon")
  FoundedProviders(:availableProviders='availableProviders', :bestOfAvailable='bestOfAvailable', v-if='showFoundedProviders', @hide='showFoundedProviders = false', @showCallBackModal='$emit("showCallBackModal")')

</template>
<script>
import axios from "axios";
import { mdiLoading } from "@mdi/js";
export default {
  data() {
    return {
      showDistrict: false,
      showCities: false,
      showStreets: false,
      showHouses: false,
      houses: [],
      streets: [],
      inputCity: "",
      inputDistrict: "",
      inputStreet: "",
      inputHouse: "",
      showFoundedProviders: false,
      mdiLoading,
      isLoading: false,
      districts: [],
    };
  },
  async fetch() {
    this.cities = await this.$axios.$get("https://internetbor.ru/api/cities/");
  },
  computed: {
    isSecondDisabled() {
      return !this.inputCity;
    },
    isThirdDisabled() {
      return !this.inputDistrict;
    },
    isForthDisabled() {
      return !this.inputStreet;
    },
    filteredCities() {
      return this.cities.filter((city) =>
        city.name.toLowerCase().includes(this.inputCity.toLowerCase())
      );
    },
    filteredDistricts() {
      return this.districts.filter((district) =>
        district.name.toLowerCase().includes(this.inputDistrict.toLowerCase())
      );
    },
    filteredStreets() {
      return this.streets.filter((street) =>
        street.name.toLowerCase().includes(this.inputStreet.toLowerCase())
      );
    },
    filteredHouses() {
      return this.houses.filter((house) =>
        house.toLowerCase().includes(this.inputHouse.toLowerCase())
      );
    },
  },
  methods: {
    toggleShowCities() {
      this.showCities = !this.showCities;
      this.showDistrict = false;
      this.showStreets = false;
    },
    selectCity(word) {
      this.inputCity = word;
      this.inputDistrict = "";
      this.inputStreet = "";
      this.inputHouse = "";
      this.showCities = false;
    },
    toggleShowDistrict() {
      this.showDistrict = !this.showDistrict;
      this.showCities = false;
      this.showStreets = false;
      this.showHouses = false;
      axios
        .get(`https://internetbor.ru/api/districts/?city=${this.inputCity}`)
        .then((response) => {
          this.districts = response.data;
        });
    },
    selectDistrict(word) {
      this.inputStreet = "";
      this.inputHouse = "";
      this.inputDistrict = word;
      this.SuggestionList = false;
      this.showDistrict = false;
    },
    toggleShowStreets() {
      this.showStreets = !this.showStreets;
      this.showCities = false;
      this.showHouses = false;
      this.showDistrict = false;
      axios
        .get(
          `https://internetbor.ru/api/streets/?city=${this.inputCity}&district=${this.inputDistrict}`
        )
        .then((response) => {
          this.streets = response.data;
        });
    },
    selectStreet(word) {
      this.inputStreet = word;
      this.showStreets = false;
    },
    toggleShowHouses() {
      this.showHouses = !this.showHouses;
      this.showStreets = false;
      this.showDistrict = false;
      this.showCities = false;
      axios
        .get(
          `https://internetbor.ru/api/houses/?city=${this.inputCity}&district=${this.inputDistrict}&street=${this.inputStreet}`
        )
        .then((response) => {
          this.houses = response.data;
        });
    },
    selectHouse(word) {
      this.inputHouse = word;
      this.showHouses = false;
    },

    formSubmit() {
      this.isLoading = true;
      sessionStorage.setItem(
        "addressFormData",
        JSON.stringify({
          city: this.inputCity,
          district: this.inputDistrict,
          street: this.inputStreet,
          house: this.inputHouse,
        })
      );
      sessionStorage.setItem("cameFromForm", "true");
      axios
        .get(
          `https://internetbor.ru/api/providers/?city=${this.inputCity}&district=${this.inputDistrict}&street=${this.inputStreet}&house=${this.inputHouse}`
        )
        .then((response) => {
          this.response = response.data;
          this.inputCity = "";
          this.inputDistrict = "";
          this.inputStreet = "";
          this.inputHouse = "";
          if (this.response.providers !== null) {
            this.availableProviders = this.response.providers;
            console.log("availableProviders", this.availableProviders);

            this.showHouses = false;
            this.showCities = false;
            this.showDistrict = false;
            this.showStreets = false;
            let result = [];
            for (const obj of this.availableProviders) {
              result = result.concat(obj.provider_best);
              this.bestOfAvailable = result;
            }
            this.showFoundedProviders = true;
          }

          if (this.response.providers === null) {
            this.notFounded = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style lang="scss">
input:focus {
  outline: none;
}
.addressForm {
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 32px;
  overflow: hidden;
  padding: 5px 14px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  overflow: visible;
  @media only screen and (max-width: 576px) {
    flex-direction: column;
    padding: 0;
    overflow: auto;
  }
  label {
    margin-bottom: 0;
  }
  &__field {
    font-family: "Montserrat", sans-serif;
    padding: 30px 10px;
    border: none;
    text-align: center;
    padding-bottom: 25px;
    border-right: 1px solid #3f62a7;
    font-size: 1.125rem;
    background-color: transparent !important;
    @media only screen and (max-width: 576px) {
      border-bottom: 1px solid #3f62a7;
      border-right: unset;
    }
  }
  &__search {
    font-family: "Montserrat", sans-serif;
    border: none;
    font-weight: 600;
    background-color: #3f62a7;
    border-radius: 999px;
    font-size: 1.25rem;
    color: #fff;
    padding: 20px 25px;
    cursor: pointer;
  }
  .inputWrapper {
    position: relative;
    .suggestionList {
      z-index: 1000;
      list-style: none;
      background-color: #fff;
      position: absolute;
      width: fit-content;
      top: 40px;
      padding: 10px 20px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      width: 100%;
      overflow: auto;
      max-height: 270px;
      .suggestionItem {
        font-size: 1rem;
        color: #3f62a7;
        font-weight: 200;
        padding-bottom: 10px;
        font-weight: 600;
        @media only screen and (max-width: 576px) {
          padding-bottom: 20px;
        }

        text-align: left;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.loading-icon {
  animation: spin 1s linear infinite;
  margin-left: 10px; /* Space between icon and text */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
