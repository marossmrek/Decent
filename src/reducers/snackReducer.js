const snackReducer = (state = {
    isOpen: false,
    msg: ""
}, action) => {
    switch (action.type) {
        case "CHANGE_MSG":
            state = {
                ...state,
                isOpen: true,
                msg: action.payload
            };
            break;
    }
    return state;
};

export default snackReducer;