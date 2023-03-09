const {deployments, getNamedAccounts, ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("FundMe", function (){
    let fundMe, deployer, mockV3Aggregator;

    beforeEach(async function (){
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })

    describe("constructor", async function (){
        it("Sets correct aggregator address", async function (){
            const response = await fundMe.getPriceFeed();
            assert.equal(response, mockV3Aggregator.address)
        })
    
    })

    describe("fund", async function (){
        it("fails if you don't send enough ETH", async function(){
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!");

        })
    })
})