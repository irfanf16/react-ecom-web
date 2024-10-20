const BackendApiDomain='http://localhost:5000/api';
const BackendRoutesPath={
    'register':{
        url:    `${BackendApiDomain}/register`,
        method:'POST',
    },
    'login':{
        url:`${BackendApiDomain}/login`,
        method:'POST'
    },
   
    'logout':{
        url:`${BackendApiDomain}/logout`,
        method:'GET'
    },
    // users path
    'user':{
        url:`${BackendApiDomain}/user`,
        method:'GET'
    },
    'updateUser':{
        url:`${BackendApiDomain}/user`,
        method:'PUT'
    },
    'deleteUser':{
        url:`${BackendApiDomain}/user`,
        method:'DELETE'
    },
    'users':{
        url:`${BackendApiDomain}/users`,
        method:'GET'
    }
    // products path
}

export default BackendRoutesPath;