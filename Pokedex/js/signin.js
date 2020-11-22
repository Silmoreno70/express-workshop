window.onload = init

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = './login.html'
    })
    document.querySelector('.btn-primary').addEventListener('click', signin)
}
function signin() {
    var mail = document.getElementById('input-mail').value
    var pass = document.getElementById('input-password').value
    var name = document.getElementById('input-name').value

    console.log(`User: ${mail} Name: ${name} Pass: ${pass}`)

    axios({
        method:'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(res => {
        alert('Registro exitoso 😀')
        window.location.href = 'login.html'
        console.log(res);

    }).catch(err => {
        console.error(err);
    })
}
