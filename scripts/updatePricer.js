const helpers = require("./helpers/getGasPrice")
const yargs = require('yargs')
const ethers = require('ethers')

const Pricer = artifacts.require('ChainLinkPricer.sol')
const Aggregator = artifacts.require('AggregatorInterface.sol')
const { parseUnits } = ethers.utils
const { getGasPrice } = helpers

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('pricer', {describe: 'Pricer address', type: 'string', demandOption: true}).argv

    console.log(`Executing transaction on ${options.network} 🍕`)
      
    let gasPrice;
    if (options.network === "mainnet") {
      gasPrice = (await getGasPrice()).add(parseUnits("20", "gwei"));
    } else {
      gasPrice = parseUnits("20", "gwei");
    }
    const pricer = await Pricer.at(options.pricer)
    const aggregatorAddress = await pricer.aggregator()
    const aggregator = await Aggregator.at(aggregatorAddress)

    const today = new Date();   
    const nowUtc =  new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds()));
    nowUtc.setUTCHours(8)
    nowUtc.setUTCMinutes(5)
    nowUtc.setUTCSeconds(0)
    
    let round = await aggregator.latestRoundData()
    while(parseFloat(round.startedAt) < parseFloat(Date.parse(nowUtc) / 1000)) {
      round = await aggregator.latestRoundData()
      await new Promise(resolve => setTimeout(resolve, 60000));
    }

    nowUtc.setUTCMinutes(0)
    const tx = await pricer.setExpiryPriceInOracle(Date.parse(nowUtc) / 1000, round.roundId, {gasPrice: gasPrice, gasLimit: 1000000})
    
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
