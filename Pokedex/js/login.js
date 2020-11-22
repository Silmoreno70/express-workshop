window.onload = init

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = './signin.html'
    })
    document.querySelector('.btn-primary').addEventListener('click', login)
}
function login() {
    var mail = document.getElementById('input-mail').value
    var pass = document.getElementById('input-password').value

    console.log(`User: ${mail} Pass: ${pass}`)

    axios({
        method:'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(res => {
        console.log(res);

    }).catch(err => {
        console.error(err);
    })
}