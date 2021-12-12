const yargs = require('yargs')

const Whitelist = artifacts.require('Whitelist.sol')

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network> --whitelist <whitelist> --underlying <underlying> --strike <strike> --collateral <collateral> -put <put> --gasPrice <gasPrice>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('whitelist', {describe: 'Whitelist contract address', type: 'string', demandOption: true})
      .option('underlying', {describe: 'Underlying contract address', type: 'string', demandOption: true})
      .option('strike', {describe: 'Strike contract address', type: 'string', demandOption: true})
      .option('collateral', {describe: 'Collateral contract address', type: 'string', demandOption: true})
      .option('put', {describe: 'Put or buy option', type: 'boolean', demandOption: true})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv

    // strike normally is usdc
    // whitelistProduct(address _underlying, address _strike, address _collateral, bool _isPut) (external)
    console.log(`Executing transaction on ${options.network} 🍕`)

    const whitelist = await Whitelist.at(options.whitelist)
    const checkCollateral = await whitelist.isWhitelistedCollateral(options.collateral, {gasPrice: options.gasPrice})

    if (!checkCollateral) { 
      await whitelist.whitelistCollateral(options.collateral, {gasPrice: options.gasPrice})
    }

    const tx = await whitelist.whitelistProduct(options.underlying, options.strike, options.collateral, options.put, {gasPrice: options.gasPrice})

    console.log('Done! 🎉')
    console.log(
      `Added whitelist product at TX hash ${tx.tx}`,
    )

    callback()
  } catch (err) {
    callback(err)
  }
}
