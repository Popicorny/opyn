const helpers = require("./helpers/getGasPrice")
const yargs = require('yargs')
const ethers = require('ethers')

const Oracle = artifacts.require('Oracle.sol')
const { parseUnits } = ethers.utils
const { getGasPrice } = helpers

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('oracle', {describe: 'Oracle address', type: 'string', demandOption: true}).argv

    console.log(`Executing transaction on ${options.network} 🍕`)
      
    let gasPrice;
    if (options.network === "mainnet") {
      gasPrice = (await getGasPrice()).add(parseUnits("20", "gwei"));
    } else {
      gasPrice = parseUnits("20", "gwei");
    }
    const oracle = await Oracle.at(options.oracle)
    
    console.log((await oracle.isDisputePeriodOver('0xB875937e75dB003F1E43d0733173E642A1f65d45', '1639555500')).toString())
    console.log((await oracle.isDisputePeriodOver('0xcbD2c857c1ab9C4A31Ed7bf05713625C8EF8ef04', '1639555500')).toString())
    console.log((await oracle.isDisputePeriodOver('0xB875937e75dB003F1E43d0733173E642A1f65d45', '1639555500')).toString())
    console.log((await oracle.getExpiryPrice('0xB875937e75dB003F1E43d0733173E642A1f65d45', '1639555500'))[0].toString())

    /*
    oracle.isDisputePeriodOver(_underlying, _expiry) &&
    oracle.isDisputePeriodOver(_strike, _expiry) &&
    oracle.isDisputePeriodOver(_collateral, _expiry);
    */
    // console.log((await oracle.pricerDisputePeriod('0xB875937e75dB003F1E43d0733173E642A1f65d45', '1639123200')).toString())

    callback()
  } catch (err) {
    console.log(err)
    callback(err)
  }
}
