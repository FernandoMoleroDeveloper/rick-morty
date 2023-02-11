/*
const mapOptions = (options) => {
    let optionFormated = [];

    options.forEach( (element, i) => {
        const stringParts = element.split("/");
        let idOption = stringParts[stringParts.length - 2];
        let auxObject = {
            urlEpisode: options + '/' + idOption,
            urlFetch: element
        }
        optionFormated.push(auxObject);
    });
    return optionFormated;
}



const formatOptions = (options) => {
    let htmlStructure = "";
    options.forEach(element => {
        htmlStructure += `<img class="detail__options-img detail__options-img--${option}" src="${element.urlImg}">`;
    })

    htmlStructure = `
        <p class="detail__options-title">${option.toUpperCase()}</p>
        <div class="detail__img-container">
            ${htmlStructure}
        </div>
    `;
    return htmlStructure;
}


const addEventListenerToOptions = (option, options) => {
    let optionLinks = [...document.getElementsByClassName(`detail__options-img--${option}`)];
    optionLinks.forEach((element,i) => {
        element.addEventListener('click', () => {
            printPage(option.toUpperCase(), options[i].urlFetch);
        });
    });
}
*/