const express = require('express');
const router = express.Router();
const axios=require('axios');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('movies', {movies:[],
    title:'Movies',
  movieSearch:false});
});

router.post('/search',async(req,response)=>{
  try{
    const Omdb_url = `http://www.omdbapi.com/?apikey=10a5e243`;

  const res=await axios.get(Omdb_url,{
    params:{
      s:req.body.title
    }
  })
  // console.log(res.data);
  const movies=res.data.Search || [];
  response.render('movies',{movies:movies,
    title:'Movies',
  movieSearch:true})
}
catch(error){
  console.log(error)
}

})

module.exports = router;
