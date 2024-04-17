function afficherRecettes (data) {
    const recettes = data;
    function createRecipeCard (){
        let display = "";
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
            display += `<figure class="carte">
                            <div class="sticker">${item.time}min</div>
                            <img src="${item.image}"  alt="image de ${item.name}" />
                            <div class="description">
                                <figcaption><h2>${item.name}</h2></figcaption>
                                <div class="description-recette">
                                    <h3 class="sous-titre">RECETTE</h3>
                                    <p>${item.description}</p>
                                </div>            
                                <p class="titre">INGREDIENTS</p>
                                <div class="ingredients">${html}</div>
                            </div>
                        </figure>`;                
            });
        }
        return display;   
    }
    return {createRecipeCard}
}

export default afficherRecettes;