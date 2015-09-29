# daycareProxy
A proxy API that scrapes NYC DOH Childcare Connect and outputs JSON

##Background
The NYC Department of Health and Mental Hygiene is responsible for inspections of daycare facilites.  They publish the inspections results and violation details at [https://a816-healthpsi.nyc.gov/ChildCare/SearchAction2.do](https://a816-healthpsi.nyc.gov/ChildCare/SearchAction2.do).  The interface is clunky, and there is no API access to the raw data.

I wanted to make a web map that would allow people to quickly see day cares in their areas and allow them to explore the violations.  Instead of building a scraper that periodically gets all the data and puts it in another database, I decided a proxy API would be best, as it can always get the data straight from the source.

##Endpoint

`daycareproxy.herokuapp.com/id/:id`

Replace :id with the ID of the daycare facility.  You can find this by inspecting the HTTP POST for a daycare's listing at the above URL.

![nyc_health_and_mental_hygiene](https://cloud.githubusercontent.com/assets/1833820/10155733/d1805d12-6646-11e5-87e5-2c8124118868.png)

Here's a working sample API call that you can inspect: [http://daycareproxy.herokuapp.com/id/DC21475](http://daycareproxy.herokuapp.com/id/DC21475)


