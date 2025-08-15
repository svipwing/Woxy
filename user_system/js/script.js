console.clear();
const url = "https://api.svipwing.xyz/"
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const login = document.getElementById('login_btn');
const signup = document.getElementById('signup_btn');
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login_btn');
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formHolder = document.querySelector('.login_holder');
        const emailInput = formHolder.querySelector('input[type="email"]');
        const passwordInput = formHolder.querySelector('input[type="password"]');
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        $('#loginModal').iziModal({
            title: '登录结果',
            width: "40%",
            timeout: 5000,
            timeoutProgressbar: true,
            pauseOnHover: true,
            transitionIn: 'fadeInDown',
            transitionOut: 'fadeOutUp',
            bodyOverflow: true,
            onOpening: function (modal) {
                $('.iziModal').css('min-width', '300px');
                modal.startLoading();
                setTimeout(function () {
                    modal.stopLoading()
                }, 100)
            }
        });
        fetch(url + "login", {
            method: "POST",
            credentials: 'include', // 包含 Cookie
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`登录失败，状态码:${response.status}`)
            }
        }).then(data => {
            if (data.status) {
                $('#loginModal').iziModal('setSubtitle', '登录成功！');
                $('#loginModal').iziModal('setContent', `<div style="padding: 14px 18px 15px 18px;"><p>${data.reason}</p></div>`);
                $('#loginModal').iziModal('open')
            } else {
                $('#loginModal').iziModal('setSubtitle', '登录失败');
                $('#loginModal').iziModal('setContent', `<div style="padding: 7px 18px 7px 18px;"><p>${data.reason}</p></div>`);
                $('#loginModal').iziModal('open')
            }
        }).catch(error => {
            $('#loginModal').iziModal('setSubtitle', '登录失败');
            $('#loginModal').iziModal('setContent', `<p>${error.message}</p>`);
            $('#loginModal').iziModal('open')
        })
    });
    const signupBtn = document.getElementById('signup_btn');
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formHolder = document.querySelector('.signup_holder');
        const emailInput = formHolder.querySelector('input[type="email"]');
        const passwordInput = formHolder.querySelector('input[type="password"]');
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        $('#regModal').iziModal({
            title: '注册结果',
            width: "40%",
            timeout: 5000,
            timeoutProgressbar: true,
            pauseOnHover: true,
            transitionIn: 'fadeInDown',
            transitionOut: 'fadeOutUp',
            bodyOverflow: true,
            onOpening: function (modal) {
                $('.iziModal').css('min-width', '300px');
                modal.startLoading();
                setTimeout(function () {
                    modal.stopLoading()
                }, 100)
            }
        });
        fetch(url + "register", {
            method: "POST",
            credentials: 'include', // 包含 Cookie
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`登录失败，状态码:${response.status}`)
            }
        }).then(data => {
            if (data.status) {
                $('#regModal').iziModal('setSubtitle', '登录成功！');
                $('#regModal').iziModal('setContent', `<div style="padding: 14px 18px 15px 18px;"><p>${data.reason}</p></div>`);
                $('#regModal').iziModal('open')
            } else {
                $('#regModal').iziModal('setSubtitle', '注册失败');
                $('#regModal').iziModal('setContent', `<div style="padding: 7px 18px 7px 18px;"><p>${data.reason}</p></div>`);
                $('#regModal').iziModal('open')
            }
        }).catch(error => {
            $('#loginModal').iziModal('setSubtitle', '注册失败');
            $('#loginModal').iziModal('setContent', `<p>${error.message}</p>`);
            $('#loginModal').iziModal('open')
        })
    })
});
loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    })
});
signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    })
});