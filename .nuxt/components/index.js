export { default as AboutCompany } from '../../components/AboutCompany.vue'
export { default as AboutSection } from '../../components/AboutSection.vue'
export { default as ActionButton } from '../../components/ActionButton.vue'
export { default as ActivityIndicator } from '../../components/ActivityIndicator.vue'
export { default as AddressForm } from '../../components/AddressForm.vue'
export { default as AddressSection } from '../../components/AddressSection.vue'
export { default as AnswersandQuestions } from '../../components/AnswersandQuestions.vue'
export { default as BetterOffers } from '../../components/BetterOffers.vue'
export { default as BetterofferCard } from '../../components/BetterofferCard.vue'
export { default as BetteroffersSection } from '../../components/BetteroffersSection.vue'
export { default as CallBack } from '../../components/CallBack.vue'
export { default as ChooseCard } from '../../components/ChooseCard.vue'
export { default as FoundedProviders } from '../../components/FoundedProviders.vue'
export { default as HeroBackground } from '../../components/HeroBackground.vue'
export { default as LocationPicker } from '../../components/LocationPicker.vue'
export { default as MaterialIcon } from '../../components/MaterialIcon.vue'
export { default as ModalDialog } from '../../components/ModalDialog.vue'
export { default as ModalWindow } from '../../components/ModalWindow.vue'
export { default as NeedHelp } from '../../components/NeedHelp.vue'
export { default as NewNavbar } from '../../components/NewNavbar.vue'
export { default as NewaddressForm } from '../../components/NewaddressForm.vue'
export { default as ProviderCard } from '../../components/ProviderCard.vue'
export { default as QuestionsSection } from '../../components/QuestionsSection.vue'
export { default as ScrollTop } from '../../components/ScrollTop.vue'
export { default as SmoothReflow } from '../../components/SmoothReflow.vue'
export { default as SplideSlide } from '../../components/SplideSlide.vue'
export { default as TariffCard } from '../../components/TariffCard.vue'
export { default as TheFooter } from '../../components/TheFooter.vue'
export { default as TheNavbar } from '../../components/TheNavbar.vue'
export { default as TopProviders } from '../../components/TopProviders.vue'
export { default as TopprovidersSection } from '../../components/TopprovidersSection.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
