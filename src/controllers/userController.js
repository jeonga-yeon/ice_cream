import User from "../models/User";
import Subscription from "../models/Subscription";
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
    const { user } = req.session;
    const profileUser = await User.findById(id).populate({
        path: "posts",
        options: {
            sort : {"creationDate": -1},
        },
        populate: {
            path: "owner",
            model: "User",
        },
    }).populate({
        path: "comments",
        options: {
            sort : {"creationDate": -1},
        },
        populate: {
            path: "post",
            model: "Post",
            populate: {
                path: "owner",
                model: "User",
            },
        },
    }).populate({
        path: "bookmarks",
        options: {
            sort : {"bookmarkDate": -1},
        },
        populate: {
            path: "post",
            model: "Post",
            populate: {
                path: "owner",
                model: "User",
            },
        },
    }).populate({
        path: "subscriptions",
        options: {
            sort : {"subscriptionDate": -1},
        },
        populate: {
            path: "channel",
            model: "User",
        },
    });
    if(!profileUser) {
        return res.status(404).render("notfound", { pageTitle: "찾을 수 없음" });
    }
    const userSubscriptions = [];
    if(user === undefined) {
        return res.render("profile", { 
            pageTitle: `${profileUser.nickname}의 프로필`, 
            profileUser
        });
    } else {
        const thisUser = await User.findById(user._id).populate("subscriptions");
        for(let i = 0; i < thisUser.subscriptions.length; i++) {
            const jsonStr = JSON.stringify(thisUser.subscriptions[i].channel);
            const jsonParse = JSON.parse(jsonStr);
            userSubscriptions.push(jsonParse);
        }
        return res.render("profile", { 
            pageTitle: `${profileUser.nickname}의 프로필`, 
            profileUser, 
            userSubscriptions
        });
    }
};

export const subscription = async (req, res) => {
    const {
        session: { user },
        params: { id },
    } = req;
    
    const channel = await User.findById(id);
    const loggedinUser = await User.findById(user._id);

    if(!channel) {
        return res.sendStatus(404);
    }

    if(!loggedinUser) {
        return res.sendStatus(404);
    }

    const subscription = await Subscription.create({
        channel: id,
        owner: user._id,
    });

    loggedinUser.subscriptions.push(subscription.id);
    loggedinUser.save();

    return res.sendStatus(201);
}

export const deleteSubscription = async (req, res) => {
    const {
        session: { user },
        params: { id },
    } = req;

    const subscription = await Subscription.find({
        channel: id,
        owner: user._id,
    });
    
    if(String(subscription[0].owner) !== String(user._id)) {
        return res.sendStatus(404);
    }
    await Subscription.findOneAndDelete({
        channel: id,
        owner: user._id,
    });  

    return res.sendStatus(201);
}