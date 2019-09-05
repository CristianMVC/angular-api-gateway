const paginateArray = (array, limit, offset) => {
    const paginatedArray = array
    const originalLength = paginatedArray.length

    if (offset >= originalLength) {
        return []
    } else {
        paginatedArray.splice(0, offset - 1)
    }

    const postOffsetLength = paginatedArray.length

    if (limit && postOffsetLength >= limit) {
        const elementsToDelete = postOffsetLength - limit
        paginatedArray.splice(limit - 1, elementsToDelete)
    }

    return paginatedArray
}

export default paginateArray