import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import firebase from 'firebase'

import { Link } from 'react-router-dom';
import { createRecette, updateRecette } from '../../store/actions/recetteActions'
import IconAdd from '../../img/add-button-32.png'
import LoadingAnimaton from '../../img/spinner.gif'

export class CreateRecette extends Component {

	state = {
		id: '',
		nom: '',
		materiels: [],
		ingredients: [],
		nombrePersonnes: '',
		tempsCuisson: '',
		tempsPreparation: '',
		type: 'CLASSIQUE',
		dificulte: '1',
		commentaire: '',
		tags: [],
		image: 'https://firebasestorage.googleapis.com/v0/b/lp-wmce-projet-tutore.appspot.com/o/recettes%2Ficon.png?alt=media&token=dff89d98-4820-46db-b81f-c26a69cf554d',
		tag: '',
		materiel: '',
		favorit: false,
		date: new Date(),
		ingredient: '',
		uploadValue: 0,
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]:e.target.value
		})
	}
	handleSubmit = (e) => {
		
		//console.log(recette);
		e.preventDefault();
		delete this.state.tag;
		delete this.state.materiel;
		delete this.state.ingredient;
		delete this.state.uploadValue;
		this.setState(this.state);
		console.log(this.state);

		if(this.props.match.params.id){
			this.props.updateRecette(this.state)
			this.props.history.push('/recette/'+ this.state.id);
		}else{
			delete this.state.id;
			this.setState(this.state);
			this.setState({date:new Date()});
			console.log(this.state);
			this.props.createRecette(this.state);
			this.props.history.push('/');
		}
		
	}
	handleAddTag = (e) => {
		this.setState({ 
			tags: this.state.tags.concat([this.state.tag]),
			tag: ''
		})
	}
	handleAddMateriel = (e) => {
		this.setState({ 
			materiels: this.state.materiels.concat([this.state.materiel]),
			materiel: ''
		})
	}
	handleAddIngrediet = (e) => {
		this.setState({ 
			ingredients: this.state.ingredients.concat([this.state.ingredient]),
			ingredient: ''
		})
	}
	handleUploadImage = (e) => {
		
		const file = e.target.files[0];
		const storageRef = firebase.storage().ref(`/recettes/${file.name}`);
		const task = storageRef.put(file);
	
		task.on('state_changed', (snapshot) => {
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.setState({
				uploadValue: percentage
			})
		}, error => {
			console.log(error.message)
		}, () => {
			task.snapshot.ref.getDownloadURL().then((downloadURL) => this.setState({image: downloadURL, uploadValue:100}));
		});
		console.log(this.state);
	}
	onRemoveTag = i => {
		this.setState(state => {
			const tags = state.tags.filter((item, j) => i !== j);
			return {
			  tags,
			};
		});
		//console.log(this.state);
	}
	onRemoveMateriel = i => {
		this.setState(state => {
			const materiels = state.materiels.filter((item, j) => i !== j);
			return {
				materiels,
			};
		});
		//console.log(this.state);
	}
	onRemoveIngredient = i => {
		this.setState(state => {
			const ingredients = state.ingredients.filter((item, j) => i !== j);
			return {
				ingredients,
			};
		});
		//console.log(this.state);
	}

	updateNewState(recette){
		this.setState({ 
			id: this.props.match.params.id,
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
			image: recette.image,
		})
	}

	render() {
		const { recette } = this.props;

		if(!this.props.match.params.id || recette){
			if((this.state.nom === ''  && this.state.commentaire === '') && recette){
				this.updateNewState(recette);
			}			
			return (
				<div className="container createRecette">
					<h2 className='p-4'>Recette </h2>
					<form onSubmit={this.handleSubmit} className='form-row formulaire'>	
					<div className="form-row col-md-11 mt-3 mb-4 d-flex flex-row-reverse">
						<Link to={ {pathname:'/' }} >
							<span className='btn btn-danger ml-3'>
								Annuler
							</span>
						</Link>
						<button className='btn btn-primary'>Enregistrer</button>
					</div>
					{/* premiere Block */}
						<div className="form-column col-md-7 mr-5">
							<div className="form-group row">
								<label htmlFor="nom" className="col-sm-3 col-form-label">Nom</label>
								<div className="col-sm-9">
									<input type="text" name="nom" className="form-control" id="nom" placeholder="nom"  value={this.state.nom} onChange={this.handleChange} required/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="preparation" className="col-sm-3 col-form-label">Preparation</label>
								<div className="col-sm-9">
									<textarea name="preparation" className="form-control" id="preparation" placeholder="preparation" value={this.state.preparation} onChange={this.handleChange} required></textarea>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="commentaire" className="col-sm-3 col-form-label">Commentaire</label>
								<div className="col-sm-9">
									<textarea name="commentaire" className="form-control" id="commentaire" placeholder="commentaire" value={this.state.commentaire} onChange={this.handleChange} required></textarea>
								</div>
							</div>
	
							<div className='form-row'>
							{/* Materiel Block */}			
								<div className="form-row col-6">
									<label htmlFor="materiel" className="col-sm-3 col-form-label">Materiel</label>
									<div className='col-sm-6'>
										<label className="sr-only" htmlFor="inlineFormInputGroup">materiel</label>
										<div className="input-group mb-2">
											<input type="text" name='materiel' id="materiel" className="form-control" placeholder="materiel" value={this.state.materiel} onChange={this.handleChange} />
										</div>
									</div>
									<div className='col-sm-2 mt-1'>
										<img src={IconAdd} className='iconAddTag' alt='icon add tag' onClick={this.handleAddMateriel}></img>
									</div>
									<div className='col-sm-12 flex-column'>
										{ this.state.materiels && this.state.materiels.map((materiel, index) => {
											return(
												<div key={materiel} className='d-flex justify-content-star'>
													<span className='delete-tags' onClick={() => this.onRemoveMateriel(index)}>X</span>
													<span className='materiels'>{materiel}</span>
												</div>
											)
										}) }
									</div>
								</div>
							{/* fin Materiel Block */}
							{/* ingredient Block */}			
							<div className="form-row col-6">
									<label htmlFor="ingredient" className="col-sm-3 col-form-label">Ingredient</label>
									<div className='col-sm-6'>
										<label className="sr-only" htmlFor="inlineFormInputGroup">Ingredient</label>
										<div className="input-group mb-2">
											<input type="text" name='ingredient' id="ingredient" className="form-control" placeholder="ingredient" value={this.state.ingredient} onChange={this.handleChange} />
										</div>
									</div>
									<div className='col-sm-2 mt-1'>
										<img src={IconAdd} className='iconAddTag' alt='icon add tag' onClick={this.handleAddIngrediet}></img>
									</div>
									<div className='col-sm-12 flex-column'>
										{ this.state.ingredients && this.state.ingredients.map((ingredient, index) => {
											return(
												<div key={ingredient} className='d-flex justify-content-star'>
													<span className='delete-tags' onClick={() => this.onRemoveIngredient(index)}>X</span>
													<span className='ingredients'>{ingredient}</span>
												</div>
											)
										}) }
									</div>
								</div>
							{/* fin ingredient Block */}
							{/* Tag Block */}			
								<div className="form-row col-6">
									<label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
									<div className='col-sm-8'>
										<label className="sr-only" htmlFor="inlineFormInputGroup">Tag</label>
										<div className="input-group mb-2">
											<div className="input-group-prepend">
												<div className="input-group-text">#</div>
											</div>
											<input type="text" name='tag' id="tag" className="form-control" placeholder="Tag" value={this.state.tag} onChange={this.handleChange} />
										</div>
									</div>
									<div className='col-2 mt-1'>
										<img src={IconAdd} className='iconAddTag' alt='icon add tag' onClick={this.handleAddTag}></img>
									</div>
									<div className='col-sm-12'>
										{ this.state.tags && this.state.tags.map((tag, index) => {
											return(
												<div key={tag} className='d-flex justify-content-star'>
													<span className='delete-tags' onClick={() => this.onRemoveTag(index)}>X</span>
													<span className='tags'>#{tag}</span>
													
												</div>
											)
										}) }
									</div>
								</div>
							{/* fin tag Block */}
							</div>
						</div>
					{/* fin premiere Block */}
	
					{/* deuxieme Block */}
						<div className="form-column col-md-4">
							<div className="form-group row">
								<label htmlFor="nombrePersonnes" className="col-sm-6 col-form-label">N° Personnes</label>
								<div className="col-sm-6">
									<input type="number" name="nombrePersonnes" className="form-control" id="nombrePersonnes" placeholder="0" value={this.state.nombrePersonnes} onChange={this.handleChange} required/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="tempsCuisson" className="col-sm-6 col-form-label">Temps de cuisson</label>
								<div className="col-sm-6">
									<input type="number" name="tempsCuisson" className="form-control" id="tempsCuisson" placeholder="0" value={this.state.tempsCuisson} onChange={this.handleChange} required/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="tempsPreparation" className="col-sm-6 col-form-label">Temps de preparation</label>
								<div className="col-sm-6">
									<input type="number" name="tempsPreparation" className="form-control" id="tempsPreparation" placeholder="0" value={this.state.tempsPreparation} onChange={this.handleChange} required/>
								</div>
							</div>
							{/*
							<div className="form-group row">
								<label htmlFor="tempsPreparation" className="col-sm-6 col-form-label">Type</label>
								<div className="col-sm-6">
									<input type="text" name="type" className="form-control" id="type" placeholder="Desert" value={this.state.type} onChange={this.handleChange} required/>
								</div>
							</div>
							*/}
	
							<div className="form-group row">
								<label htmlFor="dificulte" className="col-sm-6 col-form-label">Dificulte</label>
								<div className="col-sm-6">
									<select name='dificulte' id="dificulte" className="form-control" value={this.state.dificulte} onChange={this.handleChange} required>
										<option defaultValue value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</select>
								</div>
							</div>
	
							<div className="form-group-row">
								<span className='btn btn-default btn-file col-sm-4 mr-4'>
									Image <input type='file' onChange={this.handleUploadImage} />
								</span>
								<progress className='progess-bar col-sm-6' value={this.state.uploadValue} max="100"></progress>
								<img className='col-sm-10 mt-3'  src={this.state.image} alt="file uploaded by user" />
								
							</div>
						</div>
					{/* fin deuxieme Block */}					
						
					</form>
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
}

const mapDispatchToProps = (dispatch) => {
	return {
		createRecette: (recette) => dispatch(createRecette(recette)),
		updateRecette: (recette) => dispatch(updateRecette(recette))
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
		connect(mapStateToProps, mapDispatchToProps),
		firestoreConnect([
			{collection: 'recettes'}
		])
	)(CreateRecette)
