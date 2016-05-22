const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/rankings', function(req, res) {
  var rankings = [];
  url = 'http://collegefootball.ap.org/poll'
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html, {
        normalizeWhitespace: true,
      });
      $('body').find('table').eq(0).children().eq(1).children().each(function(i, team) {
        var team = {};
        var i = $(this);
        team.rank = parseInt(i.children().eq(0).text());
        team.team = i.children().eq(2).find('a').eq(0).text();
        rankings.push(team)
      })
    }
    res.send(200, rankings);
  })
})

module.exports = router;