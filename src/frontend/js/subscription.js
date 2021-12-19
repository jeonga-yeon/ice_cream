const profileData = document.querySelector(".profile__data");
const subscription = document.querySelector(".subscription");
const subscribing = document.querySelector(".subscribing");
const subscriptionWrap = document.querySelector(".subscription__wrap");

const handleSubscribing = async (subscribing) => {
    const userId = profileData.dataset.id;
    await fetch(`/api/subscriptions/${userId}`, {
        method: "DELETE"
    });
    subscribing.style.display = "none";
    const makeSubscription = document.createElement("button");
    makeSubscription.innerText = "구독하기";
    subscriptionWrap.appendChild(makeSubscription);

    makeSubscription.addEventListener("click", function(){handleSubscription(makeSubscription)});
}

const handleSubscription = async (subscription) => {
    const userId = profileData.dataset.id;
    await fetch(`/api/users/${userId}/subscription`, {
        method: "POST"
    });
    subscription.style.display = "none";
    const makeSubscribing = document.createElement("button");
    makeSubscribing.innerText = "구독중";
    subscriptionWrap.appendChild(makeSubscribing);

    makeSubscribing.addEventListener("click", function(){handleSubscribing(makeSubscribing)});
}

if(subscription) {
    subscription.addEventListener("click", function(){handleSubscription(subscription)});
} else if(subscribing) {
    subscribing.addEventListener("click", function(){handleSubscribing(subscribing)});
}