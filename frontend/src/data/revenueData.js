export const revenueData = {
  week: [
    { period: "Mon", revenue: 700, growth: 0 },
    { period: "Tue", revenue: 900, growth: 900 - 700 }, // 200
    { period: "Wed", revenue: 1200, growth: 1200 - 900 }, // 300
    { period: "Thu", revenue: 800, growth: 800 - 1200 }, // -400
    { period: "Fri", revenue: 1500, growth: 1500 - 800 }, // 700
    { period: "Sat", revenue: 1300, growth: 1300 - 1500 }, // -200
    { period: "Sun", revenue: 1700, growth: 1700 - 1300 }, // 400
  ],
  month: [
    { period: "Week 1", revenue: 4000, growth: 0 },
    { period: "Week 2", revenue: 4500, growth: 4500 - 4000 }, // 500
    { period: "Week 3", revenue: 4800, growth: 4800 - 4500 }, // 300
    { period: "Week 4", revenue: 5000, growth: 5000 - 4800 }, // 200
  ],
  year: [
    { period: "Jan", revenue: 12000, growth: 0 },
    { period: "Feb", revenue: 15000, growth: 15000 - 12000 },
    { period: "Mar", revenue: 18000, growth: 18000 - 15000 },
    { period: "Apr", revenue: 20000, growth: 20000 - 18000 },
    { period: "May", revenue: 22000, growth: 22000 - 20000 },
    { period: "Jun", revenue: 25000, growth: 25000 - 22000 },
    { period: "Jul", revenue: 23000, growth: 23000 - 25000 },
    { period: "Aug", revenue: 24000, growth: 24000 - 23000 },
    { period: "Sep", revenue: 26000, growth: 26000 - 24000 },
    { period: "Oct", revenue: 28000, growth: 28000 - 26000 },
    { period: "Nov", revenue: 30000, growth: 30000 - 28000 },
    { period: "Dec", revenue: 32000, growth: 32000 - 30000 },
  ],
};
