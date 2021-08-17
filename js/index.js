const vueInstance = Vue.createApp({
  data() {
    return {
      tabList: [
        { text: '快速預約', isSelect: true },
        // { text: '雙人快清', isSelect: false },
        { text: '加入會員', isSelect: false },
        // { text: '定期享優惠', isSelect: false },
      ],
      introList: [
        [ { name: '1', isContentOpen: false }, { name: '2', isContentOpen: false },],
        [ { name: '3', isContentOpen: false }, { name: '4', isContentOpen: false },],
        [ { name: '5', isContentOpen: false }, { name: '6', isContentOpen: false },],
      ],
      faqList: [
        { isContentOpen: false, title: '需要準備清潔用具給清潔人員嗎？', content: '原則上，潔客會自行攜帶清潔用具提供服務，無須額外支付費用。（每位潔客攜帶之用具略有不同，完整性也屬服務評價的考量標準！）若有額外特殊需求，可在預約時加購全新專屬用具，費用於服務當日以現金支付給潔客。' },
        { isContentOpen: false, title: '突然有事我可以延期或取消嗎？', content: '1. 取消服務退款將酌收整體費用5%為服務手續費用<br>2. 服務開始前一日18:00後取消或更改酌收當次服務費用30%<br>3. 已於開始服務時間取消服務則酌收當次服務費用50%' },
        { isContentOpen: false, title: '居家清潔做不完可以加時嗎？', content: '如果當天服務有需要加時的狀況，可與在場的服務人員（潔客）協調，可否配合加時。若潔客無法配合加時，則請您再預訂下一次的清潔服務，當天並不保證一定能夠加時。加時費用將會比照該潔客之鐘點費（每位潔客之鐘點費不同）計算，以0.5小時為單位，未滿半小時以半小時計算，並可將加時的費用直接交給潔客。' },
        { isContentOpen: false, title: '服務過程中，我一定要在家嗎？', content: '潔客無義務代為保管鑰匙，同時到府清潔屬於安全、財產較敏感之服務型態，因此建議您清潔開始與結束時，至少在場開、關門，或請交由第三方（例：大樓警衛）開、關門。也建議您於服務開始與結束前10分鐘在場，才能與當天的潔客溝通、檢查當天清潔後狀況。' },
        { isContentOpen: false, title: '除螨、抽油煙機、洗衣機清潔等其他服務可以和鐘點清潔安排同一天嗎？', content: '居家清潔、洗衣機、除塵螨基本上都是不同的清潔人員或專業團隊來提供服務，通常會比較難讓您預約排在同一天。' },
      ],
      recommendList: [
        { name: 'Service A', region: 'Region A', rate: '★★★★★', time: 100 },
        { name: 'Service B', region: 'Region B', rate: '★★★★★', time: 110 },
        { name: 'Service C', region: 'Region C', rate: '★★★★★', time: 120 },
        { name: 'Service D', region: 'Region D', rate: '★★★★★', time: 130 },
        { name: 'Service E', region: 'Region E', rate: '★★★★★', time: 140 },
        { name: 'Service F', region: 'Region F', rate: '★★★★★', time: 150 },
        { name: 'Service G', region: 'Region G', rate: '★★★★★', time: 160 },
        { name: 'Service H', region: 'Region H', rate: '★★★★★', time: 170 },
        // { name: 'Service I', region: 'Region I', rate: '★★★★★', time: 180 },
        // { name: 'Service J', region: 'Region J', rate: '★★★★★', time: 190 },
      ],
      preserveList: [
        [ { name: '01', label: '選擇地區、時數', icon: '<i class="fas fa-map-marker-alt"></i>' }, 
          { name: '02', label: '選擇日期、時間', icon: '<i class="fas fa-calendar-check"></i>' },
          { name: '03', label: '選擇清潔人員', icon: '<i class="far fa-id-badge"></i>' },
          { name: '04', label: '填寫資料', icon: '<i class="fas fa-file-invoice-dollar"></i>' },],
        [ { name: '05', label: '付款下訂', icon: '<i class="far fa-credit-card"></i>' },
          { name: '06', label: '服務前一天聯絡', icon: '<i class="fas fa-phone-alt"></i>' },
          { name: '07', label: '到府清潔', icon: '<i class="fas fa-microchip"></i>' },
          { name: '08', label: '完成驗收', icon: '<i class="fas fa-tasks"></i>' },],
      ],
      isOrdering: false,
      isBasicInfo: false,
      isDateSelect: false,
      isTimeSelect: false,
      isProjectSelect: false,
      selectedDate: '',
      selectedStartDate: '',
      selectedEndDate: '',
      selectedDateRange: 0,
      calenderClickTime: 0,
      selectedTime: '',
      selectedService: { label: '筆記型電腦天線設計', value: '筆記型電腦天線設計' }, 
      serviceList: [
        { label: '筆記型電腦天線設計', value: '筆記型電腦天線設計' }, 
        { label: '平板電腦天線設計', value: '平板電腦天線設計' }, 
        { label: '電磁環境建模服務', value: '電磁環境建模服務' }, 
        { label: '競品分析', value: '競品分析' }, 
      ],
      selectedDesign: { label: 'WLAN天線設計', value: 'WLAN天線設計' },
      designList: [
        { label: 'WLAN天線設計', value: 'WLAN天線設計' },
        { label: 'LTE天線設計', value: 'LTE天線設計' },
        { label: 'MIMO天線設計', value: 'MIMO天線設計' },
        { label: 'mmWave天線設計', value: 'mmWave天線設計' },
      ],
      selectedWorker: { label: '客戶提供參考設計', value: '客戶提供參考設計' },
      workerList: [
        { label: '客戶提供參考設計', value: '客戶提供參考設計' },
        { label: '讓AI自己設計', value: '讓AI自己設計' },
      ],
      timeList: [
        { time: '72小時 (快速評估)', hour: 72, isSelect: false, isCardOpen: false },
        { time: '200小時 (準確評估)', hour: 200, isSelect: false, isCardOpen: false },
        { time: '360小時 (高精度評估)', hour: 360, isSelect: false, isCardOpen: false },
        { time: '月租年繳方案', hour: 8640, isSelect: false, isCardOpen: false },
      ],
      selectedProject: { hour: 0 },
      moreCardInfoList: [
        { title: 'Project 0', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 400, isSelect: true },
        { title: 'Project 1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 100, isSelect: false },
        { title: 'Project 2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 150, isSelect: false },
        { title: 'Project 3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 200, isSelect: false },
        { title: 'Project 4', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 250, isSelect: false },
        { title: 'Project 5', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 300, isSelect: false },
        { title: 'Project 6', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aliquam!', hour: 350, isSelect: false },
      ],
      lightboxAmount: 1,
      isLightbox: false,
      orderStep: {
        isStep1: true,
        isStep2: false,
        isStep3: false,
        isStep4: false,
      },
      planList: [
        { id: 1, name: '急件處理', subtitle: '急件處理，另加24小時', tag: '+ 24 hr', isSimple: false, isSelect: false },
        { id: 2, name: '購買版權', subtitle: '購買版權，總時數 x 2', tag: ' hr x 2', isSimple: false, isSelect: false },
        { id: 3, name: '下載3D資料', subtitle: '下載3D資料，總時數 x 1.5', tag: 'hr x 1.5', isSimple: false, isSelect: false },
      ],
      paymentTerms2Checked: false,
      calendarConfigInline: {
        inline: true,
        mode: "range",
        minDate: "today",
        locale: "zh_tw",
      },
      calendarConfig: {
        minDate: "today",
        locale: "zh_tw",
      }
    }
  },
  created() {
    if (window.innerWidth > 1100) {
      this.introList.forEach(ele => {
        ele.forEach(ele1 => ele1.isContentOpen = true);
      });
    } else {
      this.introList.forEach(ele => {
        ele.forEach(ele1 => ele1.isContentOpen = false);
      });
    }
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {
    subTotal() {
      if (this.selectedTime && this.selectedProject) {
        return (this.selectedTime.hour + this.selectedProject.hour);
      }
      return 0;
    },
    totalHour() {
      let subTotal = 0;
      if (this.selectedTime && this.selectedProject) {
        subTotal = (this.selectedTime.hour + this.selectedProject.hour);
        if (this.planList.find(ele => ele.id === 1).isSelect) {
          subTotal = subTotal + 24;
        }
        if (this.planList.find(ele => ele.id === 2).isSelect) {
          subTotal = subTotal * 2;
        }
        if (this.planList.find(ele => ele.id === 3).isSelect) {
          subTotal = subTotal * 1.5;
        }
        return subTotal;
      }
      return subTotal;
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1100) {
        this.introList.forEach(ele => {
          ele.forEach(ele1 => ele1.isContentOpen = true);
        });
      } else {
        this.introList.forEach(ele => {
          ele.forEach(ele1 => ele1.isContentOpen = false);
        });
      }
    },
    ClickTab(tab) {
      this.tabList.forEach(ele => {
        ele.isSelect = false;
      });
      this.tabList.find(ele => ele.text === tab.text).isSelect = true;
    },
    ToggleFaqContent(ele) {
      this.faqList.forEach(el => el.isContentOpen = false);
      ele.isContentOpen = !ele.isContentOpen;
    },
    BackToIntro() {
      this.isOrdering = false;
    },
    SubmitBasicInfo() {
      this.isOrdering = true;
      this.isBasicInfo = true;
      const el = this.$refs.searchLayout;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },
    // directly select date range on inline calendar
    SubmitDateSelect() {
      this.calenderClickTime += 1; // add calendar click time
      
      // content below calendar should display after calendar be clicked two times(satrtDate and endDate)
      this.isDateSelect = false;
      this.isTimeSelect = false;

      const el = this.$refs.timeSelect;
      if (el && this.selectedDate && this.calenderClickTime === 2) {
        this.calenderClickTime = 0; // reset calendar click time
        this.isDateSelect = true;
        this.selectedStartDate = this.selectedDate.split('至')[0].trim();
        this.selectedEndDate = this.selectedDate.split('至')[1].trim();
        this.selectedDateRange = moment(this.selectedEndDate).diff(moment(this.selectedStartDate), 'days') + 1;
        
        // reset selectd time
        this.selectedTime = '';
        this.timeList.forEach(ele => {
          ele.isSelect = false;
        });

        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },

    SubmitStartDate() {
      this.selectedDate = this.selectedStartDate;
      this.isDateSelect = true;
    },
    ToggleIntroContent(intro) {
      intro.isContentOpen = !intro.isContentOpen;
    },
    ToggleTimeCard(timeCard) {
      timeCard.isCardOpen = !timeCard.isCardOpen;
    },
    SubmitTimeSelect(clickTime) {
      this.selectedTime = clickTime;
      this.timeList.forEach(ele => {
        ele.isSelect = false;
      });
      this.timeList.find(ele => ele.time === clickTime.time).isSelect = true;
      this.isTimeSelect = true;
      
      //
      this.selectedDate = this.selectedStartDate + '至' + '2021-08-31'

      const el = this.$refs.bodyResult;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },
    MoreCard() {
      const el = this.$refs.moreCard;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },
    ToggleCardContent() {
      if (!this.isLightbox) { //open
        document.documentElement.style.overflow = "hidden";
      } else { //close
        document.documentElement.style.overflow = "auto";
        this.lightboxAmount = 1;
      }
      this.isLightbox = !this.isLightbox;
      
    },
    MinusLightboxAmount() {
      if ( this.lightboxAmount===0 ) return; 
      this.lightboxAmount -= 1;
    },
    PlusLightboxAmount() {
      this.lightboxAmount += 1
    },
    SubmitProjectSelect(project) {
      this.isProjectSelect = true;
      const el = this.$refs.checkLayout;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
          window.scrollTo(0,0);
        });
      }
      if (project) {
        this.moreCardInfoList.forEach(ele => {
          ele.isSelect = false;
        })
        this.selectedProject = this.moreCardInfoList.find(ele => ele.title === project.title);
        this.moreCardInfoList.find(ele => ele.title === project.title).isSelect = true;
        this.NextStep(1);
      }
    },
    ReselectProject() {
      this.isProjectSelect = false;
    },
    NextStep(toStep) {
      this.orderStep = {
        isStep1: false,
        isStep2: false,
        isStep3: false,
        isStep4: false,
      }
      this.orderStep[`isStep${toStep}`] = true;
    },
    LastStep(toStep) {
      this.orderStep = {
        isStep1: false,
        isStep2: false,
        isStep3: false,
        isStep4: false,
      }
      this.orderStep[`isStep${toStep}`] = true;
    },
    SelectPlan(plan) {
      // this.planList.forEach(ele => {
      //   ele.isSelect = false;
      // });
      this.planList.find(ele => ele.id === plan.id).isSelect = !this.planList.find(ele => ele.id === plan.id).isSelect;
    }
  }
});

vueInstance.component('flat-pickr', VueFlatpickr);
const app = vueInstance.mount("#app");




// flatpickr("#filter-calendar", {
//   inline: true,
//   mode: "range",
//   minDate: "today"
// });

// new Vue({
//   el: "#app",
//   data: {
//     isBasicInfo: false,
//     isDateSelect: false,
//     isTimeSelect: false,
//     timeList: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
//   },
//   methods: {
//     SubmitBasicInfo() {
//       this.isBasicInfo = true;
//       const el = this.$refs.searchLayout;
//       if (el) {
//         this.$nextTick(() => {
//           el.scrollIntoView({behavior: 'smooth'});
//         });
//       }
//     },
//     SubmitTimeSelect() {
//       this.isTimeSelect = true;
//       const el = this.$refs.bodyResult;
//       if (el) {
//         this.$nextTick(() => {
//           el.scrollIntoView({behavior: 'smooth'});
//         });
//       }
//     },
//     MoreCard() {
//       const el = this.$refs.moreCard;
//       if (el) {
//         this.$nextTick(() => {
//           el.scrollIntoView({behavior: 'smooth'});
//         });
//       }
//     }
//   }
// });