import { notify } from 'components/Global/toast-notify'
export const checkMymeType = file => {
    const maxSize = 6000
    const validExt = ['gif', 'png', 'jpg', 'jpeg']
    const extn = file.type.split('/')[1]
    if (validExt.findIndex(elem => elem == extn) == -1) {
        notify(
            'warning',
            'extension is not good, you have to use ',
            validExt.join(',')
        )
        return -1
    }
    if (file.size > maxSize) {
        notify('warning', 'image are too big, please retry with lighter image')
        return -1
    }
    return 1
}
