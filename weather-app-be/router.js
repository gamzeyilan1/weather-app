const express = require('express');
const fetch = require('node-fetch');
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const dbURL = '';

let router = express.Router();

/* Checks if the DB connection is successful */
async function connect() {
    try {
        await mongoose.connect(dbURL);
         console.log("Connected to database successfully.")
    } catch (error) {
         await console.log(error);
    }
}

connect();

/* Creates a Schema for the data drawn from the DB, with the type ANY and structure ANY */
var Any = new Schema({
    "_id": {
        "$oid": {
            "type": "ObjectId"
        }
    },
    "name": {
        "type": "String"
    },
    "location": {
        "name": {
            "type": "String"
        },
        "region": {
            "type": "String"
        },
        "country": {
            "type": "String"
        },
        "lat": {
            "$numberDouble": {
                "type": "String"
            }
        },
        "lon": {
            "$numberDouble": {
                "type": "String"
            }
        },
        "tz_id": {
            "type": "String"
        },
        "localtime_epoch": {
            "$numberInt": {
                "type": "String"
            }
        },
        "localtime": {
            "type": "Date"
        }
    },
    "current": {
        "last_updated_epoch": {
            "$numberInt": {
                "type": "String"
            }
        },
        "last_updated": {
            "type": "Date"
        },
        "temp_c": {
            "$numberInt": {
                "type": "String"
            }
        },
        "temp_f": {
            "$numberDouble": {
                "type": "Date"
            }
        },
        "is_day": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "condition": {
            "text": {
                "type": "String"
            },
            "icon": {
                "type": "String"
            },
            "code": {
                "$numberInt": {
                    "type": "Date"
                }
            }
        },
        "wind_mph": {
            "$numberDouble": {
                "type": "Date"
            }
        },
        "wind_kph": {
            "$numberDouble": {
                "type": "String"
            }
        },
        "wind_degree": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "wind_dir": {
            "type": "String"
        },
        "pressure_mb": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "pressure_in": {
            "$numberDouble": {
                "type": "String"
            }
        },
        "precip_mm": {
            "$numberDouble": {
                "type": "Date"
            }
        },
        "precip_in": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "humidity": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "cloud": {
            "$numberInt": {
                "type": "String"
            }
        },
        "feelslike_c": {
            "$numberDouble": {
                "type": "String"
            }
        },
        "feelslike_f": {
            "$numberDouble": {
                "type": "Date"
            }
        },
        "vis_km": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "vis_miles": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "uv": {
            "$numberInt": {
                "type": "Date"
            }
        },
        "gust_mph": {
            "$numberDouble": {
                "type": "Date"
            }
        },
        "gust_kph": {
            "$numberDouble": {
                "type": "String"
            }
        }
    }
}, {
    strictQuery: true
});


/* Takes the location name string from the query and searches the db for corresponding weather data,
 if not found then draws the data from the live api */
router.get('/:locationName', async function (req, res) {
    const locationName = req.params.locationName;

    const weatherData = mongoose.model('weather-data', Any, 'weather-data');
    var dbWeatherData;

    async function getWeatherData(locationName) {
        try {
            dbWeatherData = await weatherData.find({'name': locationName.toLowerCase()}).exec();
            dbWeatherData = dbWeatherData[0];
        } catch (err){
            console.log(err)
        }
    }

    await getWeatherData(locationName);

    function returnData (locationName) {
        if (typeof dbWeatherData !== 'undefined') {
            console.log("got from db")
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(dbWeatherData);
            return dbWeatherData;
        } else {

            const url = "http://api.weatherapi.com/v1/current.json?key=73377ce65160471ab15111642221308&q=" + locationName;
            fetch(url)
                .then(response => {
                    console.log("got from api")
                    return response.json();
                })
                .then(data => {

                    fetch(url)
                        .then(r => {
                            let q = r.json();
                            return q;
                        })
                        .then(d => {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.send(d);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    await returnData(locationName);
})

module.exports = router;
