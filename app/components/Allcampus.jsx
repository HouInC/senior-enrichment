import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Allcampus = (props) => (
    <div className='container'>
        <Link to="/campus/add">
            <button className='btn btn-success' type="Submit">Add Campus</button>
        </Link>
        <div className='row'>

            {
                props.campus.map(campus => (
                    <Link to={`/campus/${campus.id}`} key={campus.id} >
                        <div className='col-xs-5 addBorder'>
                            <img src={campus.image} className="img" />
                            <h1>{campus.name}</h1>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
)

const mapStateToProps = (state) => {
    console.log(state);
    return {
        campus: state.campus
    }
};

export default connect(mapStateToProps)(Allcampus);