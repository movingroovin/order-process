flatpickr("#filter-calendar", {
  inline: true,
  mode: "range",
  minDate: "today"
});

new Vue({
  el: "#app",
  data: {
    isBasicInfo: false,
    isDateSelect: false,
    isTimeSelect: false,
    timeList: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
  },
  methods: {
    SubmitBasicInfo() {
      this.isBasicInfo = true;
      const el = this.$refs.searchLayout;
      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({behavior: 'smooth'});
        });
      }
    },
    SubmitTimeSelect() {
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