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
      orderDetail: {
        caseX: null, // 機殼X
        caseY: null, // 機殼Y
        windowX: null, // 窗戶X
        windowY: null, // 窗戶Y
        windowXc: null, // 側邊長Xc
        antennaX: null, // 天線X
        antennaY: null, // 天線Y
        selectedCaseMaterial: { label: '金屬', value: '金屬' },
        selectedWindowMaterial: { label: '塑膠', value: '塑膠' }, 
      },
      caseMaterialList: [
        { label: '金屬', value: '金屬' }, 
        { label: '塑膠', value: '塑膠' }, 
      ],
      windowMaterialList: [
        { label: '塑膠', value: '塑膠' }, 
      ]
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