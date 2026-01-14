const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // 1. 请求第三方实时接口 (示例URL)
  // 建议申请腾讯体育API或免费的 rapidapi
  // 此处使用模拟数据或替换为真实API
  const apiUrl = `https://api.example.com/nba/games?date=${today}`;
  
  try {
    // const res = await axios.get(apiUrl);
    // const games = res.data.games;
    
    // 模拟数据
    const games = [
        {
            gameId: "0022300001",
            status: "Live",
            period: 4,
            clock: "02:35",
            hTeam: { score: 115, name: "Lakers" },
            vTeam: { score: 109, name: "Warriors" }
        }
    ];

    if (!games || games.length === 0) return { msg: 'No games today' };

    // 2. 批量写入/更新数据库
    const tasks = games.map(game => {
      return db.collection('matches').doc(game.gameId).set({
        data: {
          date: today,
          status: game.status, // "Live", "Final"
          period: {
            current: game.period,
            clock: game.clock
          },
          home_team: {
            score: game.hTeam.score,
            name: game.hTeam.name
          },
          away_team: {
            score: game.vTeam.score,
            name: game.vTeam.name
          },
          update_time: db.serverDate()
        }
      })
    });

    await Promise.all(tasks);
    return { updated: games.length };
  } catch (e) {
    return { error: e.message }
  }
}
