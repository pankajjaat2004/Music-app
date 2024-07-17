export async function apiCall(URL){
    try{
        const response = await fetch(URL);
        return response; 
        }catch(err){
            throw err;
        }
}