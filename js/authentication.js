//Pega as referencias do botões
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var authGitHubButton = document.getElementById('authGitHubButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');

//Pega as referencias dos inputs

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

// Pega referencia do display

var displayName = document.getElementById('displayName');

createUserButton.addEventListener('click',function () {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function () {
        alert('Bem vindo '+emailInput.value);
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console');
    });
});

authEmailPassButton.addEventListener('click',function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, '+emailInput.value;
            alert('Autenticado '+emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console');
        });
});

logOutButton.addEventListener('click',function name(params) {
    firebase
        .auth()
        .signOut() 
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        })
        .catch(function (error) {
            console.error(error);
        });
});

authAnonymouslyButton.addEventListener('click',function () {
    firebase
    .auth()
    .signInAnonymously()
    .then(function (result) {
        console.log(result);
        displayName.innerText = 'Bem vindo, desconhecido';
        alert('Autenticado Anonimamente');
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
    });
});

authGitHubButton.addEventListener('click',function () {
   var provider = new firebase.auth.GithubAuthProvider();
   signIn(provider); 
});
authGoogleButton.addEventListener('click',function () {
    var provider = new firebase.auth.GithubAuthProvider()
    signIn(provider);
});

authFacebookButton.addEventListener('click',function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

authTwitterButton.addEventListener('click',function () {
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});
function signIn(provider) {
    firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
        console.log(result);
        var token = result.credential.accessToken
        displayName.innerText = 'Bem vindo '+ result.user.displayName;
    })
    .catch(function (error) {
        console.error(error);
        alert('Falha na autenticação');
    });
}