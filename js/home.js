const printHome = () => { //Funcion para pintar la home dentro del main.
    //Creamos un innerHTML usando la variable mainContainer que declaramos en main.js para pintar dentro de main la estructura
    mainContainer.innerHTML = ` 
    <div class="main__description">
    <p class="main__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
    <h3 class="main__line"></h3>
    </div>
    <div class="nav">
        <a class="nav__link" href="#">PERSONAJES</a>
        <a class="nav__link" href="#">EPISODIOS</a>
        <a class="nav__link" href="#">LOCALIZACIONES</a>
    </div>
    `;

    addEventsToHomeLinks();
}

const addEventsToHomeLinks = () =>{
    const homeLinks =[...document.getElementsByClassName('nav__link')];
    console.log(homeLinks)
    homeLinks.forEach( element => { 
        element.addEventListener('click', () => { 
            printPage(element.textContent.toLocaleUpperCase());
        });
    });
}