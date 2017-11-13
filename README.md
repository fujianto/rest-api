# rest-api
Simple CRUD App with Rest API using ExpressJs, Sequelize and Postgress

## Rest API

List of user routes:

| Route                        	  		    | HTTP           | Description                                				|
| ------------------------------------------------  |:----------------:| --------------------------------:|
| `/api/signup`        				    | GET                    | Register new User. isAdmin is set false as default.   						 |
| `/api/signin`        				    | GET                    |  Sign in to API. Token and userId will be returned to be used for Sign In purpose.   						 |
| `/api/users`        				    | GET                    |  Get all the users. (Admin Only)    						 |
| `/api/users/:id`        			    | GET                    |  Get a single user (Admin and Authenticated User with same User Id. Admin can view every user)    						 |
| `/api/users`        				    | POST                 |  Create a user (Admin Only)    		 				|
| `/api/users/:id`        			    | DELETE            |  Delete a user (Admin Only)    		 				|
| `/api/users/:id`        			    | PUT                    |  Update a user with new info  (Admin and Authenticated User with same User Id. Admin can edit every user, Authenticated user can't change isAdmin value defaulted to false)  		 |

## Authentication
To access route that need Authentication, you need to send **headers** using parameter `token` with value from Token generated after successfully doing Sign In.

## Environtment Variable and Secret
Create '.env' file in the app root directory. Put your App secret key on it. You can check `env-template` for more detail.

 ```
 SECRET=<Your App Secret>
 ```

## Client side test
To test how the api works in real world scenario, you can test the demo using the following routes.

**Sign In**

`http://localhost:3000`

This route displaying Sign in form for User or Admin to enter Username and Password. If Sign in is success, it will be redirected to `http://localhost:3000/profiles/<userId>` which show current user info. Generated token will be stored to browser localStorage with key **token**.

**User Profile**

`http://localhost:3000/profiles/<userId>`

This is the first route user redirected after sucessfully Sign in. Only Authenticated user with correct User Id and Admin can view this route. Admin can view any User, Authenticated user can only view its own profile. Non Admin and non privileges User will be kick out to sign in page.

**All Users**

`http://localhost:3000/allusers`

This route display all registered user from database. Only Admin can access this page. Without correct admin token, User will be redirected to Sign in page.

 **Usage**

 With only npm:
 ```
 npm install
 npm start
 npm run dev
 ```

 Access the website via `http://localhost:3000` or API via  `http://localhost:3000/api`