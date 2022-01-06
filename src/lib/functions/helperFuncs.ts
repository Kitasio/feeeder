export const redusedAddress = (addr: string) : string => {
    const first = addr.slice(0, 8)
    const last = addr.slice(-7)
    return first + '...' + last
}

export const isEthAddress = (addr: string) : boolean => {
    const regexAddr = /^0x[a-fA-F0-9]{40}$/
    return regexAddr.test(addr)
}