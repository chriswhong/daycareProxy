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

It will spit out JSON that looks like this:

```
{
type: "Child Care - Infants/Toddlers",
website: "http://www.2by2preschool.net",
name: "TWO BY TWO CHILDCARE & CONSULTING, LLC",
address1: " 418 KEAP STREET ",
address2: "BROOKLYN, NY 11211",
phone: "718-388-5600",
status: " Permitted ",
permitNumber: "21777",
expiration: " 08/31/2016",
ageRange(Years): "0 - 2",
maximumCapacity: "36",
siteType: "Private",
certifiedtoAdministerMedication: "No",
yearsinOperation: "3 ",
inspections: [
{
date: "04/21/2015",
result: "Compliance Inspection of Open Violations - Previously cited violations corrected",
violations: [
{
summary: "Permittee/applicant submitted incomplete written safety plan.",
category: " Violations requiring correction within two weeks (Critical Violations) ",
subSection: "47.11 (b)",
status: "CORRECTED"
},
{
summary: "Children feeding bottles observed stored/used without being properly labeled with child's name and date of preparation at time of inspection.",
category: " Violations requiring correction within two weeks (Critical Violations) ",
subSection: "47.61 (g)",
status: "CORRECTED"
}
]
},
{
date: "03/27/2015",
result: "Initial Annual Inspection - Reinspection Required",
violations: [
{
summary: "Permittee/applicant submitted incomplete written safety plan.",
category: " Violations requiring correction within two weeks (Critical Violations)",
subSection: "47.11 (b)",
status: "CORRECTED"
},
{
summary: "Children feeding bottles observed stored/used without being properly labeled with child's name and date of preparation at time of inspection.",
category: " Violations requiring correction within two weeks (Critical Violations)",
subSection: "47.61 (g)",
status: "CORRECTED"
},
{
summary: "At time of inspection it was determined that child care service fails to discard unused portions of child milk/food after meal service.",
category: " Violations requiring correction within two weeks (Critical Violations)",
subSection: "47.61 (h)",
status: "CORRECTED"
}
]
},
{
date: "02/25/2015",
result: "Initial Annual Inspection - Passed inspection with no violations"
},
{
date: "09/18/2014",
result: "Compliance Inspection of Open Violations - Previously cited violations corrected",
violations: [
{
summary: "At time of inspection hand wash sinks are not supplied with an adequate amount of running water. At time of inspection water temperature exceeded 115 deg Fahrenheit.",
category: " Violations requiring correction within two weeks (Critical Violations)",
subSection: "47.43 (e)+",
status: "CORRECTED"
}
]
},
{
date: "09/16/2014",
result: "Initial Annual Inspection - Reinspection Required",
violations: [
{
summary: "At time of inspection hand wash sinks are not supplied with an adequate amount of running water. At time of inspection water temperature exceeded 115 deg Fahrenheit.",
category: " Violations requiring correction within two weeks (Critical Violations)",
subSection: "47.43 (e)+",
status: "CORRECTED"
}
]
},
{
date: "03/04/2014",
result: "Initial Annual Inspection - Passed inspection with no violations"
},
{
date: "12/04/2013",
result: "Initial Annual Inspection - Passed inspection with no violations"
},
{
date: "09/04/2013",
result: "Initial Annual Inspection - Passed inspection with no violations"
},
{
date: "12/11/2012",
result: "Initial Annual Inspection - Passed inspection with no violations"
},
{
date: "11/28/2012",
result: "Initial Annual Inspection - Reinspection Required; Violations corrected at time of inspection",
violations: [
{
summary: "Safe sleep environment not provided in infant toddler service; safe sleep environment does not comply with US CPSC and ASTM standards.",
category: " Violations requiring immediate correction (Public Health Hazards)",
subSection: "47.67(f)(1)",
status: "CORRECTED"
}
]
}
]
}
```

