| Path                       | METHOD | Description                   |
| -------------------------- | ------ | ----------------------------- |
| /                          | GET    | Home                          |
| /auth/login                | GET    | Log in Form                   |
| /auth/login                | POST   | Log in Form                   |
| /auth/singup               | GET    | Sign up form                  |
| /auth/signup               | POST   | Sign up form                  |
| /auth/logout               | GET    | log out                       |
| /artworks/:page            | GET    | List of all artworks          |
| /search                    | GET    | Search by tag                 |
| /artworks/search           | POST   | Search of artworks            |
| /artworks/daily            | GET    | Random artwork                |
| /comment/:id               | POST   | Add a comment in an artwork   |
| /user/community            | GET    | List of users                 |
| /user/profile              | GET    | Profile page                  |
| /user/edit-profile/:id     | GET    | Edit user profile             |
| /user/profile/:id          | GET    | User profile                  |
| /user/following/delete/:id | GET    | Delete followers              |
| /user/edit/:id             | GET    | Get data of a user for admin  |
| /user/delete/:id           | GET    | Admin user delete a user      |
| /user/edit-profile         | POST   | Edit your profile             |
| /user/following/:id        | POST   | Add a user following          |
| /user/edit-admin/:id       | POST   | Admin user edit a user        |
| /favourites/:id            | POST   | Add favourite art to profile  |
| /favourites/delete/:id     | GET    | Delete your favourite artwork |