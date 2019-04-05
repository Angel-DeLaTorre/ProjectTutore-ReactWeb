import React from 'react';

const RecetteItem = ({recette}) => {
    return(
        <div className='RecetteItem '>
            <img src={recette.image} alt='recette' />
            <span className='item-nom'>{recette.nom}</span>
        </div>
    )
}

export default RecetteItem;