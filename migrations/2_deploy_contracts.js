// import library
const MarginVault = artifacts.require('MarginVault')
// import contract
const OtokenFactory = artifacts.require('OtokenFactory')
const Otoken = artifacts.require('Otoken')
const Whitelist = artifacts.require('Whitelist')
const Oracle = artifacts.require('Oracle')
const MarginPool = artifacts.require('MarginPool')
const MarginCalculator = artifacts.require('MarginCalculator')
const AddressBook = artifacts.require('AddressBook')
const Controller = artifacts.require('Controller')
const ChainlinkPricer = artifacts.require('ChainlinkPricer.sol')

module.exports = async function(deployer, network, accounts) {
  const [deployerAddress] = accounts

  // deploy AddressBook & transfer ownership
  /*
  await deployer.deploy(AddressBook, {from: deployerAddress})
  const addressbook = await AddressBook.deployed()

  // deploy OtokenFactory & set address
  await deployer.deploy(OtokenFactory, addressbook.address, {from: deployerAddress})
  const otokenFactory = await OtokenFactory.deployed()

  await addressbook.setOtokenFactory(otokenFactory.address, {from: deployerAddress})

  // deploy Otoken implementation & set address
  await deployer.deploy(Otoken, {from: deployerAddress})
  const otokenImpl = await Otoken.deployed()
  await addressbook.setOtokenImpl(otokenImpl.address, {from: deployerAddress})

  // deploy Whitelist module & set address
  await deployer.deploy(Whitelist, addressbook.address, {from: deployerAddress})
  const whitelist = await Whitelist.deployed()
  await addressbook.setWhitelist(whitelist.address, {from: deployerAddress})

  // deploy Oracle module & set address
  await deployer.deploy(Oracle, {from: deployerAddress})
  const oracle = await Oracle.deployed()
  await addressbook.setOracle(oracle.address, {from: deployerAddress})

  // deploy MarginPool module & set address
  await deployer.deploy(MarginPool, addressbook.address, {from: deployerAddress})
  const pool = await MarginPool.deployed()
  await addressbook.setMarginPool(pool.address, {from: deployerAddress})

  // deploy Calculator module & set address
  await deployer.deploy(MarginCalculator, oracle.address, {from: deployerAddress})
  const calculator = await MarginCalculator.deployed()

  await addressbook.setMarginCalculator(calculator.address, {from: deployerAddress})

  // deploy Controller & set address
  // deploy MarginVault library
  await deployer.deploy(MarginVault, {from: deployerAddress})
  await deployer.link(MarginVault, Controller)
  await deployer.deploy(Controller, {from: deployerAddress})
  const controller = await Controller.deployed()
  await addressbook.setController(controller.address, {from: deployerAddress})

  */
  
  await deployer.deploy(ChainlinkPricer, 
    '0xd65074D8a1951ECF20D852d1A64F49596A7c8104', 
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    '0xb6604488dd755d5aa1ae565b1b5f90d0d891ab9d', {from: deployerAddress})
}
