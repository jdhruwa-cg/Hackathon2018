var FarmInsurance = artifacts.require("./FarmInsurance.sol");

module.exports = function (deployer) {
  deployer.deploy(FarmInsurance);
};
