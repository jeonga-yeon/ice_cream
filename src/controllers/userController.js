export const getJoin = (req, res) => res.render("Join", { pageTitle: "회원가입" });
export const postJoin = (req, res) => {
    console.log(req.body);
    res.end();
};
export const editProfile = (req, res) => res.send("Edit Profile");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const profile = (req, res) => res.send("Profile");
export const changePassword = (req, res) => res.send("Change Password");