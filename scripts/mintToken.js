const yargs = require('yargs')

const Token = artifacts.require('MockERC20.sol')

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network> --token <token> --gasPrice <gasPrice>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('token', {describe: 'Token contract address', type: 'string', demandOption: true})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv

    console.log(`Executing transaction on ${options.network} 🍕`)

    const token = await Token.at(options.token)

    const tx = await token.mint('0xd65074D8a1951ECF20D852d1A64F49596A7c8104', '100000000000000000000', {gasPrice: options.gasPrice})

    console.log('Done! 🎉')
    console.log(
      `At TX hash ${tx.tx}`,
    )

    callback()
  } catch (err) {
    callback(err)
  }
}
