const io = require('socket.io')();
io.listen(8000);
require('./truefxTicker')(io);