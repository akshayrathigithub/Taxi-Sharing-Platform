const initchatState = {}
const chatReducer = (State = initchatState, action) => {
switch(action.type){
    case 'CHAT':{
        return Object.assign({}, State, {State: action.user})
    }
    default:
    return State
}
}
export default chatReducer;