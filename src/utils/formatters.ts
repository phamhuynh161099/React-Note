/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val: string) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column: any) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        column: column._id,
        FE_PlaceholderCard: true
    }
}