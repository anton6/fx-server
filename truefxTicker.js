'use strict'

const apiConfig = require('./apiConfig')
const request = require("request")
const R = require('ramda')

const NAME_SPACE = '/rates';
const ROOM_TRUEFX = 'truefx';
const EVENT_NAME_TRUEFX = 'truefx_tick';

module.exports = function (io) {
  const nsp = io.of(NAME_SPACE);

  nsp.on('connection', function(socket) {
    socket.on('join', function(room) {
      socket.join(room);
    });

    socket.on('leave', function(room) {
      socket.leave(room);
    });
  });

  setInterval(function () {
    const numOfConnected = R.defaultTo({length: 0}, nsp.adapter.rooms[ROOM_TRUEFX]).length
    if(numOfConnected) {
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
        nsp.in(ROOM_TRUEFX).emit(EVENT_NAME_TRUEFX, parseBody(body));
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