import { ethers } from "./ethers-5.1.esm.min.js"
import { ABI, CONTRACT_ADDRESS } from "./constants.js"

const connectBtn = document.getElementById("connectButton")
connectBtn.onclick = connect

const fundBtn = document.getElementById("fundButton")
fundBtn.onclick = fund

const getBalanceBtn = document.getElementById("getBalanceButton")
getBalanceBtn.onclick = getBalance

const withdrawBtn = document.getElementById("withdrawButton")
withdrawBtn.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log("I see a metamask")
        await ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").innerHTML = "Connected"
        console.log("Connected Successfully!")
    } else {
        document.getElementById("connectButton").innerHTML = "Retry"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    // console.log(ethers)
    if (typeof window.ethereum !== "undefined") {
        console.log(`Funding the contract with ${ethAmount} Ethers`)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
        } catch (e) {
            console.log(e)
        }

        console.log("Done!")
    }

    //provider , connection to blockchain
    //signer , someone with gas
    //contract - address , abi
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log("Waiting for transaction to be mined ...")

    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
            resolve()
        })
    })
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try {
            const balance = await provider.getBalance(CONTRACT_ADDRESS)
            console.log(ethers.utils.formatEther(balance))
        } catch (error) {
            console.log(error)
        }
    } else {
        getBalanceBtn.innerHTML = "Please install MetaMask"
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

        try {
            console.log("Withdrawing ...")
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")
        } catch (error) {
            console.log(error)
        }
    } else {
        withdrawBtn.innerHTML = "Please install MetaMask"
    }
}
