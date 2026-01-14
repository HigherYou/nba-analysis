const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const { date, type } = event
  const queryDate = date || new Date().toISOString().split('T')[0]
  
  const _ = db.command
  const query = {
    date: queryDate
  }
  
  if (type === 'live') {
    query.status = _.in(['Live', 'Scheduled']) // 只查未结束的
  }

  try {
    const res = await db.collection('matches')
      .where(query)
      .get()
    
    return {
      data: res.data
    }
  } catch (e) {
    return {
      error: e
    }
  }
}
