const app = getApp();

Page({
  data: {
    matches: [],
    todayDate: '',
    triggered: false
  },

  onLoad() {
    const today = new Date().toISOString().split('T')[0];
    this.setData({ todayDate: today });
    this.loadMatches();
  },

  onRefresh() {
    this.loadMatches().then(() => {
      this.setData({ triggered: false });
    });
  },

  loadMatches() {
    wx.showLoading({ title: 'Loading...' });
    
    // 优先调用云函数，这里模拟 fallback
    return wx.cloud.callFunction({
      name: 'fetchMatches',
      data: { date: this.data.todayDate }
    }).then(res => {
      let matches = res.result.data;
      if (!matches || matches.length === 0) {
        // Mock data if DB is empty
        matches = [
            {
                gameId: "0022300001",
                status: "Live",
                period: { current: 4, clock: "02:35" },
                home_team: { name: "Lakers", score: 115, win: true, logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
                away_team: { name: "Warriors", score: 109, win: false, logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' },
                broadcasters: "ESPN"
            },
            {
                gameId: "0022300002",
                status: "Final",
                period: { current: 4, clock: "00:00" },
                home_team: { name: "Celtics", score: 120, win: true, logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg' },
                away_team: { name: "Bucks", score: 105, win: false, logo: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg' }
            },
            {
                gameId: "0022300003",
                status: "Final",
                period: { current: 4, clock: "00:00" },
                home_team: { name: "Suns", score: 112, win: false, logo: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg' },
                away_team: { name: "Clippers", score: 115, win: true, logo: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg' }
            },
            {
                gameId: "0022300004",
                status: "Scheduled",
                time: "10:30",
                home_team: { name: "Nuggets", score: "-", win: false, logo: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg' },
                away_team: { name: "Heat", score: "-", win: false, logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg' },
                broadcasters: "TNT"
            }
        ];
      }
      this.setData({ matches });
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
      // Use mock data on error for demo
      const matches = [
        {
            gameId: "001",
            status: "Live",
            period: { current: 4, clock: "02:35" },
            home_team: { name: "Lakers", score: 115, win: true, logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
            away_team: { name: "Warriors", score: 109, win: false, logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' },
            broadcasters: "ESPN"
        }
      ];
      this.setData({ matches });
    });
  },

  switchDate(e) {
    // 简化版日期切换，实际需处理日期加减
    wx.showToast({ title: 'Date switch clicked', icon: 'none' });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`
    });
  }
});
