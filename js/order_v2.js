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
        antennaApps: [
          { name: '5G', amount: 0, selectedFreq: '800/900/1800/1900/2100/2600/3500/5500', freqList: ['800/900/1800/1900/2100/2600/3500/5500'] },
          { name: '4G', amount: 0, selectedFreq: '800/900/1800/1900/2100/2600', freqList: ['800/900/1800/1900/2100/2600'] },
          { name: '3G', amount: 0, selectedFreq: '800/900/1800/1900/2100', freqList: ['800/900/1800/1900/2100'] },
          { name: 'WLAN', amount: 0, selectedFreq: '2450/5500', freqList: ['2450/5500', '2450/5500/6500'] },
          { name: 'MIMO', amount: 0, selectedFreq: '3500', freqList: ['3500', '3500/4200'] },
          { name: 'GPS', amount: 0, selectedFreq: '1575', freqList: ['1575'] },
        ],
        anthennaSpec: [
          { freq: '617~698', power: -6.5, s11: '<-4' },
          { freq: '698-960', power: -6.5, s11: '<-6' },
          { freq: '1452-1496', power: -6.5, s11: '<-6' },
          { freq: '1710-2200', power: -6.5, s11: '<-6' },
          { freq: '2300-2400', power: -6.5, s11: '<-6' },
          { freq: '2400-2500', power: -6.5, s11: '<-6' },
          { freq: '2500-2690', power: -6.5, s11: '<-6' },
          { freq: '3300-3800', power: -6.5, s11: '<-6' },
          { freq: '3800-4200', power: -6.5, s11: '<-6' },
          { freq: '5150-5850', power: -6.5, s11: '<-6' },
          { freq: '5850-7125', power: -6.5, s11: '<-6' },
        ],
        caseMaterialList: [
          { label: '金屬', value: '金屬' }, 
          { label: '塑膠', value: '塑膠' }, 
        ],
        windowMaterialList: [
          { label: '塑膠', value: '塑膠' }, 
        ]
      },
      canvas: null,
      anthennaRect: null,
      windowRect: null
    }
  },
  created() {},
  mounted() {
    this.InitFabric();
  }, 
  methods: {
    ToStep(toStep) {
      for (const key in this.orderStep) {
        this.orderStep[key] = false;
      }
      this.orderStep[`isStep${toStep}`] = true;
    },
    InitFabric() {
      // Canvas config
      this.canvas = new fabric.Canvas('canvas');
      this.canvas.setHeight(500);
      this.canvas.setWidth(window.innerWidth*0.55);
      this.canvas.renderAll();
    
      // anthenna
      this.anthennaRect = new fabric.Rect({
        top: 30,
        left: 30,
        width: window.innerWidth*0.55-60,
        height: 500-60,
        fill: '#36bbd9'
      });
      this.canvas.add(this.anthennaRect);

      // window
      this.windowRect = new fabric.Rect({
        top: 30,
        left: 30,
        width: 20,
        height: 10,
        fill: '#f5f3f4'
      });
      this.canvas.add(this.windowRect);
    },
    // 設定機殼尺寸
    SetCaseX() {
      const scale = this.anthennaRect.getObjectScaling();
      this.anthennaRect.set('width', this.orderDetail.caseX/ scale.scaleX);
      this.anthennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetCaseY() {
      const scale = this.anthennaRect.getObjectScaling();
      this.anthennaRect.set('height', this.orderDetail.caseY/ scale.scaleY);
      this.anthennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    // 設定窗戶尺寸
    SetWindowX() {
      const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('width', this.orderDetail.windowX/ scale.scaleX);
      this.windowRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetWindowY() {
      const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('height', this.orderDetail.windowY/ scale.scaleY);
      this.windowRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetWindowXc() {
      const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('left', (parseInt(this.orderDetail.windowXc)+30));
      this.windowRect.setCoords();
      this.canvas.requestRenderAll();
    },

  },

});
vueInstance.config.globalProperties.window = window;
const app = vueInstance.mount("#app");
