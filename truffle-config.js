require('ts-node/register')
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://kovan.infura.io/ws/v3/${process.env.key}`),
      network_id: 42,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gasPrice: 10000000000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `https://rinkeby.infura.io/v3/${process.env.key}`),
      network_id: 4,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gasPrice: 100000000000,
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://ropsten.infura.io/ws/v3/${process.env.key}`),
      network_id: 3,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gasPrice: 100000000000,
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://kovan.infura.io/ws/v3/${process.env.key}`),
      // provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${process.env.key}`),
      network_id: 42,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gasPrice: 10000000000,
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://mainnet.infura.io/ws/v3/${process.env.key}`),
      // provider: () => new HDWalletProvider(process.env.mnemonic, `https://mainnet.infura.io/v3/${process.env.key}`),
      network_id: 1,
      // chain_id: 1,
      confirmations: 2,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gasPrice: 100000000000,
    },
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      artifactType: 'truffle-v5',
      coinmarketcap: process.env.COINMARKETCAP_API,
      excludeContracts: ['Migrations'],
      showTimeSpent: true,
    },
  },

  plugins: ['solidity-coverage', 'truffle-contract-size', 'truffle-plugin-verify'],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },

  compilers: {
    solc: {
      version: '0.6.10',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
