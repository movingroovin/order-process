const vueInstance = Vue.createApp({
  data() {
    return {
      tabList: [
        { text: '快速預約', isSelect: true },
        { text: '雙人快清', isSelect: false },
        { text: '指定人員', isSelect: false },
        { text: '定期享優惠', isSelect: false },
      ],
      isBasicInfo: false,
      isDateSelect: false,
      isTimeSelect: false,
      selectedDate: '',
      selectedStartDate: '',
      selectedEndDate: '',
      calenderClickTime: 0,
      selectedTime: '',
      timeList: [
        { time: '08:00', isSelect: false },
        { time: '09:00', isSelect: false },
        { time: '10:00', isSelect: false },
        { time: '11:00', isSelect: false },
        { time: '12:00', isSelect: false },
        { time: '13:00', isSelect: false },
        { time: '14:00', isSelect: false },
        { time: '15:00', isSelect: false },
        { time: '16:00', isSelect: false },
        { time: '17:00', isSelect: false },
        { time: '18:00', isSelect: false },
        { time: '19:00', isSelect: false },
        { time: '20:00', isSelect: false },
        { time: '21:00', isSelect: false },
      ],
      calendarConfig: {
        inline: true,
        mode: "range",
        minDate: "today",
        locale: "zh_tw",
      }
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
    SubmitTimeSelect(clickTime) {
      this.selectedTime = clickTime.time;
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