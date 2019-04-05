import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import TempsCuissonIcon from '../../img/temps_cuisson_icon.png'
import TempsPreparatonIcon from '../../img/temps_preparation_icon.png'
import NombrePersonnesIcon from '../../img/nombre_personnes_icon.png'
import LoadingAnimaton from '../../img/spinner.gif'

import EditIcon from '../../img/edit_icon.png';

const RecetteDetails = (props) => {
    const { recette } = props;
    if (recette){
        console.log(recette);
        return(
            <div className='Recette row'>
                <div className='container Details col-3'>
                    <div className='container'>
                        <img src={recette.image} className='image-cake' alt='icon cake' ></img>
                        <span className='nomRecette'>{recette.nom}</span>
                    </div>
                    <div>
                        <Link to={ {pathname:'/update/' + props.match.params.id, recette:recette}} >
                            <span className='btnDelete'>
                                <img src={EditIcon} alt='icon edit cake'/>
                            </span>
                        </Link>
                    </div>
                    <div>
                        { recette.tags && recette.tags.map(tag => {
                            return(
                                <span className='tags' key={tag}>#{tag}</span>
                            )
                        }) }
                    </div>
                    <div>
                        <img src={NombrePersonnesIcon} className='iconDetail' alt='icon fav' />
                        <span>{recette.nombrePersonnes} personnes</span>
                    </div>
                    <div>
                        <img src={TempsCuissonIcon} className='iconDetail cuissonIcon' alt='icon fav'/>
                        <span>{recette.tempsCuisson} minutes</span>
                    </div>
                    <div>
                        <img src={TempsPreparatonIcon} className='iconDetail' alt='icon fav' />
                        <span>{recette.tempsPreparation} minutes</span>
                    </div>
                </div>
                <div className='container Descriptions col-6'>
                    <div className='sections row'>
                        <div className='col-6'>
                            <h2 className='section'>Ingredients</h2>
                            <ul>
                                { recette.ingredients && recette.ingredients.map(ingredient => {
                                    return(
                                        <li className='textSection' key={ingredient} >{ingredient}</li>
                                    )
                                }) }
                            </ul>
                        </div>
                        <div className='col-6'>
                            <h2 className='section'>Materiels</h2>
                                <ul>
                                    { recette.materiels && recette.materiels.map(materiel => {
                                        return(
                                            <li className='textSection' key={materiel} >{materiel}</li>
                                        )
                                    }) }
                                </ul>
                        </div>
                        <div className='col-12'>
                            <h2 className='section'>Preparation</h2>
                            <ul><li className='textSection'>{recette.preparation}</li></ul>
                        </div>
                        <div className='col-12'>
                            <h2 className='section'>Astuces et commentaires</h2>
                            <ul><li className='textSection'>{recette.commentaire}</li></ul>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }else{
        return (
            <div className="container">
                <img src={ LoadingAnimaton } alt='loading animation'/>
                <p>Loading...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const recettes = state.firestore.data.recettes;
    const recette = recettes ? recettes[id] : null;
    return{
        recette: recette
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recettes'}
    ])
)(RecetteDetails)
