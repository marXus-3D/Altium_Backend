
# Altium Backend

This is a backend api created using Node JS and Express to query a mongo-DB Database and much more


## API Reference

#### Get a specific user details

```http
  GET /api/v1/altium/users/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `id`      | `string` | **Required**. Unique Key to identify the user (Email, Username, User_ID)|

#### Update a specific user's details
```http
  PUT /api/v1/altium/users/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

| Body      | Type     | Description                  |
| :-------- | :------- | :-------------------------   |
| `user_id` | `string` | **Required**. The user's uui |
| `username` | `string` | **Required**. The user's username |
| `email` | `string` | **Required**. The user's email |
| `password` | `string` |The user's password |
| `f_name` | `string` |The user's First Name |
| `l_name` | `string` | The user's Last Name |
| `bio` | `string` | The user's bio |
| `profile_picture` | `string` | The URL to the user's profile picture |
| `followers` | `int` | **Required**. The user's number of followers |
| `acc_type` | `string` | The user's account type |


#### Get all users

```http
  GET /api/v1/altium/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Create a new user

```http
  POST /api/v1/altium/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

| Body      | Type     | Description                  |
| :-------- | :------- | :-------------------------   |
| `username` | `string` | **Required**. The user's username |
| `email` | `string` | **Required**. The user's email |
| `password` | `string` | **Required**. The user's password |
| `f_name` | `string` | **Required**. The user's First Name |
| `l_name` | `string` | **Required**. The user's Last Name |
| `acc_type` | `string` |**Required**. The user's account type |
| `bio` | `string` | The user's bio |
| `profile_picture` | `string` | The URL to the user's profile picture |

```http
  DELETE /api/v1/altium/followers
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `follower_id`      | `string` | **Required**. Id of the following user |
| `following_id`      | `string` | **Required**. Id of the followed user |

```http
  POST /api/v1/altium/followers
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `follower_id`      | `string` | **Required**. Id of the following user |
| `following_id`      | `string` | **Required**. Id of the followed user |

```http
  GET /api/v1/altium/followers/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. user_Id of the user to fetch followers list |



## Authors

- [@marXus-3D](https://github.com/marXus-3D)
- [@raniabdela](https://github.com/raniabdela)

#
# ALTIUM


## Run Locally

Clone the project

```bash
  git clone https://github.com/marXus-3D/Altium_Backend
```

Go to the project directory

```bash
  cd altium_backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm index.js
```

