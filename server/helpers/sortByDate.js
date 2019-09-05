/**
 *
 * @param {moment.Moment} a
 * @param {moment.Moment} b
 */
const sortByDate = (a, b) => {
    if (a.isBefore(b)) {
        return 1
    }

    return 0
}

export default sortByDate