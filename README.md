1. Clone the reposirity to your end.

2. run "npm install"

3. Following are the end points
    
        1. localhost:3000/users/create_user          method = POST
            input=> {userName:"",firstName:"",lastName:"",isActive:""}
            
            
        2. localhost:3000/users/get_user/:id        method = GET
        
        3. localhost:3000/users/get_users             method= GET
    
            
        4. localhost:3000/users/update_user                 method= PUT
            input=> {id:"",firstName:"",lastName:"",isActive:""}
            
        5. localhost:3000/users/delete_user/:id             method = DELETE
           