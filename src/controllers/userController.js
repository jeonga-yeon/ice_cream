import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("Join", { pageTitle: "회원가입" });
export const postJoin = async (req, res) => {
    const { name, nickname, email, password, password2, aboutuser } = req.body;
    const pageTitle = "회원가입";
    if(password !== password2) {
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "비밀번호가 일치하지 않습니다.", 
        });
    }
    const nicknameExists = await User.exists({ nickname });
    if(nicknameExists) {
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "사용중인 닉네임입니다.", 
        });
    }
    const emailExists = await User.exists({ email });
    if(emailExists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "사용중인 이메일입니다.",
        });
    }
    try {
        await User.create({
            name, 
            nickname,
            email, 
            password, 
            aboutuser,
        });
        return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", { 
            pageTitle: "회원가입",
            errorMessage: error._message,
         });
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "로그인" });

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const pageTitle = "로그인";
    const user = await User.findOne({ email });
    if(!user) {
        return res
          .status(400)
          .render("login", { 
              pageTitle, 
              errorMessage: "존재하지 않는 계정입니다." });
    }
    const confirmPassword = await bcrypt.compare(password, user.password);
    if(!confirmPassword) {
        return res
          .status(400)
          .render("login", { 
              pageTitle, 
              errorMessage: "패스워드가 일치하지 않습니다." });
    }
    return res.redirect("/");
}

export const editProfile = (req, res) => res.send("Edit Profile");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const profile = (req, res) => res.send("Profile");
export const changePassword = (req, res) => res.send("Change Password");