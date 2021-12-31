import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

    const {movieId} = useParams()
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        // console.log(movieId)
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })

        

    }, [])

    return (
        <div>

        {/* Header */}
        {Movie.backdrop_path &&
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
        }
        

        {/* body */}
        <div style={{ width: '85%', margin: '1rem auto'}}>

            {/* Movie Info */}
            <MovieInfo movie={Movie}/>

            <br />
            {/* Actors Grid */}

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <button>Toggle Actor View</button>
            </div>
        </div>


        </div>
    )
   
}

export default MovieDetail
