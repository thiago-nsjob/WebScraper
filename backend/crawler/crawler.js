var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

var WebParser = require('./WebParser.js'); 

// parse application/json
app.use(bodyParser.json());

app.post('/scrape', function(req, res){
  
  //request the url html
  request(req.body.urlToScrap, function(error, response, html){

    
    if(!error){
      //TODO:for each scrapCommand create a extraction
      let parse = new WebParser(req.body.query);
      //TODO:let the parser solve the extraction
      res.send(parse.parseHtml(html));

      //TODO:store the result on the atlas db
    }
});

});

app.listen(port);

console.log("Crawler linstening to port: "+ port);


/* Request example 
	"sourceName":"Magic Seaweed",
	"urlToScrap":"https://pt.magicseaweed.com/Monduba-Surf-Report/3863/",
	"scrapCommand":[ 
			{   
				"scrapQuery":"$('table.table.table-primary.table-forecast > tbody > tr[data-timestamp][data-date][data-forecast-day]')" ,
				"scrapData":{
						"forecastDate":"$(elem).attr('data-date')",
						"time":"$(elem).find('td.row-title.msw-fc-thour').text()",
						"surfSize":"$(elem).find('td.msw-fc-s.text-center').text()",
						"primarySwell":"$(elem).find('td.msw-fc-fps.msw-fc-ps.background-gray-lighter.text-center').text()",
						"primarySwellDirection":"$(elem).find('td.msw-fc-ps.msw-fc-lps.background-gray-lighter.msw-js-tooltip').text()",
						"primarySwellPeriod":"$(elem).find('td.msw-fc-ps.background-gray-lighter.text-center[title]').text()",
						"jaules":"-",
						"windSpeed":"$(elem).find('td.msw-fc-w.flash.text-center').text()",
						"windDirection":"$(elem).find('td.msw-fc-wa').attr('data-original-title')"

				}
			},
			{
				"scrapQuery":"$('table.table.table-primary.table-forecast > tbody > tr[data-filter='tides']')" ,
				"scrapData":{
						"forecastDate":"$(elem).attr('data-date')",
						"driedTide1Height":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(2) td:nth-child(3)').text()",
						"driedTide1Time":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(2) td:nth-child(2)').text()",
						"driedTide2Height":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(4) td:nth-child(3)').text()",
						"driedTide2Time":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(4) td:nth-child(2)').text()",
						"fullTide1Height":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(1) td:nth-child(3)').text()",
						"fullTide1Time":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(1) td:nth-child(2)').text()",
						"fullTide2Height":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(3) td:nth-child(3)').text()",
						"fullTide2Time":"$(elem).find('div.msw-tide-tables div:first-of-type table tr:nth-child(3) td:nth-child(2)').text()"
					}

			}
	]
	
}

*/