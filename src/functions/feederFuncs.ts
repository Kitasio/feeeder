export const factoryABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"name":"createFeeder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeders","outputs":[{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getFeeders","outputs":[{"components":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256","name":"len","type":"uint256"}],"internalType":"struct FeederFactory.Birds","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]
export const factoryContract = '0x107e493488efbbAF606c385643EB7db33eefb580'
export const feederABI = [{"inputs":[{"internalType":"address[]","name":"_wallet","type":"address[]"},{"internalType":"uint256[]","name":"_allocation","type":"uint256[]"},{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalFunded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"user","outputs":[{"internalType":"uint256","name":"allocation","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"enum Feeder.STATE","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]


export const createFeeder = async (feederFactory: any, addresses: Array<string>, allocations: Array<string>, name: string, account: string) => {
    await feederFactory.methods.createFeeder(addresses, allocations, name)
    .send({"from": account})
    .then(res => {
        console.log(res)
    })
}

export const getAddresses = async (contract, account) => {
    let feeder = await contract.methods.getFeeders(account).call()
    return feeder = feeder[0]
}

export const getUser = async (feeder, addr) => {
    return await feeder.methods.user(addr).call()
}

export const getName = async (feeder) => {
    return await feeder.methods.name().call()
}

export const getBalance = async (feeder) => {
    return await feeder.methods.getBalance().call()
}

export const getTotalFunded = async (feeder) => {
    return await feeder.methods.getTotalFunded().call()
}