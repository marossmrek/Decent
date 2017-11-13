export function setSnackBarMsg(msg) {
    return {
        type: "CHANGE_MSG",
        payload: msg
    };
}