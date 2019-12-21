const mouseHover = (state = {resultId: null}, action) => {
    // var abc
    switch (action.type) {
        case 'MOUSE_ENTER':
            return {
                ...state,
                resultId: action.resultId,
            }
        case 'MOUSE_LEAVE':
            return {
                ...state,
                resultId: action.resultId,
            }
        default:
            return state
    }
    // console.log('state=' + JSON.stringify(state) + ' action=' + JSON.stringify(action) + ' abc=' + JSON.stringify(abc))
    // return abc
}

export default mouseHover