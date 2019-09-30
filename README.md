# Sample mobile app with ionic angular
Bank account listing, new account opening and transactions.

## Set up
run `npm install` to install the project dependencies.

run `ionic serve` to run the project locally.

run `npm run test` to execute unit testing.

## The API
The API’s are based on firebase email authentication as well as REST access to the Firebase Realtime database. 
### Angular firebase references:
- https://github.com/angular/angularfire2 
- https://angularfirebase.com/

## Accounts listing
List of accounts with name, balance amount and transaction link.

## Create account
Open new account should post a new account object to the accounts collection and linked to the logged in user.
```
  New account object
  {
    accountNumer: this.item.accountNumer,
    firstName: this.item.firstName,
    lastName: this.item.lastName,
    age: this.item.age,
    overdraft: this.item.overdraft,
    minBalance: this.item.minBalance,
    balance: this.accountBalanceUpdated(value)
  }
```

### Deposit and withdrawal transactions
Deposits and withdrawals should update the accounts balance.
