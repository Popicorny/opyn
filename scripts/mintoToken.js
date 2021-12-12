const yargs = require('yargs')

const Factory = artifacts.require('OtokenFactory.sol')

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network> --factory <factory> --underlying <underlying> --strike <strike> --collateral <collateral> --price <price> --expiry <expiry> --put <put> --gasPrice <gasPrice>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('factory', {describe: 'Factory contract address', type: 'string', demandOption: true})
      .option('underlying', {describe: 'Underlying contract address', type: 'string', demandOption: true})
      .option('strike', {describe: 'Strike contract address', type: 'string', demandOption: true})
      .option('collateral', {describe: 'Collateral contract address', type: 'string', demandOption: true})
      .option('price', {describe: 'Strike price', type: 'string', demandOption: true})
      .option('expiry', {describe: 'Expiry Date', type: 'string', demandOption: true})
      .option('put', {describe: 'Put or buy option', type: 'boolean', demandOption: true})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv

    // strike normally is usdc
    // collateral usdc = put 
    // collateral underlying = call
    console.log(`Executing transaction on ${options.network} 🍕`)

    const factory = await Factory.at(options.factory)
    const tx = await factory.createOtoken(options.underlying, options.strike, options.collateral, options.price, options.expiry, options.put, {gasPrice: options.gasPrice})
    
    console.log('Done! 🎉')
    console.log(
      `Created OTOKEN at TX hash ${tx.tx}`,
    )

    callback()
  } catch (err) {
    callback(err)
  }
}
