import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    currentTab: 'team',
    ecScatter: { lazyLoad: true },
    topPlayers: []
  },

  onLoad() {
    this.initScatterChart();
    this.fetchTopPlayers();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    if (tab === 'team') {
      // Re-init chart if needed or use hidden logic
      this.initScatterChart();
    }
  },

  initScatterChart() {
    this.scatterComponent = this.selectComponent('#team-scatter');
    if (!this.scatterComponent) return;

    this.scatterComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      
      const data = [
        { name: 'BOS', value: [120.5, 110.2], itemStyle: { color: '#007A33' } },
        { name: 'LAL', value: [112.5, 114.0], itemStyle: { color: '#552583' } },
        { name: 'GSW', value: [115.5, 116.0], itemStyle: { color: '#1D428A' } }
      ];

      const option = {
        backgroundColor: '#1E1E1E',
        tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>Off: {c0}<br/>Def: {c1}'
        },
        xAxis: { 
            name: '进攻效率', 
            min: 100, 
            splitLine: { show: false }, 
            axisLine: { lineStyle: { color: '#888' } },
            axisLabel: { color: '#ccc' }
        },
        yAxis: { 
            name: '防守效率', 
            min: 100, 
            splitLine: { show: false }, 
            axisLine: { lineStyle: { color: '#888' } },
            axisLabel: { color: '#ccc' }
        },
        series: [{
          type: 'scatter',
          data: data,
          label: { show: true, formatter: '{b}', position: 'top', color: '#fff' },
          symbolSize: 20
        }]
      };
      
      chart.setOption(option);
      return chart;
    });
  },

  fetchTopPlayers() {
    // 模拟数据，实际应调用 getRankings 云函数
    const mockPlayers = [
        { id: 1, name_cn: '杜兰特', team_name: '太阳', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png', ts_pct: 65.4 },
        { id: 2, name_cn: '库里', team_name: '勇士', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png', ts_pct: 64.1 }
    ];
    this.setData({ topPlayers: mockPlayers });
    
    /*
    wx.cloud.callFunction({
      name: 'getRankings',
      data: { category: 'ts_pct', limit: 5 }
    }).then(res => {
      this.setData({ topPlayers: res.result });
    });
    */
  },

  goToDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: `/pages/player-detail/player-detail?id=${id}`
      });
  }
});
