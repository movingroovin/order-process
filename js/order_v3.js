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
        selectedType: { label: '窗戶', value: 'window' },
        windows: [
          { id: 1, X: 50, Y: 50, Xc: 0, pos: { label: '左上', value: 'left_up' }, mat: { label: '塑膠', value: '塑膠' }, },
        ],
        slots: [
          { id: 1, X: 50, Y: 50, Xc: 10, Yc: 10, pos: { label: '左上', value: 'left_up' }, mat: { label: '塑膠', value: '塑膠' }, },
        ],
        antennas: [
          { id: 1, X: 50, Y: 50, Z: 50, Xc: 0 },
        ],
        sleeve: { X: 50, Y: 50, Z: 50, mat: { label: '塑膠', value: '塑膠' }, },
        windowX: 50, // 窗戶X
        windowY: 50, // 窗戶Y
        windowXc: 0, // 側邊長Xc
        antennaX: null, // 天線X
        antennaY: null, // 天線Y
        antennaZ: null, // 天線Z
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
        typeList: [
          { label: '窗戶', value: 'window' }, 
          { label: '槽孔', value: 'slot' }, 
          { label: '套筒', value: 'sleeve' }, 
        ],
        windowMaterialList: [
          { label: '塑膠', value: '塑膠' }, 
        ],
        slotMaterialList: [
          { label: '塑膠', value: '塑膠' }, 
        ],
        sleeveMaterialList: [
          { label: '塑膠', value: '塑膠' }, 
        ],
        posList: [
          { label: '--請選擇--', value: null },
          { label: '左上', value: 'left_up' }, 
          { label: '右上', value: 'right_up' }, 
          { label: '左下', value: 'left_down' }, 
          { label: '右下', value: 'right_down' }, 
        ],
        attachment: [],
        editAttachment: {},
      },
      canvas: null,
      caseRect: null,
      windowRect: null,
      window1Rect: null,
      window2Rect: null,
      window3Rect: null,
      window4Rect: null,
      slot1Rect: null,
      slot2Rect: null,
      slot3Rect: null,
      slot4Rect: null,
      sleeveLRect: null,
      sleeveRRect: null,
      antenna1Rect: null,
      antenna2Rect: null,
      antenna3Rect: null,
      antenna4Rect: null,
      antennaRect: null,
      templateList: [
        { id: 0, isSelected: true, title: '不使用設計範本，繼續進行客製化設計' },
        { id: 1, isSelected: false, title: 'Laptop Antenna I', isFree: false, img: './../assest/img/antenna/img_1_1.jpeg', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN<br> 2.3/3.3/5.5 GHz WiMAX bands', 'ECC for MIMO: <0.04'], refLink: '#', isValid: true, rate: '★★★★★' },
        { id: 2, isSelected: false, title: 'Laptop Antenna II', isFree: true, img: './../assest/img/antenna/img_1_2.jpeg', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN<br> 5.5 GHz WiMAX bands'], refLink: '#', isValid: true, rate: '★★★★★' },
        { id: 3, isSelected: false, title: 'Laptop Antenna III', isFree: true, img: './../assest/img/antenna/img_1_2.jpeg', features: ['Antenna size : 21 × 8 mm<sup>2</sup>', 'Ground plane size: 13” (260mm x 200mm)', 'Operation frequency:<br>2.4/5.2/5.8 GHz WLAN'], refLink: '#', isValid: true, rate: '★★★★' }
      ],
      planList: [
        { id: 0, title: '72小時 (快速評估)', hour: 72, isSelected: false, isCardOpen: false },
        { id: 1, title: '200小時 (準確評估)', hour: 200, isSelected: false, isCardOpen: false },
        { id: 2, title: '360小時 (高精度評估)', hour: 360, isSelected: false, isCardOpen: false },
        { id: 3, title: '月租年繳方案', hour: 8760, isSelected: false, isCardOpen: false },
      ],
      planCompare: [
        [ '比較', '直接下載設計草稿', '採用樣板AI客製化設計', '委託專業天線廠商'],
        [ '費用', '最便宜 - 數千到數萬', '便宜 - 數萬到數十萬', '非常昂貴 - 數百萬到數千萬'],
        [ '速度', '最快 (立刻)', '依客戶需求決定 (天)', '慢 (月)'],
        [ '客製化',  false, true, true ],
        [ '量產',  false, false, true ],
        [ '設計圖',  true, true, false] , 
        [ '設計費用',  'xxx', 'xxx', 'xxx' ],
      ],
      vendorCompare: [
        [ '比較', '不需實際製作', '供應商A', '供應商B', '供應商C'],
        [ '數量', '-', '(百片)/(千片)/(萬片)', '(百片)/(千片)/(萬片)', '(百片)/(千片)/(萬片)'],
        [ '交期', '-', '日', '日', '日'],
        [ '預估製作費用', '-', '$', '$', '$'],
      ],
      termsCheck: false,
      isLightbox: false,
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
    },
    isStep1Finished() {
      return this.orderDetail.caseX > 0 && this.orderDetail.caseY > 0 && this.orderDetail.selectedCaseMaterial && this.orderDetail.selectedType;
    },
    isStep2Finished() {
      // return this.orderDetail.windowX > 0 && this.orderDetail.windowY > 0 && this.orderDetail.windowXc > 0 && this.orderDetail.selectedWindowMaterial;
      
      if (this.orderDetail.selectedType.value === 'window') {
        return this.orderDetail.editAttachment.X > 0 && this.orderDetail.editAttachment.Y > 0 && this.orderDetail.editAttachment.Xc > 0 && this.orderDetail.editAttachment.pos.value && this.orderDetail.editAttachment.mat.value;
      } else if (this.orderDetail.selectedType.value === 'slot') {
        return this.orderDetail.editAttachment.X > 0 && this.orderDetail.editAttachment.Y > 0 && this.orderDetail.editAttachment.Xc > 0 && this.orderDetail.editAttachment.Yc > 0 && this.orderDetail.editAttachment.pos.value && this.orderDetail.editAttachment.mat.value;
      } else if (this.orderDetail.selectedType.value === 'sleeve') {
        return this.orderDetail.sleeve.X > 0 && this.orderDetail.sleeve.Y > 0 && this.orderDetail.sleeve.Z > 0 && this.orderDetail.sleeve.mat.value;
      }
    },
    isStep3Finished() {
      return this.orderDetail.antennaX > 0 && this.orderDetail.antennaY > 0 && this.orderDetail.antennaZ > 0;
    },
    isStep4Finished() {
      return this.orderDetail.antennaApps.filter(ele => ele.amount > 0).length > 0;
    },
    isStep5Finished() {
      return !this.orderDetail.antennaSpec.filter(ele => !ele.freq || !ele.power || !ele.s11 ).length > 0;
    },
    isStep7Finished() {
      return this.templateList.find(ele => ele.isSelected).id === 0;
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
        case 1:
          console.log(this.orderDetail.editAttachment);
          break;
        case 2:
          // this.SetFabricObjVisible(this.windowRect);
          // if (this.orderDetail.selectedType.value === '窗戶') {
          //   this.SetFabricObjVisible(this.window1Rect);
          // } else if (this.orderDetail.selectedType.value === '槽孔') {
          //   this.SetFabricObjVisible(this.slot1Rect);
          // } else if (this.orderDetail.selectedType.value === '套筒') {
          //   this.orderDetail.sleeve.X = parseInt(this.orderDetail.caseX) - 30*2;
          //   this.sleeveLRect.set('top', 30 + parseInt(this.orderDetail.caseY));
          //   this.sleeveRRect.set('top', 30 + parseInt(this.orderDetail.caseY));
          //   this.SetFabricObjVisible(this.sleeveLRect);
          //   this.SetFabricObjVisible(this.sleeveRRect);
          // } 
          console.log(this.orderDetail.editAttachment);
          break;
        case 3:
          this.AddAntenna(this.orderDetail.editAttachment.id)
          break;
        default:
          break;
      }
    },
    SelectTemplate(template) {
      this.templateList.forEach(ele => ele.isSelected = false);
      this.templateList.find(ele => ele.id === template.id).isSelected = true;
    },
    SelectPlan(plan) {
      this.planList.forEach(ele => ele.isSelected = false);
      this.planList.find(ele => ele.id === plan.id).isSelected = true;
    },
    TogglePlanCard(planCard) {
      planCard.isCardOpen = !planCard.isCardOpen;
    },
    ToggleTermsContent() {
      if (!this.isLightbox) { //open
        document.documentElement.style.overflow = "hidden";
      } else { //close
        document.documentElement.style.overflow = "auto";
        this.lightboxAmount = 1;
      }
      this.isLightbox = !this.isLightbox;
      
    },
    AddObj(selectedtype) {
      let newObj = {};
      let newObjId = this.orderDetail.attachment.length+1;
      switch (selectedtype.value) {
        case 'window':
          newObj = {
            type: selectedtype.value, typeName: selectedtype.label, id: newObjId, X: 30, Y: 30, Xc: 10, pos: { label: '左上', value: 'left_up' }, mat: { label: '塑膠', value: '塑膠' }, 
          };
          this.orderDetail.attachment.push(newObj);
          this.AddFabricObj(`rectAttachment${newObjId}`, {
            top: 30,
            left: 40,
            width: newObj.X,
            height: newObj.Y,
            fill: '#f5f3f4',
            // stroke: '#333',
            // strokeWidth: 1,
            // strokeDashArray: [5, 5],
            selectable: false
          });
          this.orderDetail.editAttachment = this.orderDetail.attachment.find(ele => ele.id === newObjId);
          break;
        case 'slot':
          newObj = {
            type: selectedtype.value, typeName: selectedtype.label, id: newObjId, X: 50, Y: 50, Xc: 10, Yc: 10, pos: { label: '左上', value: 'left_up' }, mat: { label: '塑膠', value: '塑膠' }, 
          };
          this.orderDetail.attachment.push(newObj);
          this.AddFabricObj(`rectAttachment${newObjId}`, {
            top: 40,
            left: 40,
            width: newObj.X,
            height: newObj.Y,
            fill: '#f5f3f4',
            // stroke: '#333',
            // strokeWidth: 1,
            // strokeDashArray: [5, 5],
            selectable: false
          });
          this.orderDetail.editAttachment = this.orderDetail.attachment.find(ele => ele.id === newObjId);
          break
        case 'sleeve':
          break   
        default:
          break;
      }
    },
    DeleteObj(id) {
      // 找到id刪除
      let delIndex = this.orderDetail.attachment.findIndex(ele => ele.id === id);
      this.orderDetail.attachment.splice(delIndex, 1);
      // 重設editAttachment
      this.orderDetail.editAttachment = {};
      // 刪除fabric canvas物件
      this.DeleteFabricObj(`rectAttachment${id}`);
      this.DeleteFabricObj(`rectAntenna${id}`);
    },
    ReselectAttachment(id) {
      this.DeleteObj(id);
    },
    AddAntenna(id) {
      let attach = this.orderDetail.attachment.find(ele => ele.id === id);
      attach.antenna = { X: attach.X, Y: attach.Y, Z: 10};
      // 重設editAttachment
      this.orderDetail.editAttachment = attach;
      this.AddFabricObj(`rectAntenna${id}`, {
        top: this[`rectAttachment${id}`].get('top'),
        left: this[`rectAttachment${id}`].get('left'),
        width: parseInt(attach.X),
        height: parseInt(attach.Y),
        fill: '#598e9a',
        stroke: '#333',
        strokeWidth: 2,
        selectable: false
      });
      console.log(this.orderDetail.editAttachment);
    },
    AddWindow() {
      let newId = this.orderDetail.windows.length+1;
      this.orderDetail.windows.push({ id: newId, X: 50, Y: 50, Xc: 0, pos: { label: '--請選擇--', value: null }, mat: { label: '塑膠', value: '塑膠' }, });
      this[`window${newId}Rect`].set('width', 50);
      this[`window${newId}Rect`].set('height', 50);
      // this.SetFabricObjVisible(this[`window${newId}Rect`]);
    },
    DeleteWindow(win) {
      let delIndex = this.orderDetail.windows.findIndex(ele => ele.id === win.id);
      this.orderDetail.windows.splice(delIndex, 1);
      this.SetFabricObjInvisible(this[`window${win.id}Rect`]);
    },
    AddSlot() {
      let newId = this.orderDetail.slots.length+1;
      this.orderDetail.slots.push({ id: newId, X: 50, Y: 50, Xc: 10, Yc: 10, pos: { label: '--請選擇--', value: null }, mat: { label: '塑膠', value: '塑膠' }, });
      this[`slot${newId}Rect`].set('width', 50);
      this[`slot${newId}Rect`].set('height', 50);
    },
    DeleteSlot(slot) {
      let delIndex = this.orderDetail.slots.findIndex(ele => ele.id === slot.id);
      this.orderDetail.slots.splice(delIndex, 1);
      this.SetFabricObjInvisible(this[`slot${slot.id}Rect`]);
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
      // this.AddFabricObj('windowRect', {
      //   top: 30,
      //   left: 30,
      //   width: this.orderDetail.windowX,
      //   height: this.orderDetail.windowY,
      //   fill: '#f5f3f4',
      //   selectable: false,
      //   visible: false
      // });

      // sleeve
      this.AddFabricObj('sleeveLRect', {
        top: 30,
        left: 30,
        width: 30,
        height: 30,
        fill: '#36bbd9',
        visible: false,
        selectable: false,
      });
      this.AddFabricObj('sleeveRRect', {
        top: 30,
        left: 30 + this.orderDetail.caseX - 30,
        width: 30,
        height: 30,
        fill: '#36bbd9',
        visible: false,
        selectable: false,
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
    DeleteFabricObj(obj) {
      this.canvas.remove(this[obj]);
    },
    SetFabricObjVisible(obj) {
      obj.set('visible', true);
      this.canvas.requestRenderAll();
    },
    SetFabricObjInvisible(obj) {
      obj.set('visible', false);
      this.canvas.requestRenderAll();
    },
    SyncWindowAthennaSize() {
      // this.orderDetail.antennaX = this.orderDetail.windowX;
      // this.orderDetail.antennaY = this.orderDetail.windowY;
    },
    // 設定機殼尺寸
    SetCaseX() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('width', this.orderDetail.caseX/ scale.scaleX);
      this.caseRect.setCoords();

      this.sleeveLRect.set('left', 30);
      this.sleeveRRect.set('left', 30 + parseInt(this.orderDetail.caseX) - 30);
      this.orderDetail.sleeve.X = parseInt(this.orderDetail.caseX) - 30*2;

      this.canvas.requestRenderAll();
    },
    SetCaseY() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('height', this.orderDetail.caseY/ scale.scaleY);
      this.caseRect.setCoords();

      this.sleeveLRect.set('top', 30 + this.orderDetail.caseY);
      this.sleeveRRect.set('top', 30 + this.orderDetail.caseY);
      this.canvas.requestRenderAll();
    },
    SetAttachmentX(id) {
      const scale = this[`rectAttachment${id}`].getObjectScaling();
      this[`rectAttachment${id}`].set('width', this.orderDetail.editAttachment.X/ scale.scaleX);
      // this.SetWindowsPosition(id, win.pos.value);
      this[`rectAttachment${id}`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetAttachmentY(id) {
      const scale = this[`rectAttachment${id}`].getObjectScaling();
      this[`rectAttachment${id}`].set('height', this.orderDetail.editAttachment.Y/ scale.scaleY);
      // this.SetWindowsPosition(id, win.pos.value);
      this[`rectAttachment${id}`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetAttachmentXcYc(id) {
      this.SetAttachmentPosition(id, this.orderDetail.editAttachment.pos.value);
      this[`rectAttachment${id}`].setCoords();
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
    // 設定窗戶尺寸(多個窗戶)
    SetWindowsX(id) {
      let win = this.orderDetail.windows.find(ele => ele.id === id);
      const scale = this[`window${id}Rect`].getObjectScaling();
      this[`window${id}Rect`].set('width', win.X/ scale.scaleX);
      this.SetWindowsPosition(id, win.pos.value);
      this[`window${id}Rect`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetWindowsY(id) {
      let win = this.orderDetail.windows.find(ele => ele.id === id);
      const scale = this[`window${id}Rect`].getObjectScaling();
      this[`window${id}Rect`].set('height', win.Y/ scale.scaleY);
      this.SetWindowsPosition(id, win.pos.value);
      this[`window${id}Rect`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetWindowsXc(id) {
      let win = this.orderDetail.windows.find(ele => ele.id === id);
      this.SetWindowsPosition(id, win.pos.value);
      
      // this[`window${id}Rect`].set('left', (parseInt(this.orderDetail.windows.find(ele => ele.id === id).Xc)+30));
      this[`window${id}Rect`].setCoords();
      // this.antennaRect.set('left', (parseInt(this.orderDetail.windows.find(ele => ele.id === id).Xc)+30));
      // this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetWindowsPos(id, pos) {
      this.SetWindowsPosition(id, pos);
      this.SetFabricObjVisible(this[`window${id}Rect`]);
      // this.antennaRect.set('left', (parseInt(this.orderDetail.windows.find(ele => ele.id === id).Xc)+30));
      // this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetAttachmentPos(id, pos) {
      this.SetAttachmentPosition(id, pos);
      // this.SetFabricObjVisible(this[`window${id}Rect`]);
      // this.antennaRect.set('left', (parseInt(this.orderDetail.windows.find(ele => ele.id === id).Xc)+30));
      // this.antennaRect.setCoords();
      this.canvas.requestRenderAll();
    },
    SetAttachmentPosition(id, pos) {
      let win = this.orderDetail.editAttachment;
      if (win.type === 'window') {
        switch (pos) {
          case 'left_up':
            this[`rectAttachment${id}`].set('top', 30);
            this[`rectAttachment${id}`].set('left', 30 + parseInt(win.Xc));
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'right_up':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30);
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'left_down':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y));
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'right_down':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y));
            this[`rectAttachment${id}`].setCoords();
            break;
          default:
            break;
        }
      } else if (win.type === 'slot') {
        switch (pos) {
          case 'left_up':
            this[`rectAttachment${id}`].set('top', 30 + parseInt(win.Yc));
            this[`rectAttachment${id}`].set('left', 30 + parseInt(win.Xc));
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'right_up':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30 + parseInt(win.Yc));
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'left_down':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y) - parseInt(win.Yc));
            this[`rectAttachment${id}`].setCoords();
            break;
          case 'right_down':
            this[`rectAttachment${id}`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
            this[`rectAttachment${id}`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y) - parseInt(win.Yc));
            this[`rectAttachment${id}`].setCoords();
            break;
          default:
            break;
        }
      }
      
    },
    SetWindowsPosition(id, pos) {
      let win = this.orderDetail.windows.find(ele => ele.id === id);
      switch (pos) {
        case 'left_up':
          this[`window${id}Rect`].set('top', 30);
          this[`window${id}Rect`].set('left', 30 + parseInt(win.Xc));
          this[`window${id}Rect`].setCoords();
          break;
        case 'right_up':
          this[`window${id}Rect`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
          this[`window${id}Rect`].set('top', 30);
          this[`window${id}Rect`].setCoords();
          break;
        case 'left_down':
          this[`window${id}Rect`].set('left', 30 + parseInt(win.Xc));
          this[`window${id}Rect`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y));
          this[`window${id}Rect`].setCoords();
          break;
        case 'right_down':
          this[`window${id}Rect`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(win.X) - parseInt(win.Xc));
          this[`window${id}Rect`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(win.Y));
          this[`window${id}Rect`].setCoords();
          break;
        default:
          break;
      }
    },
    // 設定槽孔尺寸(多個槽孔)
    SetSlotsX(id) {
      let slot = this.orderDetail.slots.find(ele => ele.id === id);
      const scale = this[`slot${id}Rect`].getObjectScaling();
      this[`slot${id}Rect`].set('width', slot.X/ scale.scaleX);
      this.SetSlotsPosition(id, slot.pos.value);
      this[`slot${id}Rect`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetSlotsY(id) {
      let slot = this.orderDetail.slots.find(ele => ele.id === id);
      const scale = this[`slot${id}Rect`].getObjectScaling();
      this[`slot${id}Rect`].set('height', slot.Y/ scale.scaleY);
      this.SetSlotsPosition(id, slot.pos.value);
      this[`slot${id}Rect`].setCoords();

      this.canvas.requestRenderAll();
    },
    SetSlotsXc(id) {
      let slot = this.orderDetail.slots.find(ele => ele.id === id);
      this.SetSlotsPosition(id, slot.pos.value);
      
      this[`slot${id}Rect`].setCoords();
      this.canvas.requestRenderAll();
    },
    SetSlotsYc(id) {
      let slot = this.orderDetail.slots.find(ele => ele.id === id);
      this.SetSlotsPosition(id, slot.pos.value);
      
      this[`slot${id}Rect`].setCoords();
      this.canvas.requestRenderAll();
    },
    SetSlotsPos(id, pos) {
      this.SetSlotsPosition(id, pos);
      this.SetFabricObjVisible(this[`slot${id}Rect`]);
      this.canvas.requestRenderAll();
    },
    SetSlotsPosition(id, pos) {
      let slot = this.orderDetail.slots.find(ele => ele.id === id);
      switch (pos) {
        case 'left_up':
          this[`slot${id}Rect`].set('top', 30 + parseInt(slot.Yc));
          this[`slot${id}Rect`].set('left', 30 + parseInt(slot.Xc));
          this[`slot${id}Rect`].setCoords();
          break;
        case 'right_up':
          this[`slot${id}Rect`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(slot.X) - parseInt(slot.Xc));
          this[`slot${id}Rect`].set('top', 30 + parseInt(slot.Yc));
          this[`slot${id}Rect`].setCoords();
          break;
        case 'left_down':
          this[`slot${id}Rect`].set('left', 30 + parseInt(slot.Xc));
          this[`slot${id}Rect`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(slot.Y) - parseInt(slot.Yc));
          this[`slot${id}Rect`].setCoords();
          break;
        case 'right_down':
          this[`slot${id}Rect`].set('left', 30 + parseInt(this.orderDetail.caseX) - parseInt(slot.X) - parseInt(slot.Xc));
          this[`slot${id}Rect`].set('top', 30 + parseInt(this.orderDetail.caseY) - parseInt(slot.Y) - parseInt(slot.Yc));
          this[`slot${id}Rect`].setCoords();
          break;
        default:
          break;
      }
    },
    // 設定套筒尺寸
    SetSleeveSize(dimension) {
      const scaleL = this.sleeveLRect.getObjectScaling();
      const scaleR = this.sleeveRRect.getObjectScaling();
      switch (dimension) {
        case 'width':
          this.sleeveLRect.set('left', 30 + (parseInt(this.orderDetail.caseX) - parseInt(this.orderDetail.sleeve.X))/2 - 30);
          this.sleeveRRect.set('left', 30 + (parseInt(this.orderDetail.caseX) + parseInt(this.orderDetail.sleeve.X))/2);
          break;
        case 'height':
          this.sleeveLRect.set('height', this.orderDetail.sleeve.Y/ scaleL.scaleY);
          this.sleeveRRect.set('height', this.orderDetail.sleeve.Y/ scaleR.scaleY);
          break;
        default:
          break;
      }
      this.sleeveLRect.setCoords();
      this.sleeveRRect.setCoords();

      this.canvas.requestRenderAll();
    },
    SetAntennaX(id) {
      const scale = this[`rectAntenna${id}`].getObjectScaling();
      this[`rectAntenna${id}`].set('width', this.orderDetail.editAttachment.antenna.X/ scale.scaleX);
      this[`rectAntenna${id}`].setCoords();
      this.canvas.requestRenderAll();
    },
    SetAntennaY(id) {
      const scale = this[`rectAntenna${id}`].getObjectScaling();
      this[`rectAntenna${id}`].set('height', this.orderDetail.editAttachment.antenna.Y/ scale.scaleY);
      this[`rectAntenna${id}`].setCoords();
      this.canvas.requestRenderAll();
    },

  },

});
vueInstance.config.globalProperties.window = window;
const app = vueInstance.mount("#app");
