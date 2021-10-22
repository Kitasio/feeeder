let etherscanAPI = 'W3AY7KRPVXM9S5PBZ5DWMIU8QAWFWV57GT'
export const getEtherscanHistory = async (feederAddress) => {
    const res = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${feederAddress}&startblock=0&endblock=9999999999&page=1&offset=10&sort=desc&apikey=${etherscanAPI}`)
    return await res.json()
}