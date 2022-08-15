import request from 'supertest';
const app = require('./router');

const testData = {"_id":"62f94d91f711de8e2ad279ac","location":{"lat":39.93,"lon":32.86,"localtime_epoch":1660505374,"name":"test","region":"test","country":"test","tz_id":"Europe/Istanbul","localtime":"2022-08-14T19:29:00.000Z"},"current":{"last_updated_epoch":1660504500,"temp_c":24,"temp_f":75.2,"is_day":0,"condition":{"code":1000,"text":"Clear","icon":"//cdn.weatherapi.com/weather/64x64/night/113.png"},"wind_mph":2.2,"wind_kph":3.6,"wind_degree":10,"pressure_mb":1006,"pressure_in":29.71,"precip_mm":0,"precip_in":0,"humidity":54,"cloud":0,"feelslike_c":24.6,"feelslike_f":76.3,"vis_km":10,"vis_miles":6,"uv":1,"gust_mph":9.8,"gust_kph":15.8,"last_updated":"2022-08-14T19:15:00.000Z","wind_dir":"N"},"name":"test"}

/* Sends 'Test'as the locationName and if it works correctly the return from the db should be testData */
describe("fetches data properly", () => {
    test("GET /forcasts/test", (done) => {
        request(app)
            .get("/test")
            .expect(200)
            .expect((res) => {
                res.body.data = testData;
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});