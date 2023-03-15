const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const comments = document.getElementById('comments');
const email = document.getElementById('email');
const checkbox = document.getElementById('checkbox');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form');

checkbox.addEventListener('click', toggleEmailView)
firstName.addEventListener('input', allowSubmit)
lastName.addEventListener('input', allowSubmit)
window.addEventListener('load', makePromise)

const url = 'https://jsonplaceholder.typicode.com/users'


function toggleEmailView() {
    if(checkbox.checked) {
        email.classList.remove('hidden')
    } else {
        email.classList.add('hidden')
    }
}

function allowSubmit() {
    if(lastName.value.length >= 1 && 
        firstName.value.length >= 1) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function validateEmail() {
    if(checkbox.checked & !email.value.includes('@', '.com')) {
        alert('Please enter a valid email address')
    }
}

function makePost(url, newData) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log(response, 'response')
        if(!response.ok) {
       throw new Error('Something went wrong')
     } else if(response.ok) {
        alert('Thank you for your submission')
        form.reset()
        allowSubmit()
        toggleEmailView()
     }
    })
}

function get(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    validateEmail()
    const newData = {
        firstName: firstName.value,
        lastName: lastName.value,
        isSubscribed: checkbox.checked,
        comments: '' || comments.value,
        ...(email.value && {email: email.value})
    }
    console.log(newData)
    makePost(url, newData)
    get(url)
});

function makePromise() {
    Promise.all([get(url)])
}