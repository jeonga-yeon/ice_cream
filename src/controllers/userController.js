import User from "../models/User";
import Post from "../models/Post";
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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEditProfile = (req, res) => {
    return res.render("editprofile", { pageTitle: "프로필 수정" });
};

export const postEditProfile = async (req, res) => {
    const { 
        session: {
            user: { _id, avatarUrl },
        },
        body: { name, nickname, aboutuser },
        file,
    } = req;
    const updatedUser = await User.findByIdAndUpdate(_id, {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            nickname,
            aboutuser,
        },
        { new: true },
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit-profile");
};

export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly === true) {
      return res.redirect("/");
    }
    return res.render("changepassword", { pageTitle: "비밀번호 변경" });
  };

export const postChangePassword = async (req, res) => {
    const {
        session: {
          user: { _id },
        },
        body: { oldPassword, newPassword, confirmation },
      } = req;
      const user = await User.findById(_id);
      const ok = await bcrypt.compare(oldPassword, user.password);
      if(!ok) {
        return res.status(400).render("changepassword", {
            pageTitle: "비밀번호 변경",
            errorMessage: "현재 비밀번호가 일치하지 않습니다.",
        });
      }
      if(newPassword !== confirmation) {
          return res.status(400).render("changepassword", {
              pageTitle: "비밀번호 변경",
              errorMessage: "새로운 비밀번호가 일치하지 않습니다.",
          });
      }
      user.password = newPassword;
      await user.save();
      return res.redirect("/users/logout");
}

export const profile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("posts");
    if(!user) {
        return res.status(404).render("notfound", { pageTitle: "찾을 수 없음" });
    }
    return res.render("profile", { 
        pageTitle: `${user.nickname}의 프로필`, 
        user, 
    });
};
