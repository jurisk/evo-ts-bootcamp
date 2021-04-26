You should create an application using CRA. After the application is created do the following steps:
- [ ] to install [redux package](https://www.npmjs.com/package/redux). 
- [ ] to configure [redux dev tools](https://github.com/reduxjs/redux-devtools)

You don't have to implement any UI but if you wish to do it you can as well.
The purpose is to implement a reducer which supports the following actions:
```
/**
 * Should plus payload amount to balance
 */
{ type: "UPDATE_BALANCE", payload: amount }

/**
 * Should minus payload amount from balance
 */
{ type: "DEBIT", payload: 2.0 }

/**
 * Should plus payload amount to balance
 */
{ type: "CREDIT", payload: 2.0 }

/**
 * Should return amount in which TAX is deducted
 */
{ type: "GET_BALANCE_WITH_TAX", payload: 14.0 }
```

List of actions which will be passed to dispatch
```
const array = [
    { type: "UPDATE_BALANCE", payload: 1000.0 },
    { type: "CREDIT", payload: 200.0 },
    { type: "CREDIT", payload: 100.0 },
    { type: "GET_BALANCE_WITHOUT_TAX" },
    { type: "DEBIT", payload: 250.0 },
    { type: "UPDATE_BALANCE", payload: 1000.0 },
];
```

It will be checked only using Redux dev tools where I am able to see list of actions.
