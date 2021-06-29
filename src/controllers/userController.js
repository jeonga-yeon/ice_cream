import User from "../models/User";

export const getJoin = (req, res) => res.render("Join", { pageTitle: "회원가입" });
export const postJoin = async (req, res) => {
    const { name, nickname, email, password, password2, aboutuser } = req.body;
    const pageTitle = "회원가입";
    if(password !== password2) {
        return res.render("join", { 
            pageTitle, 
            errorMessage: "비밀번호가 일치하지 않습니다.", 
        });
    }
    const nicknameExists = await User.exists({ nickname });
    if(nicknameExists) {
        return res.render("join", { 
            pageTitle, 
            errorMessage: "사용중인 닉네임입니다.", 
        });
    }
    const emailExists = await User.exists({ email });
    if(emailExists) {
        return res.render("join", {
            pageTitle,
            errorMessage: "사용중인 이메일입니다.",
        });
    }
    await User.create({
        name, 
        nickname,
        email, 
        password, 
        aboutuser,
    });
    return res.redirect("/login");
};
export const editProfile = (req, res) => res.send("Edit Profile");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const profile = (req, res) => res.send("Profile");
export const changePassword = (req, res) => res.send("Change Password");