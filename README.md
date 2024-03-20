# API Documentation

## Introduction
This API provides endpoints for user authentication, registration, viewing user details, updating user data, and deleting users. It utilizes JWT tokens for authentication.

## Authentication
To access protected endpoints, users need to authenticate using JWT tokens. Follow the steps below to obtain and use JWT tokens:

1. Register a new user using the `/api/register` endpoint.
2. Log in with the registered user credentials using the `/api/login` endpoint.
3. Use the obtained JWT token in the Authorization header for subsequent requests.

## Endpoints

### User Endpoints

#### Register User
- **Endpoint**: `/register`
- **Method**: `POST`
- **Description**: Allows users to register with the system.
- **Parameters**:
  - `full_name`: Full name of the user.
  - `username`: Username chosen by the user.
  - `password`: Password chosen by the user.
  - `phno`: Phone number of the user.

#### User Login
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Allows users to log in and receive a JWT token.
- **Parameters**:
  - `username`: Username of the user.
  - `password`: Password of the user.
- **OUTPUT**:
    -the out put returns jwt token in the json format

#### View User Details
- **Endpoint**: `/userdetails`
- **Method**: `POST`
- **Description**: Retrieves details of a specific user.
- **Parameters**:
  - 'token':the jwt token is used for the fetching the taken
- **OUTPUT**:
    -the out put returns jwt token in the json format

#### Update User Data
- **Endpoint**: `/update`
- **Method**: `POST`
- **Description**: Allows users to update their information.
- **Parameters**:
 - 'token':the jwt token is used for the fetching the taken
  - Updated user data: (e.g., `fullname`, `phno`).
- **OUTPUT** :
    -returns the updated data

#### Delete User
- **Endpoint**: `/delete`
- **Method**: `DELETE`
- **Description**: Allows users to delete their account.
- **Parameters**:
  - `token`: token uses the token to fetch the user name and others and returns result that user is deleted or not.

## Error Handling
This API returns appropriate error responses for various scenarios. Refer to each endpoint's documentation for details on possible error responses.

## Usage Examples
Below are some examples demonstrating how to use the API endpoints.

## Security
The API implements security measures such as token validation to ensure secure user authentication and data access.

## Deployment
Follow these instructions to deploy the API in your environment.

## Contributing
Contributions to this project are welcome! Please follow the guidelines outlined in CONTRIBUTING.md.

## License
This project is licensed under the [LICENSE NAME] - see the [LICENSE.md](LICENSE.md) file for details.

