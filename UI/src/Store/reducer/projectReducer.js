const initState = {}
const projectReducer = (state = initState , action) => {
    switch(action.type){
        case 'Create_Project': {
            return state
        }
        case 'Create_Project_Err' :{
            return state
        }
        default:{
            return state
        }
        
    }
}
export default projectReducer;