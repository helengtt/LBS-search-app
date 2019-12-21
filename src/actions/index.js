export const mouseEnter = id => ({
    type: 'MOUSE_ENTER',
    resultId: id,
})

export const mouseLeave = () => ({
    type: 'MOUSE_LEAVE',
    resultId: null,
})