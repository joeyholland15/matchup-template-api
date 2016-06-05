const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const router = express.Router();

//will eventually factor these out into a controller
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

router.get('/roster/:team', function(req, res) {
  var players = [];
  var id = req.params.team;
  url = 'http://www.cfbstats.com/2015/team/' + id + '/roster.html';
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html, {
        normalizeWhitespace: true,
      });
      $('table.team-roster').children().each(function(i, obj) {
        var i = $(this);
        var player = {
          no: i.children().eq(0).text(),
          name: i.children().eq(1).text(),
          pos: i.children().eq(2).text(),
          year: i.children().eq(3).text(),
          ht: i.children().eq(4).text(),
          wt: i.children().eq(5).text(),
        }
        players.push(player);
      });
    }
    res.send(200, players);
  })
})

module.exports = router;