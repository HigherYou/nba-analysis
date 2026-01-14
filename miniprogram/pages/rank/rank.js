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
    // Generate some dummy data based on category
    const players = [
      { id: 203999, name: 'Nikola Jokic', team: 'DEN', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png' },
      { id: 203507, name: 'Giannis Antetokounmpo', team: 'MIL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png' },
      { id: 1629029, name: 'Luka Doncic', team: 'DAL', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png' },
      { id: 201939, name: 'Stephen Curry', team: 'GSW', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png' },
      { id: 1628369, name: 'Jayson Tatum', team: 'BOS', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png' }
    ];

    return players.map(p => ({
      ...p,
      value: (Math.random() * 20 + 10).toFixed(1) // Random value 10-30
    })).sort((a, b) => b.value - a.value);
  },

  goToPlayer(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/player-detail/player-detail?id=${id}`
    });
  }
});
