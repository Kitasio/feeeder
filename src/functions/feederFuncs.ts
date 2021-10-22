import { web3 } from 'svelte-web3'
let Web3
web3.subscribe(value => {
    Web3 = value
})

export const factoryABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"name":"createFeeder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeders","outputs":[{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getFeeders","outputs":[{"components":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256","name":"len","type":"uint256"}],"internalType":"struct FeederFactory.Birds","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]
export const factoryContract = '0x96a0392E206dab62b03D44D2245824fADF7DB573'
export const feederABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getAllMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalFunded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"user","outputs":[{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"enum Feeder.STATE","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]


// Creates a new Feeder
export const createFeeder = async (addresses: Array<string>, allocations: Array<string>, name: string, account: string) => {
    const feederFactoryContract = new Web3.eth.Contract(factoryABI, factoryContract)
    await feederFactoryContract.methods.createFeeder(addresses, allocations, name)
    .send({"from": account})
    .then(res => {
        console.log(res)
    })
}

// Returns the array of all the members
export const getAllMembers = async (feederAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    return await contract.methods.getAllMembers().call()
}

// Returns the name of a Feeder
export const getName = async (feederAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    return await contract.methods.name().call()
}

// Returns the balance of a Feeder
export const getBalance = async (feederAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    return await contract.methods.getBalance().call()
}

// Returns the total funded value of a Feeder (the balance if no one ever withdrawn)
export const getTotalFunded = async (feederAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    return await contract.methods.getTotalFunded().call()
}

// Returns the user object of a Feeder
export const getUser = async (feederAddress: string, userAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    return await contract.methods.user(userAddress).call()
}

// Returns all the Feeders related to a users wallet
export const getAddresses = async (userAddress: string) => {
    const contract = new Web3.eth.Contract(factoryABI, factoryContract)
    let feeder = await contract.methods.getFeeders(userAddress).call()
    return feeder = feeder[0]
}

// Calculates the avaliable balance of a Feeder for specified user in ETH with 4 decimals
export const avaliableBalance = async (feederAddress: string, userAddress: string) => {
    const total = await getTotalFunded(feederAddress)
    const user = await getUser(feederAddress, userAddress)
    let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
    return parseFloat((balance/10**18).toFixed(4))
}

// Calculates the avaliable balance of a Feeder for specified user in WEI
export const avaliableBalanceInWEI = async (feederAddress: string, userAddress: string) => {
    const total = await getTotalFunded(feederAddress)
    const user = await getUser(feederAddress, userAddress)
    let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
    return balance
}

// Sends funds from Feeder to account
export const withdrawInETH = async (eth: number, feederAddress: string, userAddress: string) => {
    const contract = new Web3.eth.Contract(feederABI, feederAddress)
    let wei = eth * 10**18
    let avaliableBalance = await avaliableBalanceInWEI(feederAddress, userAddress)
    if (wei >= avaliableBalance) {
        return await contract.methods.withdraw(avaliableBalance.toString()).send({"from": userAddress})
    }
    return await contract.methods.withdraw(wei.toString()).send({"from": userAddress})
}