import recipes from "../data/recipes.js";
import afficherRecettes from "./templates/display.js";
import setLists from "./utils/lists.js";

var newList = recipes;

// function pour afficher toutes les recettes à partir d'une liste donné
function displayRecipes (recettes){
    const display = document.querySelector(".displayRecipes");
    display.innerHTML="";
    const recipeModel = afficherRecettes(recettes);
    display.innerHTML += recipeModel.createRecipeCard();
    const setList = setLists(recettes);
    setList.setIngredientsList();
    setList.setAppareilsList();
    setList.setUstensilsList();
    displayRecipesNumber(recettes.length);
}
displayRecipes(recipes);

// ouvrir ou fermer une liste déroulante pérsonnalisé
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


// chercher un element dans une liste selon attribut

// chercher une element dans une liste 
function filterList (element,liste) {
    let list = [];
    if ((searchBy(liste,"name",element)).length > 0){
        list = searchBy(liste,"name",element);
    }else if ((searchBy(liste,"description",element)).length > 0){
        list = searchBy(liste,"description",element);
    }else if ((searchBy(liste,"ingredients",element)).length > 0){
        list = searchBy(liste,"ingredients",element)
    }
    return list;
}

function searchBy (list,listElement,searchelement) {
    let liste =[]
    switch (listElement) {
        case "ingredients":
            list.forEach(recipe => {
                recipe.ingredients.forEach(ingredient=>{
                    if (ingredient.ingredient.toLowerCase() === searchelement) {
                        liste.push(recipe);
                    }
                })
            });
            break;
        case "appareils" :
            liste = list.filter(item => item.appliance.toLowerCase().indexOf(searchelement)> -1);
            break;
        case "description" :
            liste = list.filter(item => item.description.toLowerCase().indexOf(searchelement)> -1);
            break;
        case "name" :
            liste = list.filter(item => item.name.toLowerCase().indexOf(searchelement)> -1);
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

// vérifier si une chaine contient une balise html
function containTag (chaine){
    const expression = /<("[^"]*"|'[^']*'|[^'">])*>/;
    return expression.test(chaine);
}

//enlever les balises d'une chaine 
function deleteTag (chaine){
    return chaine.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}
// filtrer la liste des recette à partir du mot entrer dans la zone de recherche
function filterRecipes (liste) {
    let mainSearch = document.querySelector(".searchZone");
    mainSearch.addEventListener("input",function(){
        let chaine = this.value;
        if (containTag(chaine)){ 
            chaine= deleteTag(chaine);
        }
        if(chaine.length >= 3){
            newList = filterList(chaine.toLowerCase(),liste);
        }else{
            newList = liste;
        }
        if (newList.length>0){
            displayRecipes(newList);
        }else{
            document.querySelector(".displayRecipes").innerHTML=`<h1 class="notFound">Aucune recette ne contient '${chaine}' vous pouvez recherchez &lt;&lt; tarte aux pommes &gt;&gt;, &lt;&lt;poisson&gt;&gt;, etc.</h1>`
        }
    })
}
filterRecipes(newList);


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
export function selectedOption (){
    let option = document.querySelectorAll(".custom-option");
    option.forEach(element => {
        element.addEventListener("click",function (){
            if (filterTab.indexOf(element.innerHTML)==-1){
                filterTab.push(element.innerHTML);
            }
            newList=filterListByOptions(newList);
            displayRecipes(newList);
            filterRecipes(newList);
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
 