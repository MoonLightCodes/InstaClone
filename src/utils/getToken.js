export const getToken =(token = "Auth_Token")=>{
    const tokenValue = localStorage.getItem(token);
    if (tokenValue) {
        return tokenValue;
    } else {
        return null;
    }
}