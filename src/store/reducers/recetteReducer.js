const initState = {
    recettes: [
        {id: 1, title:'kk', nom:'Tacos'},
        {id: 2, title:'kk', nom:'Carnitas'},
        {id: 3, title:'kk', nom:'Cordero'},
    ]
}

const recetteReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_RECETTE': 
            console.log('created recette', action.recette);
            return state;
        case 'CREATE_RECETTE_ERROR':
            console.log('create recette error', action.error);
            return state;
        default: 
            return state;
    }
}

export default recetteReducer