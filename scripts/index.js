
import recipes from "../data/recipes.js";

var newList = recipes;

function displayRecipes (recettes){
    const display = document.querySelector(".displayRecipes");
    display.innerHTML = "";
    if (recettes.length>0){
        recettes.forEach( item => {
        let html = "";
        item.ingredients.forEach(item => {
            if (item.unit==undefined){
                html += `<div class="outils">
                            <p>${item.ingredient}</p>
                            <p class="sous-titre">${item.quantity}</p>
                        </div>`;
            }else{
                html += `<div class="outils">
                            <p>${item.ingredient}</p>
                            <p class="sous-titre">${item.quantity}${item.unit}</p>
                        </div>`;
            }
        })
        display.innerHTML += `  <div class="carte">
                                    <div class="sticker">${item.time}min</div>
                                    <img src="${item.image}" />
                                    <div class="description">
                                        <h2>${item.name}</h2>
                                        <div class="description-recette">
                                            <h3 class="sous-titre">RECETTE</h3>
                                            <p>${item.description}</p>
                                        </div>
                                        <p class="titre">INGREDIENTS</p>
                                        <div class="ingredients">${html}</div>
                                    </div>
                                </div>`;
        

    });
    setIngredientsList(recettes);
    setAppareilsList(recettes);
    setUstensilsList(recettes);
    displayRecipesNumber(recettes.length);
    }
}
displayRecipes(recipes);

// remplir la liste d'option Ingrédient 
function setIngredientsList(list) {
    let listeIngredient = []
    list.forEach(element => element.ingredients.forEach(element =>{
        if(listeIngredient.indexOf(element.ingredient.toLowerCase())<0){
            listeIngredient.push(element.ingredient.toLowerCase());
        }
    }));    
    fillOptionList(".contenaireIngredients",listeIngredient,"ingredients");
    filterOptionListe(".ingredientsInput",".contenaireIngredients",listeIngredient,"ingedients");
    selectedOption();
}
// remplir la liste d'option Appareils
function setAppareilsList (list){
    let listeAppareils = []
    list.forEach(element =>{
        if(listeAppareils.indexOf(element.appliance.toLowerCase())<0){
            listeAppareils.push(element.appliance.toLowerCase());
        }
    });
    fillOptionList(".contenaireAppareils",listeAppareils,"appareils");
    filterOptionListe(".appareilsInput",".contenaireAppareils",listeAppareils,"appareils");
    selectedOption();
}
// remplir la liste d'option ustensils
function setUstensilsList (list){
    let listeUstensils = []
    list.forEach(element =>{
        element.ustensils.forEach(element =>{
            if(listeUstensils.indexOf(element.toLocaleLowerCase())<0){
                listeUstensils.push(element.toLocaleLowerCase())
            }
        })
    });
    fillOptionList(".contenaireUstensils",listeUstensils,"ustensiles");
    filterOptionListe(".ustensilesInput",".contenaireUstensils",listeUstensils,"ustensiles");
    selectedOption();
}

// remplir une liste déroulante 
function fillOptionList (optionListName,options,optionListClass){
    let customOptionsDisplay = document.querySelector(optionListName);
    customOptionsDisplay.innerHTML = "";
    options.forEach(option => customOptionsDisplay.innerHTML+=`<span class="custom-option ${optionListClass}" data-value="${option}">${option}</span>`);
}

// ouvrir ou fermer une liste 
function gererListe (select__trigger, select){
    let filtreListe = document.querySelector(".liste-filtre");

    document.querySelector(select__trigger).addEventListener('click', function () {
        document.querySelector(select).classList.toggle('open');
        let test = false;
        document.querySelectorAll(".select").forEach(element=>{
            test = test || element.classList.contains("open");
        });
        // Ajuster le style CSS de l'élément .filtre-Liste en fonction de l'état de la liste
        if (test) {
            filtreListe.style.marginBottom = "260px";
        } else {
            filtreListe.style.marginBottom = "10px";
        }
    }); 
}
gererListe(".ingredients",".select-ingredient");
gererListe(".appareils",".select-appareils");
gererListe(".ustensiles",".select-ustensiles");




// filtrer la liste d'option 
function filterOptionListe (TextName,optionListName,listeToFilter,params) {
    document.querySelector(TextName).addEventListener("input",function(){
        let liste = listeToFilter.filter(item => item.toLowerCase().indexOf(this.value.toLowerCase()) > -1);
        fillOptionList(optionListName,liste,params);
        selectedOption()
    })
}
// chercher un element dans une liste selon attribut

