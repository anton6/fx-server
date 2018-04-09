module.exports = {
  truefx: {
    api: 'http://webrates.truefx.com/rates/connect.html',
    parameters: {
      username: {
        k: 'u',
        v: null
      },
      password: {
        k: 'p',
        v: null
      },
      format: {
        k: 'f',
        v: 'csv'
      },
      currPairs: {
        k: 'c',
        v: 'EUR/USD,USD/JPY,GBP/USD,EUR/GBP,USD/CHF,EUR/JPY,EUR/CHF,USD/CAD,AUD/USD,GBP/JPY'
      }
    }
  }
}