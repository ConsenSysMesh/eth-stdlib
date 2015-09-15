# Ethereum Standard Library

A standard contract library for Ethereum. 

### Use

All contracts contained in the library have two forms: 

  1. Full Solidity contract code, in `./contracts`; and,
  2. Abstract "header" files, which only include function signatures.

Depending on your project you'll need to use both. Import the full Solidity code into your contract when you need to extend one of the Standard Library classes or you need to put a new instance of that class on the blockchain; import the contract header file when you only need to make calls on an Standard Library class that already exists on the blockchain.

### Contributing

Contributing classes to the Standard Library is easy. 

  1. Write your contract you'd like to include.
  2. Drop that contract into the `./contracts` directory.
  3. Compile the contract with `truffle compile`. [Get Truffle.](https://github.com/ConsenSys/truffle)
  4. Run `./make_headers.es6` to remake all the header files automatically, which includes a header file for the contract you just added.
  4. Add tests for your contract in `./test`
  5. Make sure the tests pass with `truffle test`
  6. Submit a [pull request](https://github.com/ConsenSys/eth-stdlib/pulls) with your new changes!