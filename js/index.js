const vueInstance = Vue.createApp({
  data() {
    return {
      tabList: [
        { text: '快速預約', isSelect: true },
        // { text: '雙人快清', isSelect: false },
        { text: '加入會員', isSelect: false },
        // { text: '定期享優惠', isSelect: false },
      ],
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
      selectedProject: {},
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
      calendarConfig: {
        inline: true,
        mode: "range",
        minDate: "today",
        locale: "zh_tw",
      }
    }
  },

  computed: {
    subTotal() {
      if (this.selectedDateRange && this.selectedTime && this.selectedProject) {
        return (this.selectedDateRange * 24 + this.selectedTime.hour + this.selectedProject.hour);
      }
      return 0;
    },
    totalHour() {
      let subTotal = 0;
      if (this.selectedDateRange && this.selectedTime && this.selectedProject) {
        subTotal = (this.selectedDateRange * 24 + this.selectedTime.hour + this.selectedProject.hour);
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
    ClickTab(tab) {
      this.tabList.forEach(ele => {
        ele.isSelect = false;
      });
      this.tabList.find(ele => ele.text === tab.text).isSelect = true;
    },
    SubmitBasicInfo() {
      this.isBasicInfo = true;
      const el = this.$refs.searchLayout;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },
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