export const download = () => new Promise((res, rej) => {
    try {
        setTimeout(() => { res("") }, 1500);
    } catch (error) {
        rej(error)
    }
})