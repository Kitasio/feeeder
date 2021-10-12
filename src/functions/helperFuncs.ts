export const redusedAddress = (addr: string) => {
    let first = addr.slice(0, 8)
    let last = addr.slice(-7)
    return first + '...' + last
}
