// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const DELETE_PROFILE = "/delete-profile";


// Posts
const POSTS = "/posts";
const UPLOAD = "/upload";
const POST_DETAIL = "/:id";
const EDIT_POST = "/:id/edit";
const DELETE_POST = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    search: SEARCH,
    users: USERS,
    userDetail: USER_DETAIL,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    deleteProfile: DELETE_PROFILE,
    posts: POSTS,
    upload: UPLOAD,
    postDetail: POST_DETAIL,
    editPost: EDIT_POST,
    deletePost: DELETE_POST
};

export default routes;