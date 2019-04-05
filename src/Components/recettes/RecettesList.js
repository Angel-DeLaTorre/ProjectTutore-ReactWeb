import React, { Component } from 'react';
import RecetteItem from './RecetteItem';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteRecette } from '../../store/actions/recetteActions';

import EditIcon from '../../img/edit_icon.png';
import DeleteIcon from '../../img/delete_icon.png';

export class RecettesList extends Component{

    deteleRecettes = (id) => {
        console.log(id);
        this.props.deleteRecette(id);
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    { this.props.recettes && this.props.recettes.map(recette => {
                        return(
                            <div  className='LinkRecette' key={recette.id}>
                                <Link to={'/recette/' + recette.id}>
                                    <RecetteItem recette={recette} key={recette.id} />
                                </Link>
                                <div className='blockOptions'>
                                    <Link to={ {pathname:'/update/' + recette.id, recette:recette}} >
                                        <span className='btnDelete'>
                                            <img src={EditIcon} alt='icon edit cake'/>
                                        </span>
                                    </Link>
                                    <span className='btnDelete' onClick={() => {if(window.confirm('Vous êtes sûr de supprimer cette recette ?')){this.deteleRecettes(recette.id)};}}>
                                        <img src={DeleteIcon} alt='icon delete cake' />
                                    </span>

                                    
                                </div>
                            </div>
                            
                        )
                    }) }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteRecette: (id) => dispatch(deleteRecette(id))
	}
}

export default connect(null, mapDispatchToProps)(RecettesList);