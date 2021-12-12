const BigNumber = require('bignumber.js')
const yargs = require('yargs')
const ethers = require("ethers");

const Controller = artifacts.require('Controller.sol')
const Erc20 = artifacts.require('MockOtoken.sol')
const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

module.exports = async function(callback) {
  try {
    const options = yargs
      .usage('Usage: --network <network> --controller <controller> --otoken <otoken> --gasPrice <gasPrice>')
      .option('network', {describe: 'Network name', type: 'string', demandOption: true})
      .option('controller', {describe: 'Controller proxy contract address', type: 'string', demandOption: true})
      .option('otoken', {describe: 'Otoken contract address', type: 'string', demandOption: true})
      .option('gasPrice', {describe: 'Gas price in WEI', type: 'string', demandOption: false}).argv

    // strike normally is usdc
    // collateral usdc = put 
    // collateral underlying = call
    console.log(`Executing transaction on ${options.network} 🍕`)

    // const signer = ethers.Wallet.fromMnemonic(mnemonic, path);
    const redeemer = "0xd65074D8a1951ECF20D852d1A64F49596A7c8104"
    
    const erc20 = await Erc20.at(options.otoken)
    const balance =  await erc20.balanceOf(redeemer)
    const controllerProxy = await Controller.at(options.controller)

    const actionArgs = [
      {
        actionType: 8,
        owner: ZERO_ADDR,
        secondAddress: redeemer,
        asset: options.otoken,
        amount: '200000000',
        vaultId: '0',
        index: '0',
        data: ZERO_ADDR
      },
    ]
    // const tx1 = await controllerProxy.setOperator("0xd65074D8a1951ECF20D852d1A64F49596A7c8104", true, { gasPrice: "20000000000" })
    // console.log(tx1.tx)
    
    const tx = await controllerProxy.operate(actionArgs, { from: redeemer, gasPrice: "20000000000" })

    /*
    const provider = new ethers.providers.JsonRpcProvider('')
    const signer = ethers.Wallet.fromMnemonic("", "m/44'/60'/0'/0/0")

    var tx = {
      to: options.controller,
      data: program.data,
      gasPrice: gasPrice,
      gasLimit: 700000,
      // nonce: count
    }
    const signed = await signer.signTransaction(tx)
    const signedTx = await provider.sendTransaction(signed)
    console.log(signedTx.hash)
    console.log('Done! 🎉')
    */
    console.log(
      `Redeemed OTOKEN at TX hash ${tx.tx}`,
    )

    callback()
  } catch (err) {
    console.log(err)
    callback(err)
  }
}
