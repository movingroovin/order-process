const vueInstance = Vue.createApp({
  data() {
    return {
      orderStep: {
        isStep0: true,
        isStep1: false,
        isStep2: false,
        isStep3: false,
        isStep4: false,
        isStep5: false,
        isStep6: false,
        isStep7: false,
      },
    }
  },
  created() {},
  methods: {
    ToStep(toStep) {
      for (const key in this.orderStep) {
        this.orderStep[key] = false;
      }
      this.orderStep[`isStep${toStep}`] = true;
    },
  },

});
const app = vueInstance.mount("#app");