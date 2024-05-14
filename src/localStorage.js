export const setItem = (user, token)=> {
    localStorage.setItem("hostle", JSON.stringify({user, token}));
}
export const removeItem = ()=> {
    localStorage.setItem("hostle", JSON.stringify({user:null, token:null}));
}
export const getUser = ()=> {
    const data = localStorage.getItem("hostle");
    const convertedData = JSON.parse(data);
    return convertedData?.user;
}
export const getToken = ()=> {
    const data = localStorage.getItem("hostle");
    const convertedData = JSON.parse(data);
    return convertedData?.token;
}