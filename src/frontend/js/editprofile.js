const deleteImage = document.querySelector("#delete__image");
const profileData = document.querySelector(".profile__data");
const profileDataImg = document.querySelector(".profile__data--image");
const profileImg = document.querySelector(".profile__data img");

const handleDeleteImage = async () => {
    profileImg.style.display = "none";
    const i = document.createElement("i");
    i.classList.add("fas", "fa-user-circle", "fa-7x");
    profileDataImg.appendChild(i);

    deleteImage.removeEventListener("click", handleDeleteImage);

    const userId = profileData.dataset.id;

    await fetch(`/api/users/${userId}/profile-image`, {
        method: "DELETE"
    });
};

if(profileImg) {
    deleteImage.addEventListener("click", handleDeleteImage);
}