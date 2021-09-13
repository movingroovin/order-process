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
      isAddMore: true,
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
        return this.orderDetail.editAttachment.X > 0 && this.orderDetail.editAttachment.Y > 0 && this.orderDetail.editAttachment.Z > 0 && this.orderDetail.editAttachment.Xs > 0 && this.orderDetail.editAttachment.mat.value;
      }
    },
    isStep3Finished() {
      return this.orderDetail.editAttachment.antenna && this.orderDetail.editAttachment.antenna.X > 0 && this.orderDetail.editAttachment.antenna.Y > 0 && this.orderDetail.editAttachment.antenna.Z > 0;
    },
    isStep4Finished() {
      return this.orderDetail.editAttachment.antennaApps && this.orderDetail.editAttachment.antennaApps.filter(ele => ele.amount > 0).length > 0;
    },
    isStep5Finished() {
      return this.orderDetail.editAttachment.antennaSpec && !this.orderDetail.editAttachment.antennaSpec.filter(ele => !ele.freq || !ele.power || !ele.s11 ).length > 0;
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
      switch (toStep) {
        // case 1:
        //   console.log(this.orderDetail.editAttachment);
        //   break;
        // case 2:
        //   console.log(this.orderDetail.editAttachment);
        //   break;
        case 3:
          this.DeleteFabricObj(`rectAntenna${this.orderDetail.editAttachment.id}`);
          this.DeleteFabricObj(`rectEmpty${this.orderDetail.editAttachment.id}`);
          this.AddAntenna(this.orderDetail.editAttachment.id);
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
      this.isAddMore = false;
      let newObj = {};
      let newObjId = this.orderDetail.attachment.length+1;
      switch (selectedtype.value) {
        case 'window':
          newObj = {
            type: selectedtype.value,
            typeName: selectedtype.label,
            id: newObjId,
            X: 30,
            Y: 30,
            Xc: 10,
            pos: { label: '左上', value: 'left_up' },
            mat: { label: '塑膠', value: '塑膠' },
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
          };
          this.orderDetail.attachment.push(newObj);
          this.AddFabricObj(`rectAttachment${newObjId}`, {
            top: 30,
            left: 40,
            width: newObj.X,
            height: newObj.Y,
            fill: '#f5f3f4',
            selectable: false
          });
          this.orderDetail.editAttachment = this.orderDetail.attachment.find(ele => ele.id === newObjId);
          break;
        case 'slot':
          newObj = {
            type: selectedtype.value,
            typeName: selectedtype.label,
            id: newObjId,
            X: 50,
            Y: 50,
            Xc: 10,
            Yc: 10,
            pos: { label: '左上', value: 'left_up' },
            mat: { label: '塑膠', value: '塑膠' },
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
          };
          this.orderDetail.attachment.push(newObj);
          this.AddFabricObj(`rectAttachment${newObjId}`, {
            top: 40,
            left: 40,
            width: newObj.X,
            height: newObj.Y,
            fill: '#f5f3f4',
            selectable: false
          });
          this.orderDetail.editAttachment = this.orderDetail.attachment.find(ele => ele.id === newObjId);
          break
        case 'sleeve':
          newObj = {
            type: selectedtype.value,
            typeName: selectedtype.label,
            id: newObjId,
            X: 50,
            Y: 50,
            Z: 10,
            Xs: 20,
            mat: { label: '塑膠', value: '塑膠' },
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
          };
          this.orderDetail.attachment.push(newObj);
          this.AddFabricObj(`rectAttachment${newObjId}`, {
            top: this.caseRect.get('height')+30,
            left: this.caseRect.get('left') + (this.caseRect.get('width') - parseInt(newObj.X))/2,
            width: newObj.X,
            height: newObj.Y,
            fill: '#f5f3f4',
            stroke: '#777',
            strokeWidth: 1,
            selectable: false
          });
          this.AddFabricObj(`sleeveL${newObjId}`, {
            top: this.caseRect.get('height')+30,
            left: this[`rectAttachment${newObjId}`].get('left') - 20,
            width: 20,
            height: this[`rectAttachment${newObjId}`].get('height'),
            fill: '#36bbd9',
            stroke: '#777',
            strokeWidth: 1,
            selectable: false
          });
          this.AddFabricObj(`sleeveR${newObjId}`, {
            top: this.caseRect.get('height')+30,
            left: this[`rectAttachment${newObjId}`].get('left') + this[`rectAttachment${newObjId}`].get('width'),
            width: 20,
            height: this[`rectAttachment${newObjId}`].get('height'),
            fill: '#36bbd9',
            stroke: '#777',
            strokeWidth: 1,
            selectable: false
          });
          this.orderDetail.editAttachment = this.orderDetail.attachment.find(ele => ele.id === newObjId);
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
      this.DeleteFabricObj(`rectEmpty${id}`);
      this.DeleteFabricObj(`sleeveL${id}`);
      this.DeleteFabricObj(`sleeveR${id}`);
    },
    ReselectAttachment(id) {
      this.isAddMore = true;
      this.DeleteObj(id);
    },
    AddMoreObj() {
      this.isAddMore = true;
      this.orderDetail.selectedType = { label: '窗戶', value: 'window' };
      this.ToStep(2);
    },
    AddAntenna(id) {
      let attach = this.orderDetail.attachment.find(ele => ele.id === id);
      attach.antenna = { X: attach.X, Y: attach.Y, Z: 10, X1: attach.X, Y1: attach.Y, Z1: 10};
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
      this.AddFabricObj(`rectEmpty${id}`, {
        top: this[`rectAttachment${id}`].get('top'),
        left: this[`rectAttachment${id}`].get('left'),
        width: parseInt(attach.X),
        height: parseInt(attach.Y),
        fill: '',
        stroke: '#d83c37',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: false
      });
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
    },
    AddFabricObj(obj, option) {
      this[obj] = new fabric.Rect(option);
      this.canvas.add(this[obj]);
    },
    DeleteFabricObj(obj) {
      this.canvas.remove(this[obj]);
    },
    // 設定機殼尺寸
    SetCaseX() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('width', this.orderDetail.caseX/ scale.scaleX);
      this.caseRect.setCoords();
      this.canvas.requestRenderAll();

      this.orderDetail.attachment.forEach(ele => this.DeleteObj(ele.id));
      this.isAddMore = true;
    },
    SetCaseY() {
      const scale = this.caseRect.getObjectScaling();
      this.caseRect.set('height', this.orderDetail.caseY/ scale.scaleY);
      this.caseRect.setCoords();
      this.canvas.requestRenderAll();

      this.orderDetail.attachment.forEach(ele => this.DeleteObj(ele.id));
      this.isAddMore = true;
    },
    SetAttachmentX(id) {
      const scale = this[`rectAttachment${id}`].getObjectScaling();
      this[`rectAttachment${id}`].set('width', this.orderDetail.editAttachment.X/ scale.scaleX);
      this[`rectAttachment${id}`].setCoords();

      if (this.orderDetail.editAttachment.type === 'sleeve') {
        this[`rectAttachment${id}`].set('left', this.caseRect.get('left') + (this.caseRect.get('width') - parseInt(this.orderDetail.editAttachment.X))/2);
        this[`sleeveL${id}`].set('left', this[`rectAttachment${id}`].get('left') - this.orderDetail.editAttachment.Xs);
        this[`sleeveR${id}`].set('left', this[`rectAttachment${id}`].get('left') + this[`rectAttachment${id}`].get('width'));
      }
      this.canvas.requestRenderAll();

      // 刪除既有天線
      this.DeleteFabricObj(`rectAntenna${id}`);
    },
    SetAttachmentY(id) {
      const scale = this[`rectAttachment${id}`].getObjectScaling();
      this[`rectAttachment${id}`].set('height', this.orderDetail.editAttachment.Y/ scale.scaleY);
      this[`rectAttachment${id}`].setCoords();

      if (this.orderDetail.editAttachment.type === 'sleeve') {
        this[`sleeveL${id}`].set('height', this[`rectAttachment${id}`].get('height'));
        this[`sleeveR${id}`].set('height', this[`rectAttachment${id}`].get('height'));
      }

      this.canvas.requestRenderAll();
      // 刪除既有天線
      this.DeleteFabricObj(`rectAntenna${id}`);
    },
    SetAttachmentXcYc(id) {
      this.SetAttachmentPosition(id, this.orderDetail.editAttachment.pos.value);
      this[`rectAttachment${id}`].setCoords();
      this.canvas.requestRenderAll();
      // 刪除既有天線
      this.DeleteFabricObj(`rectAntenna${id}`);
    },
    SetAttachmentXs(id) {
      const scale = this[`sleeveL${id}`].getObjectScaling();
      this[`sleeveL${id}`].set('width', this.orderDetail.editAttachment.Xs/ scale.scaleX);
      this[`sleeveR${id}`].set('width', this.orderDetail.editAttachment.Xs/ scale.scaleX);
      this[`sleeveL${id}`].set('left', this[`rectAttachment${id}`].get('left') - this.orderDetail.editAttachment.Xs);
      this[`sleeveR${id}`].set('left', this[`rectAttachment${id}`].get('left') + this[`rectAttachment${id}`].get('width'));
      this[`sleeveL${id}`].setCoords();
      this[`sleeveR${id}`].setCoords();
      this.canvas.requestRenderAll();
    },
    SetAttachmentPos(id, pos) {
      this.SetAttachmentPosition(id, pos);
      this.DeleteFabricObj(`rectAntenna${id}`);
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
    SetAntennaX(id) {
      const scale = this[`rectAntenna${id}`].getObjectScaling();
      this[`rectAntenna${id}`].set('width', this.orderDetail.editAttachment.antenna.X/ scale.scaleX);
      this[`rectAntenna${id}`].setCoords();
      // 天線置中
      let newLeft = this[`rectAttachment${id}`].get('left') + (this[`rectAttachment${id}`].get('width') - parseInt(this.orderDetail.editAttachment.antenna.X))/2;
      this[`rectAntenna${id}`].set('left', newLeft);
      this.canvas.requestRenderAll();
    },
    SetAntennaY(id) {
      const scale = this[`rectAntenna${id}`].getObjectScaling();
      this[`rectAntenna${id}`].set('height', this.orderDetail.editAttachment.antenna.Y/ scale.scaleY);
      this[`rectAntenna${id}`].setCoords();
      // 天線置中
      let newTop = this[`rectAttachment${id}`].get('top') + (this[`rectAttachment${id}`].get('height') - parseInt(this.orderDetail.editAttachment.antenna.Y))/2;
      this[`rectAntenna${id}`].set('top', newTop);
      this.canvas.requestRenderAll();
    },
    SetEmptyX(id) {
      const scale = this[`rectEmpty${id}`].getObjectScaling();
      this[`rectEmpty${id}`].set('width', this.orderDetail.editAttachment.antenna.X1/ scale.scaleX);
      this[`rectEmpty${id}`].setCoords();
      // 置中
      let newLeft = this[`rectAttachment${id}`].get('left') + (this[`rectAttachment${id}`].get('width') - parseInt(this.orderDetail.editAttachment.antenna.X1))/2;
      this[`rectEmpty${id}`].set('left', newLeft);
      this.canvas.requestRenderAll();
    },
    SetEmptyY(id) {
      const scale = this[`rectEmpty${id}`].getObjectScaling();
      this[`rectEmpty${id}`].set('height', this.orderDetail.editAttachment.antenna.Y1/ scale.scaleY);
      this[`rectEmpty${id}`].setCoords();

      let newTop;
      // 槽孔/套筒淨空區置中
      if (this.orderDetail.editAttachment.type !== 'window') {
        newTop = this[`rectAttachment${id}`].get('top') + (this[`rectAttachment${id}`].get('height') - parseInt(this.orderDetail.editAttachment.antenna.Y1))/2;
      } else {
        newTop = this[`rectEmpty${id}`].get('top');
      }
      
      this[`rectEmpty${id}`].set('top', newTop);
      this.canvas.requestRenderAll();
    },
  },

});
vueInstance.config.globalProperties.window = window;
const app = vueInstance.mount("#app");
