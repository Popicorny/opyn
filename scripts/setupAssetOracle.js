const yargs = require('yargs')

const ChainlinkPricer = artifacts.require('ChainlinkPricer.sol')
const Oracle = artifacts.require('Oracle.sol')

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage(
        'Usage: --network <network> --oracle <oracle> --asset <asset> --pricer <pricer> --stable <stable> --gasPrice <gasPrice> --gasLimit <gasLimit>',
      )
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('oracle', {describe: 'Oracle module address', type: 'string', demandOption: true})
      .option('asset', {describe: 'Asset address', type: 'string', demandOption: true})
      .option('pricer', {describe: 'Pricer address', type: 'string', demandOption: true})
      .option('stable', {describe: 'Stable address', type: 'string', demandOption: false})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false})
      .option('gasLimit', {describe: 'Gas Limit in WEI', type: 'string', demandOption: false}).argv

    console.log(`Configuring oracle setup on ${options.network} 🍕`)

    const chainlinkPricer = await ChainlinkPricer.at(options.pricer)
    const oracle = await Oracle.at(options.oracle)

    // set up the oracle
    // deply mock pricer (to get live price and set expiry price)
    // await oracle.setAssetPricer(options.asset, options.pricer)

    const lockingPeriod = 300 // Lock 5 minutes. Will wait 5 minutes then receive price update
    const disputePeriod = 7200 // Dispute 120 minutes. After price submitted by pricer, dispute period when disputer can come in to override
    // After dispute period, all price finalized
   //  await oracle.setLockingPeriod(options.pricer, lockingPeriod)
   //  await oracle.setDisputePeriod(options.pricer, disputePeriod)

    // set USDC stable price in oracle
    if(options.stable){
      await oracle.setStablePrice(options.stable, "100000000")
    }

    callback()
  } catch (err) {
    callback(err)
  }
}
