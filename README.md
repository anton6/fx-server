Exampe of Simple Server to obtain Exchange Rates from TrueFX Market Data Web API.

Unauthenticated sessions can access the following currency pairs:
- EUR/USD 
- USD/JPY
- GBP/USD
- EUR/GBP
- USD/CHF
- EUR/JPY
- EUR/CHF
- USD/CAD
- AUD/USD
- GBP/JPY

The server uses rooms per provider to emit data (in case additional fx providers need to be added in future).

```Shell
  npm i && npm start
```

[Client App](https://github.com/anton6/trufx-client)
