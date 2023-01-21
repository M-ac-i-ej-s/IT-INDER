export const reducer = (state, action) => {
    switch(action.type){
        case 'set_left': {
            return {
                matchStyle: {
                    left: action.left
                },
                render: state.render
            }
        }
        case 'set_render':{
            return {
                matchStyle: {
                    left: state.matchStyle.left
                },
                render: action.render
            }
        }
    }
    throw Error('Unknown action: ' + action.type)

}