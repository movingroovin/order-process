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
        isStep8: false,
        isStep9: false,
        isStep10: false,
      },
      orderDetail: {
        caseX: 400, // 機殼X
        caseY: 400, // 機殼Y
        windowX: 50, // 窗戶X
        windowY: 50, // 窗戶Y
        windowXc: 0, // 側邊長Xc
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
        antennaSpec: [
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
      caseRect: null,
      windowRect: null,
      antennaRect: null,
      templateList: [
        { id: 1, title: 'Laptop Antenna I', isFree: false, img: '', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN<br> 2.3/3.3/5.5 GHz WiMAX bands', 'ECC for MIMO: <0.04'], refLink: '#', isValid: true, rate: 5 },
        { id: 2, title: 'Laptop Antenna II', isFree: true, img: '', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN<br> 5.5 GHz WiMAX bands'], refLink: '#', isValid: true, rate: 5 },
        { id: 3, title: 'Laptop Antenna III', isFree: true, img: '', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN'], refLink: '#', isValid: true, rate: 4 }
      ],
    }
  },
  created() {},
  mounted() {
    this.InitFabric();
  },
  computed: {
    isCanvasShow() {
      return (this.orderStep.isStep1 ||
        this.orderStep.isStep2 || 
        this.orderStep.isStep3 || 
        this.orderStep.isStep4 || 
        this.orderStep.isStep5 || 
        this.orderStep.isStep6 );
    }
  },
  methods: {
    ToStep(toStep) {
      for (const key in this.orderStep) {
        this.orderStep[key] = false;
      }
      this.orderStep[`isStep${toStep}`] = true;
      
      // set windowRect visible at step 2, antennaRect at step 3
      switch (toStep) {
        case 2:
          this.SetFabricObjVisible(this.windowRect);
          break;
        case 3:
          this.SyncWindowAthennaSize();
          const scale = this.antennaRect.getObjectScaling();
          this.antennaRect.set('width', this.orderDetail.windowX/scale.scaleX);
          this.antennaRect.set('height', this.orderDetail.windowY/scale.scaleY);
          this.windowRect.setCoords();
          this.SetFabricObjVisible(this.antennaRect);
          break;
        default:
          break;
      }
    },
    InitFabric() {
      // Canvas config
      this.canvas = new fabric.Canvas('canvas');
      this.canvas.setHeight(500);
      this.canvas.setWidth(window.innerWidth*0.55);
      this.canvas.renderAll();
    
      // case
      this.AddFabricObj('caseRect', {
        top: 30,
        left: 30,
        width: this.orderDetail.caseX,
        height: this.orderDetail.caseY,
        fill: '#36bbd9',
        selectable: false,
      });

      // window
      this.AddFabricObj('windowRect', {
        top: 30,
        left: 30,
        width: this.orderDetail.windowX,
        height: this.orderDetail.windowY,
        fill: '#f5f3f4',
        selectable: false,
        visible: false
      });

      // antenna
      this.SyncWindowAthennaSize();
      this.AddFabricObj('antennaRect', {
        top: 30,
        left: 30,
        width: this.orderDetail.windowX,
        height: this.orderDetail.windowY,
        fill: '#598e9a',
        stroke: '#333',
        strokeWidth: 2,
        selectable: false,
        visible: false
      });
      
    },
    AddFabricObj(obj, option) {
      this[obj] = new fabric.Rect(option);
      this.canvas.add(this[obj]);
    },
    SetFabricObjVisible(obj) {
      obj.set('visible', true);
      this.canvas.requestRenderAll();
    },
    SyncWindowAthennaSize() {
      this.orderDetail.antennaX = this.orderDetail.windowX;
      this.orderDetail.antennaY = this.orderDetail.windowY;
    },
    // 設定機殼尺寸
    SetCaseX() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('width', this.orderDetail.caseX/ scale.scaleX);
      this.caseRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetCaseY() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('height', this.orderDetail.caseY/ scale.scaleY);
      this.caseRect.setCoords();
      this.canvas.requestRenderAll();
    },
    // 設定窗戶尺寸
    SetWindowX() {
      const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('width', this.orderDetail.windowX/ scale.scaleX);
      this.windowRect.setCoords();

      this.SyncWindowAthennaSize();
      const scaleA = this.antennaRect.getObjectScaling();
      this.antennaRect.set('width', this.orderDetail.windowX/ scaleA.scaleX);
      this.antennaRect.setCoords();

      this.canvas.requestRenderAll();
    },
    SetWindowY() {
      const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('height', this.orderDetail.windowY/ scale.scaleY);
      this.windowRect.setCoords();

      this.SyncWindowAthennaSize();
      const scaleA = this.antennaRect.getObjectScaling();
      this.antennaRect.set('height', this.orderDetail.windowY/ scaleA.scaleY);
      this.antennaRect.setCoords();

      this.canvas.requestRenderAll();
    },
    SetWindowXc() {
      // const scale = this.windowRect.getObjectScaling();
      this.windowRect.set('left', (parseInt(this.orderDetail.windowXc)+30));
      this.windowRect.setCoords();
      this.antennaRect.set('left', (parseInt(this.orderDetail.windowXc)+30));
      this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetAntennaX() {
      const scale = this.antennaRect.getObjectScaling();
      this.antennaRect.set('width', this.orderDetail.antennaX/ scale.scaleX);
      this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetAntennaY() {
      const scale = this.antennaRect.getObjectScaling();
      this.antennaRect.set('height', this.orderDetail.antennaY/ scale.scaleY);
      this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },

  },

});
vueInstance.config.globalProperties.window = window;
const app = vueInstance.mount("#app");
