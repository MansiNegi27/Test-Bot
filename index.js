// Contains the logic for the twitter //

var Twitter = require('twitter')
var config = require('./config.js')

var T = new Twitter(config)
// passes the params to the twitter API

// make a request to search tweets based on the params
var params = {
  q: '#node.js',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

T.get('search/tweets', params, function (err, data, response) {
  if (!err) {
  	// loop through the available tweets
    for (let i = 0; i < data.statuses.length; i++) {
    	// get tweet id from the data
    	let id = { id: data.statuses[i].id_str }
    	// Mark the tweet as favorite
    	T.post('favorites/create', id, function (err, response) {
    		if (err) {
    			console.log(err)
    		} else {
    			let username = response.user.screen_name
          		let tweetId = response.id_str
          		console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
    		}
    	})
    }
  } else {
    console.log(err)
  }
})

// Now implement the favorites
