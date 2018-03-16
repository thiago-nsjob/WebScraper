'use strict'

var cheerio = require('cheerio');



class WebParser{
    constructor(query){
        this._query = query;
    }

    get query(){
        return this._query;
    }

    async parseHtml(html){

        //TODO: eval the query and return the scrapData resolved

        let $ = cheerio.load(html);
        let body  = $(this.query).text();

        console.log(body);

        return {body};
    }
    
}

module.exports = WebParser;