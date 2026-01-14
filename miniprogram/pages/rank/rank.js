Page({
  data: {
    currentCat: 'pts',
    currentCatName: '得分',
    triggered: false,
    categories: [
      { key: 'pts', name: '得分' },
      { key: 'reb', name: '篮板' },
      { key: 'ast', name: '助攻' },
      { key: 'ts_pct', name: '真实命中率' },
      { key: 'per', name: '效率值(PER)' },
      { key: 'ws', name: '胜利贡献(WS)' },
      { key: 'usg', name: '使用率' }
    ],
    rankList: []
  },

  onLoad() {
    this.fetchRankings();
  },

  switchCategory(e) {
    const key = e.currentTarget.dataset.key;
    const cat = this.data.categories.find(c => c.key === key);
    this.setData({ 
      currentCat: key, 
      currentCatName: cat.name,
      rankList: [] // Clear list for loading state
    });
    this.fetchRankings();
  },

  onRefresh() {
    this.fetchRankings().then(() => {
      this.setData({ triggered: false });
    });
  },

  fetchRankings() {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = this.generateMockData(this.data.currentCat);
        this.setData({ rankList: mockData });
        resolve();
      }, 500);
    });
  },

  generateMockData(cat) {
    // 2023-24 赛季得分榜真实数据
    const players = [
      { id: 1629029, name: 'Luka Doncic', team: 'DAL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png', value: 33.9 },
      { id: 203507, name: 'Giannis Antetokounmpo', team: 'MIL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png', value: 30.4 },
      { id: 1628983, name: 'Shai Gilgeous-Alexander', team: 'OKC', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png', value: 30.1 },
      { id: 203954, name: 'Joel Embiid', team: 'PHI', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png', value: 34.7 }, // Note: Embiid played fewer games but avg is high
      { id: 1628378, name: 'Donovan Mitchell', team: 'OKC', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628378.png', value: 26.6 },
      { id: 201142, name: 'Kevin Durant', team: 'PHX', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png', value: 27.1 },
      { id: 1628369, name: 'Jayson Tatum', team: 'BOS', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png', value: 26.9 },
      { id: 1629027, name: 'Trae Young', team: 'ATL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629027.png', value: 25.7 },
      { id: 201939, name: 'Stephen Curry', team: 'GSW', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png', value: 26.4 },
      { id: 1627750, name: 'Jamal Murray', team: 'ATL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627750.png', value: 21.2 }
    ];

    // 简单模拟其他分类数据变化，实际应从API获取
    if (cat === 'ast') {
        // 助攻榜模拟
        return players.map(p => ({ ...p, value: (Math.random() * 5 + 5).toFixed(1) })).sort((a, b) => b.value - a.value);
    }

    return players.sort((a, b) => b.value - a.value);
  },

  goToPlayer(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/player-detail/player-detail?id=${id}`
    });
  }
});