// chercher une element dans une liste 
function filterList (chaine) {
    let list = [];
    if ((searchBy(recipes,"name",chaine)).length > 0){
        list = searchBy(recipes,"name",chaine);
    }else if ((searchBy(recipes,"description",chaine)).length > 0){
        list = searchBy(recipes,"description",chaine);
    }else if ((searchBy(recipes,"ingredients",chaine)).length > 0){
        list = searchBy(recipes,"ingredients",chaine)
    }
    return list;
}

function searchBy (list,listElement,searchelement) {
    let liste =[]
    switch (listElement) {
        case "ingredients":
            for(let i=0; i<list.length;i++){
                for(let j=0; j<list[i].ingredients.length;j++){
                    if(list[i].ingredients[j].ingredient.toLocaleLowerCase() === searchelement){
                        liste.push(list[i]);
                    }
                }
            }
            break;
        case "appareils" :
            liste = list.filter(item => item.appliance.toLowerCase().indexOf(searchelement)> -1);
            break;
        case "description" :
            for(let i=0; i<list.length;i++){
                if(list[i].description.toLocaleLowerCase().indexOf(searchelement) > -1){
                    liste.push(list[i]);
                }
            }
            break;
        case "name" :
            for(let i=0; i<list.length;i++){
                if(list[i].name.toLocaleLowerCase().indexOf(searchelement) > -1){
                    liste.push(list[i]);
                }
            }
            break;
        case "ustensils" :
            list.filter(item =>{
                item.ustensils.forEach(ustensil => {
                    if(ustensil.toLowerCase() === searchelement){
                        liste.push(item);
                    }
                })
            });
            break;
        default : console.log("data not found");
    }
    return liste;
}

// filtrer la liste des recette à partir du mot entrer dans la zone de recherche
function filterRecipes () {
    let mainSearch = document.querySelector(".searchZone");
    mainSearch.addEventListener("input",function(){
        if(this.value.length >= 3){
            // displayRecipes(filterList(this.value.toLowerCase()));
            newList = filterList(this.value.toLowerCase());
        }else{
            newList = recipes
        }
        if (newList.length>0){
            displayRecipes(newList);
            setIngredientsList(newList);
            setAppareilsList(newList);
            setUstensilsList(newList);
            selectedOption();
        }else{
            document.querySelector(".displayRecipes").innerHTML=`<h1 class="notFound">Aucune recette ne contient '${this.value}' vous pouvez recherchez &lt;&lt; tarte aux pommes &gt;&gt;, &lt;&lt;poisson&gt;&gt;, etc.</h1>`
        }
    })
}
filterRecipes();


// afficher un filtre séléctionner 
function displaySelectedOptions (){
    let display = document.querySelector(".filtreSelectionner");
    display.innerHTML="";
    filterTab.forEach(element=>{
        display.innerHTML +=`
            <div class="filter">
                <p class="${element}">${element}</p>
                <i class="fa-solid fa-xmark fa-xl close"></i>        
            </div>            
        `
    });
    closeFilter();
}

// fermer un filtre séléctionner 
function closeFilter(){
    let filter = document.querySelectorAll(".filter");
    filter.forEach(element => {
        element.addEventListener("click",function(){
            filterTab = filterTab.filter(option => option !== element.innerText);
            displaySelectedOptions();
            newList = filterListByOptions(recipes);
            displayRecipes(newList);
        });
    })
}

var filterTab = [];
function selectedOption (){
    let option = document.querySelectorAll(".custom-option");
    option.forEach(element => {
        element.addEventListener("click",function (){
            if (filterTab.indexOf(element.innerHTML)==-1){
                filterTab.push(element.innerHTML);
            }
            newList=filterListByOptions(newList);
            displayRecipes(newList);
            displaySelectedOptions();
        })
    })
}

selectedOption();

// chercher les element du tableau dans la liste 
function filterListByOptions (liste) {
    let result = liste;
    filterTab.forEach(element =>{
        if((searchBy(result,"ingredients",element)).length > 0){
            result = searchBy(result,"ingredients",element);
        }else if ((searchBy(result,"appareils",element)).length > 0){
            result = searchBy(result,"appareils",element);
        }else if (searchBy(result,"ustensils",element).length > 0){
            result = searchBy(result,"ustensils",element);
        }else{
            result =[];
        }
    });
    
    return result;
}

// afficher le nombre de recettes
function displayRecipesNumber (number) {
    let display = document.querySelector(".nombre-recette");
    display.innerHTML=`<h2>${number} Recettes</h2>`
}