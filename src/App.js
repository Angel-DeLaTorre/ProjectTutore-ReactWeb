import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Home from './Components/recettes/Home'
import RecetteDetails from './Components/recettes/RecetteDetails'
import CreateRecette from './Components/recettes/CreateRecette'

class App extends Component {
  
	constructor(){
		super();
		this.state = {
			recettes: [
			]
		};
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar/>
					<div className="content">
						<Switch>
							<Route exact path='/' name='home' component={Home} />
							<Route path='/recette/:id' name='recette' component={RecetteDetails} />
							<Route path='/create' name='create' component={CreateRecette} />
							<Route path='/update/:id' name='update' component={CreateRecette} />
						</Switch>
					</div>
					
      		</div>
			</BrowserRouter>
    );
  }
}

export default App;
