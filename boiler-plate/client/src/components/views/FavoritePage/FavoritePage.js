import React, { useEffect, useState } from 'react'
import './favorite.css'
import axios from 'axios'
import { Popover, Button } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {
  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavoritedMovie()
  }, [])

  const fetchFavoritedMovie = () => {
    axios
      .post('/api/favorite/getFavoritedMovie', {
        userFrom: localStorage.getItem('userId'),
      })
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.favorites)
        } else {
          alert('영화 정보를 가져오는데 실패했습니다.')
        }
      })
  }

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    }

    axios
      .post('api/favorite/removeFromFavorite', variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoritedMovie()
        } else {
          alert('리스트에서 지우는데 실패했습니다.')
        }
      })
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          'NO IMAGE'
        )}
      </div>
    )

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            remove
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>

        <tbody>{renderCards}</tbody>
      </table>
    </div>
  )
}

export default FavoritePage
