var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET daycare id. */
// try http://localhost:3000/id/DC21475
// or http://localhost:3000/id/DC25341
// or http://localhost:3000/id/DC25292

router.get('/id/:id', function(req, res, next) {
  var id = req.params.id;
  getDaycareData(id, res);
});

function getDaycareData(id,res) {
  //get daycare page
  request.post({
    url:'https://a816-healthpsi.nyc.gov/ChildCare/WDetail.do', 
    form: {
      linkPK:id
    }
  }, 
  function(err,httpResponse,body) {
    var $ = cheerio.load(body);

    var data = {};

    //get "Contact Information" box
    $('.projectBox').first().children().each(function(i,item) {
      var value = $(item).text().trim();

      switch(i) {
        case 0:
          data.type = value;
          break;

        case 1:
          value = $(item).find('a').attr('href');
          data.website = value;
          break;

        case 2:
          data.name = value;
          break;

        case 3:
          data.address1 = value;
          break;

        case 4:
          data.address2 = value;
          break;

        case 5:
          data.phone = value;
          break;
      }
    });
    
    //get "More Information" box
    $('.projectBox').eq(1).find('table').children().each(function(i,item) {
      var key = $(item).find('h5').eq(0).text();
      key = key.replace(/\s+/g, '');
      key = firstToLowerCase(key);

      var value = $(item).find('h5').eq(1).text();
      data[key] = value;
    })

    data.inspections = [];

    
    //get latest inspection result
    var inspection = {};

    //get the date
    var value = $('.tab-pane').eq(0).find('table').find('table').find('td:contains(Date)').text();
    value = value.substr(value.length - 10);
    inspection.date = value;

    //get the result
    var value = $('.tab-pane').eq(0).find('table').find('table').find('td:contains(Result)').text();
    value = value.slice(24,value.length).trim();
    inspection.result = value;

    if(value.indexOf("no violations") == -1) {
      //get violations
      inspection.violations = [];

      $('.tab-pane').eq(0).find('table').children('tr').eq(1).find('table').find('table').children().each(function(i,item) {

        //skip header row
        if(i>0) {
          var violation = {};
          $(item).children().each(function(i,column) {
            var value = $(column).text();
            switch(i) {
              case 0:
                violation.summary = value;
                break;

              case 1:
                violation.category = value;
                break;

              case 2:
                violation.subSection = value;
                break;

              case 3:
                violation.status = value;
                break;
            }
          })
          inspection.violations.push(violation);
        }
      })
    } 

    

    data.inspections.push(inspection);

    //get previous inspections
    $('.tab-pane').eq(1).find('.accordion').children().each(function(i,item) {
        var inspection = {}
        //get date and result
        var headingText = $(item).find('.accordion-heading').text().trim();
        var date = headingText.split('\n')[0].trim();
        date = date.substr(date.length - 10);
        var result = headingText.split('\n')[1].trim()
        result = result.slice(9,result.length);
        
        inspection.date = date;
        inspection.result = result;
        

        if(result.indexOf("no violations") == -1) {

          //get violations
          inspection.violations = [];
          $(item).find('.accordion-body').find('table').children().each(function(i,item) {

            //skip header row
            if(i>0) {
              var violation = {};
              $(item).children().each(function(i,column) {
                var value = $(column).text();
                switch(i) {
                  case 0:
                    violation.summary = value;
                    break;

                  case 1:
                    violation.category = value;
                    break;

                  case 2:
                    violation.subSection = value;
                    break;

                  case 3:
                    violation.status = value;
                    break;
                }
              })
              inspection.violations.push(violation);
            }
          })
        }

        data.inspections.push(inspection);

    });

   



    res.send(data);
  });
}

function firstToLowerCase( str ) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

module.exports = router;
