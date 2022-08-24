This is a Api call Pario Solution House where a Landord can post a house after signing up and any user can give a comment about the house
here are the path to access all Apis created

This is an Api where user can be able to signup with the path http://localhost:3007/api/user
after the user can go on to login with the path http://localhost:3007/api/auth
a token with be generate. that token generate can be use to access the user using a get request on postman or any testing tools with the path http://localhost:3007/api/auth/protected
after the user succesfully access the account a user can succesfully post the house with the path http://localhost:3007/api/post
a singed in user can also get all house with pathhttp://localhost:3007/api/post/allpost
