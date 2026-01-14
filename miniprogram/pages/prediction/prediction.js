Page({
  data: {
    games: [],
    props: []
  },

  onLoad() {
    this.fetchPredictions();
  },

  fetchPredictions() {
    // Simulate complex calculation
    setTimeout(() => {
      this.setData({
        games: [
          {
            id: 1,
            time: '明天 08:30',
            type: '常规赛',
            home: { name: 'BOS', logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg' },
            away: { name: 'MIA', logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg' },
            home_prob: 68
          },
          {
            id: 2,
            time: '明天 11:00',
            type: '焦点战',
            home: { name: 'LAL', logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
            away: { name: 'GSW', logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' },
            home_prob: 52
          }
        ],
        props: [
          { 
            id: 101, 
            player: 'LeBron James', 
            headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
            condition: '得分 > 25.5', 
            prob: 75 
          },
          { 
            id: 102, 
            player: 'Stephen Curry', 
            headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
            condition: '三分命中 > 4.5', 
            prob: 62 
          }
        ]
      });
    }, 500);
  }
});
