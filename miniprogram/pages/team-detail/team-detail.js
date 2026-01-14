Page({
  data: {
    team: {
      name_cn: 'Loading...',
      stats: {},
      best_lineup: { players: [] },
      roster: []
    }
  },

  onLoad(options) {
    // const teamId = options.id;
    this.fetchTeamDetail();
  },

  fetchTeamDetail() {
    // Mock Data
    const mockTeam = {
      id: 1610612747,
      name_cn: '洛杉矶湖人',
      logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
      record: '24-23',
      conference: 'West',
      rank: 9,
      win_pct: 51.1,
      stats: {
        off_rtg: 114.5,
        def_rtg: 115.2,
        net_rtg: -0.7,
        pace: 100.2
      },
      best_lineup: {
        players: [
          { name: 'Russell', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1626156.png' },
          { name: 'Reaves', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png' },
          { name: 'Prince', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627752.png' },
          { name: 'James', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png' },
          { name: 'Davis', headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png' }
        ],
        net_rtg: +12.5,
        min: 145
      },
      roster: [
        { id: 2544, name: 'LeBron James', jersey: '23', position: 'F', pts_pg: 24.8, headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png' },
        { id: 203076, name: 'Anthony Davis', jersey: '3', position: 'C', pts_pg: 24.9, headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png' }
      ]
    };

    setTimeout(() => {
      this.setData({ team: mockTeam });
    }, 500);
  },

  goToPlayer(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/player-detail/player-detail?id=${id}`
    });
  }
});
