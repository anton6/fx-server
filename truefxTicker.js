'use strict'

const apiConfig = require('./apiConfig')
const request = require("request")
const R = require('ramda')

const NAME_SPACE = '/truefx';

module.exports = function (io) {
  const nsp = io.of(NAME_SPACE);
  setInterval(function () {
    const nspSockets = io.of(NAME_SPACE).sockets;
    const totalNspSessions = Object.keys(nspSockets).length;
    
    if(totalNspSessions > 0) {
      requestFXprices(nsp)
    }
  }, 1000)

  const { api, parameters } = apiConfig.truefx
  const { format, currPairs } = parameters
  const query = `${format.k}=${format.v}&${currPairs.k}=${currPairs.v}`
  const unauthUrl = `${api}?${query}`

  function requestFXprices(nsp){
    request(unauthUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
        nsp.emit('message', parseBody(body))
      } else if(error){
        console.error ("ERROR status code : " + error)
      }
    })
  }

  const parseBody = R.compose(
    R.map(val => ({
      currencyPair: val[0],
      timestamp: parseInt(val[1]),
      bidBig: val[2],
      bidPoints: val[3],
      offerBig: val[4],
      offerPoints: val[5],
      high: val[6],
      low: val[7],
      open: val[8]
    })),
    R.reject(val => val.length < 8),
    R.map(val => R.split(',', val)),
    R.split('\n')
  )
}