export const redusedAddress = (addr: string) => {
    let first = addr.slice(0, 8)
    let last = addr.slice(-7)
    return first + '...' + last
}

export const isEthAddress = (addr: string) => {
    const regexAddr = /^0x[a-fA-F0-9]{40}$/
    return regexAddr.test(addr)
}