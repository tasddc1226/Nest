const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    

    // DB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            
            // front로 숫자 정보 보내기
            res.status(200).json({ success:true, favoriteNumber: info.length})
        })
    

})


module.exports = router;