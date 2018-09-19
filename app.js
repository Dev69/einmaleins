b = document.querySelector('#main')

console.log(b)
console.log(b)

for (let i = 1; i < 21; i++) {
    var newp = document.createElement("p");
    newp.appendChild(document.createTextNode(`Text - ${i}`));
    b.appendChild(newp); 
}

l = document.querySelectorAll('p')
console.log(l)


l.forEach(element => {

        element.innerHTML = "blabla" 

});


