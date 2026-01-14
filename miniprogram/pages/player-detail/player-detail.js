import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    ecRadar: { lazyLoad: true },
    player: {
      name_cn: 'Loading...',
      stats: {}
    }
  },

  onLoad(options) {
    const playerId = options.id;
    this.fetchPlayerDetail(playerId);
  },

  fetchPlayerDetail(id) {
    // 模拟数据
    const mockData = {
      id: id || 1,
      name_cn: '凯文·杜兰特',
      jersey: '35',
      position: 'F',
      team_name: 'PHX',
      headshot_url: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
      stats: {
        pts_pg: 28.5,
        reb_pg: 6.7,
        ast_pg: 5.5,
        per: 24.2,
        ts_pct: 65.4,
        usg_pct: 31.0
      },
      radar: [95, 80, 75, 60, 90, 85] // 攻, 防, 传, 板, 投, 效
    };

    this.setData({ player: mockData });
    this.initRadarChart(mockData.radar);
  },

  initRadarChart(dataValues) {
    this.radarComponent = this.selectComponent('#ability-radar');
    if (!this.radarComponent) return;

    this.radarComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      
      const option = {
        backgroundColor: '#1E1E1E',
        radar: {
          indicator: [
            { name: '进攻', max: 100 },
            { name: '防守', max: 100 },
            { name: '组织', max: 100 },
            { name: '篮板', max: 100 },
            { name: '投射', max: 100 },
            { name: '效率', max: 100 }
          ],
          shape: 'circle',
          splitNumber: 4,
          axisName: { color: '#ccc' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: dataValues || [80, 80, 80, 80, 80, 80],
              name: 'Ability',
              areaStyle: { color: 'rgba(201, 8, 42, 0.4)' },
              lineStyle: { color: '#C9082A' },
              itemStyle: { color: '#C9082A' }
            }
          ]
        }]
      };

      chart.setOption(option);
      return chart;
    });
  }
});
