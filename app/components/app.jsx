import React from 'react';
import Navbar from './navbar';
import Allcampus from './Allcampus';
import AllStudent from './AllStudent';
import SingleCampus from './SingleCampus'
import AddStudent from './AddStudent'
import SingleStudent from './SingleStudent';
import EditStudent from './EditStudent';
import AddCampus from './AddCampus';
import EditCampus from './EditCampus';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { fetchCampus,fetchStudent } from '../reducer';
import { connect } from 'react-redux';


class App extends React.Component{

    componentDidMount(){
        this.props.fetchData();
    }

    render(){
        return (
            <div className="container">
                <Navbar />
                <main>
                <Switch>
                    <Route exact path='/campus' component={Allcampus} />
                    <Route exact path='/student' component={AllStudent} />
                    <Route exact path='/campus/add' component={AddCampus} />
                    <Route path='/campus/add/student/:id' component={AddStudent} />
                    <Route path='/campus/edit/:id' component={EditCampus} />
                    <Route path='/campus/:id' component={SingleCampus} />
                    <Route path='/student/add' component={AddStudent} />
                    <Route exact path='/student/:id' component={SingleStudent} />
                    <Route path='/student/edit/:id' component={EditStudent} />
                    <Redirect to='/campus' />
                </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        student : state.student,
        campus : state.campus
    }   
};
const mapDispatchToProps = (dispatch) =>{
    return{
        fetchData : ()=>{
            dispatch(fetchCampus());
            dispatch(fetchStudent());
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));