import React, { Component } from 'react';
import RecetteList from './RecettesList'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Home extends Component {
    render(){
        const { recettes } = this.props;
        return (
            <div className='home conteiner'>
                <RecetteList recettes={recettes} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recettes: state.firestore.ordered.recettes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'recettes', orderBy: ['date', 'desc'],}
    ])
)(Home)