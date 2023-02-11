const mainContainer = document.querySelector('.main')
const URL_BASE = "https://rickandmortyapi.com/api";
window.onload = () => { 
    printPage('HOME');
}


const printPage = (section, url) => { 
    mainContainer.innerHTML = "";
   adaptHeader(section);
   
    switch (section){ 
        case 'HOME':
            printHome();
            console.log('pintamos home');
            break;
        case 'PERSONAJES':
            console.log('Pintamos personajes');
            url ? printDetailCharacter(url) : printCharacters();
            break;
        case 'EPISODIOS':
            console.log('Pintamos temporadas');
            url ? printDetailEpisode(url) : printEpìsodes();
            break;
        case 'LOCALIZACIONES':
            console.log('Pintamos localizaciones');
            url ? printDetailLocation(url) : printLocations();
            break;
        default:
            printHome();
            break;
    }

    window.scrollTo(0,0);
}

const adaptHeader = (section) => { 
    const header = document.querySelector('header');
    if(section === 'HOME'){
        header.classList.add('header--home');
    } else {
        header.classList.remove('header--home');
    }
}