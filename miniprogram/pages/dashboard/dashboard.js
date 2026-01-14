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
      
      // 基于 2023-24 赛季真实数据 (进攻效率 vs 防守效率)
      // 数据来源: NBA.com Advanced Stats
      const data = [
        { name: 'BOS', value: [122.2, 110.6], itemStyle: { color: '#007A33' } }, // 凯尔特人
        { name: 'OKC', value: [118.3, 111.0], itemStyle: { color: '#007AC1' } }, // 雷霆
        { name: 'DEN', value: [117.8, 112.3], itemStyle: { color: '#FEC524' } }, // 掘金
        { name: 'LAC', value: [117.9, 114.6], itemStyle: { color: '#C8102E' } }, // 快船
        { name: 'MIL', value: [117.6, 115.0], itemStyle: { color: '#00471B' } }, // 雄鹿
        { name: 'PHX', value: [116.8, 113.7], itemStyle: { color: '#1D1160' } }, // 太阳
        { name: 'LAL', value: [115.4, 114.8], itemStyle: { color: '#552583' } }, // 湖人
        { name: 'GSW', value: [116.9, 114.5], itemStyle: { color: '#1D428A' } }, // 勇士
        { name: 'MIN', value: [114.6, 108.4], itemStyle: { color: '#236192' } }, // 森林狼 (防守第一)
        { name: 'IND', value: [120.5, 117.6], itemStyle: { color: '#FDBB30' } }  // 步行者 (进攻极强)
      ];

      const option = {
        backgroundColor: '#1E1E1E',
        tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>Off: {c0}<br/>Def: {c1}'
        },
        grid: { left: '10%', right: '10%', top: '15%', bottom: '10%' },
        xAxis: { 
            name: '进攻效率', 
            min: 105, 
            max: 125,
            splitLine: { show: true, lineStyle: { color: '#333', type: 'dashed' } }, 
            axisLine: { lineStyle: { color: '#888' } },
            axisLabel: { color: '#ccc' }
        },
        yAxis: { 
            name: '防守效率 (越低越好)', 
            min: 105, 
            max: 120,
            inverse: true, // 防守效率越低越好，所以反转Y轴
            splitLine: { show: true, lineStyle: { color: '#333', type: 'dashed' } }, 
            axisLine: { lineStyle: { color: '#888' } },
            axisLabel: { color: '#ccc' }
        },
        series: [{
          type: 'scatter',
          data: data,
          label: { show: true, formatter: '{b}', position: 'top', color: '#fff', fontSize: 10 },
          symbolSize: 15,
          markLine: {
            silent: true,
            lineStyle: { type: 'solid', color: '#666' },
            data: [
                { xAxis: 115 }, // 联盟平均进攻
                { yAxis: 114 }  // 联盟平均防守
            ]
          }
        }]
      };
      
      chart.setOption(option);
      return chart;
    });
  },

  fetchTopPlayers() {
    // 真实命中率 (TS%) Top 5 - 2023-24 Season (Minimum 50 Games)
    const mockPlayers = [
        { id: 203507, name_cn: '扬尼斯·阿德托昆博', team_name: '雄鹿', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png', ts_pct: 64.9 },
        { id: 203999, name_cn: '尼古拉·约基奇', team_name: '掘金', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png', ts_pct: 65.0 },
        { id: 1628983, name_cn: '谢伊·吉尔杰斯-亚历山大', team_name: '雷霆', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png', ts_pct: 63.6 },
        { id: 201142, name_cn: '凯文·杜兰特', team_name: '太阳', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png', ts_pct: 62.6 },
        { id: 201939, name_cn: '斯蒂芬·库里', team_name: '勇士', headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png', ts_pct: 61.6 }
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
