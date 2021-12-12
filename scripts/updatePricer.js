const yargs = require('yargs')

const Token = artifacts.require('ChainLinkPricer.sol')

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv

    console.log(`Executing transaction on ${options.network} 🍕`)

    const token = await Token.at('0xA1198a6397C22A4fDC5CA3EeeF3bBb2a7eFAD5C6')

    const tx = await token.setExpiryPriceInOracle('1639036800', '36893488147419111578', {gasPrice: options.gasPrice})
  
    console.log('Done! 🎉')
    console.log(
      `At TX hash ${tx.tx}`,
    )

    callback()
  } catch (err) {
    console.log(err)
    callback(err)
  }
}
