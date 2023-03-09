const { network } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify")



module.exports = async ({getNamedAccounts, deployments}) =>{
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

   log("Network Information ", network)
    
   let ethUsdPriceFeedAddress;
   
    if(developmentChains.includes(network.name)){
        ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    }else{
        ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed ;
    }
    const args = [ethUsdPriceFeedAddress];
    log("Deploying FundMe contract ............")
    const fundMe = await deploy("FundMe", {
        from : deployer,
        args : args,
        log : true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    log("FundMe contract deployed successfully !!!")
    // log("Verifying the deployed contract")
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(fundMe.address, args)
    }

    log("###############################################################")

}

module.exports.tags = ["all", "fundme"];