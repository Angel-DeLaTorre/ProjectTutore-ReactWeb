export const createRecette = (recette) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log(recette);

        firestore.collection('recettes').add({
            ...recette
        }).then(() => {
            dispatch({type: 'CREATE_RECETTE', recette});
        }).catch((error) => {
            dispatch({type: 'CREATE_RECETTE_ERROR', error});
        })
        
    }
}

export const deleteRecette = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        console.log(id);
        firestore.collection('recettes').doc(id).delete().then(function(){
            console.log("Documnet deteled");
        }).catch(function(error){
            console.log("Error removing document: " + error);
        });
        
    }
}

export const updateRecette = (recette) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('recettes').doc(recette.id).update({
            nom: recette.nom,
			preparation: recette.preparation,
            materiels: recette.materiels,
            ingredients: recette.ingredients,
			nombrePersonnes: recette.nombrePersonnes,
			tempsCuisson: recette.tempsCuisson,
			tempsPreparation: recette.tempsPreparation,
			type: recette.type,
			dificulte: recette.dificulte,
			commentaire: recette.commentaire,
			tags: recette.tags,
			image: recette.image
        }).then(function(){
            console.log("Documnet update");
        }).catch(function(error){
            console.log("Error updateing document: " + error);
        });
        
    }
}