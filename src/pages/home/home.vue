<template>
  <q-page class="main-page">
    <section class="page-section q-pa-md">
      <div class="container-fluid">
        <div class="row q-col-gutter-x-md">
          <div class="col comp-grid">
            <div class="">
              <div class="row items-center q-col-gutter-sm q-px-sm">
                <div class="col">
                  <div class="text-h5 text-bold">Dashboard</div>
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm"></q-separator>
          </div>
        </div>
        <div class="row q-col-gutter-lg q-mt-xs">
          <div class="col-md-4">
            <q-card class="my-card">
              <!-- <q-img :max-width="200px" src="~assets/weather.jpg" /> -->
              <q-img
                src="~assets/weather.jpg"
                spinner-color="white"
                style="height: 140px; max-width: 600px"
              />
              <q-card-section>
                <q-btn
                  fab
                  color="primary"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">Weather Update</div>

                  <div
                    class="
                      col-auto
                      text-grey text-caption
                      q-pt-md
                      row
                      no-wrap
                      items-center
                    "
                  >
                    <q-icon name="place" />
                    Belgrade
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <p>
                  Last Updated:
                  <!-- <span class="text-bold">{{ weather.last_update }} </span> -->

                  {{ $utils.humanDatetime(weather.last_update) }}
                </p>

                <div class="text-subtitle1">
                  {{ $utils.capitalize(weather.description) }}
                </div>
                <div class="text-caption text-grey">Description</div>
                <q-list>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="red" name="thermostat" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ weather.temperature }}</q-item-label>
                      <q-item-label caption>Temperature</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="primary" name="visibility" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ weather.visibility }}</q-item-label>
                      <q-item-label caption>Visibility</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="amber" name="air" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ weather.wind_speed }}</q-item-label>
                      <q-item-label caption>Wind Speed</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="refresh" />
                <q-btn flat color="primary"> Refresh </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="q-pa-md q-mt-md" style="max-width: 350px">
              <q-card-section>
                <div class="text-h6">Request Logs</div>
              </q-card-section>
              <q-list>
                <div v-if="request_logs.length>0">
                  <div v-for="log in request_logs" :key="log.id">
                  <q-item>
                  <q-item-section>
                    <q-item-label>{{log.callsign}} : {{log.request_type}}</q-item-label>
                     
                    <q-item-label caption lines="2"
                      >Action Request: {{log.requested_action}}</q-item-label
                    >

                    <q-item-label caption lines="2"
                      >{{log.status==true?'SUCCESS':'FAILED'}}</q-item-label
                    >
                  </q-item-section>

                  <q-item-section side top>
                   
                    <q-item-label caption>{{$utils.relativeDate(log.last_updated)}}</q-item-label>
                    <q-icon v-if="log.status==true" name="task_alt" color="green" />
                     <q-icon v-else name="cancel" color="red" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
                </div>
                </div>
                <div v-else>
                  <p>No log data</p>
                </div>
              
              </q-list>
            </q-card>
          </div>
          <div class="col-md-7">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">Parking Overview</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>

              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-left">Spot Name</th>
                    <th class="text-right">Spot Type</th>
                    <th class="text-right">Is Available</th>
                    <th class="text-right">Aircraft(Occupancy)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="spot in parking_spots" :key="spot.id">
                    <td class="text-left">{{ spot.spot_name }}</td>
                    <td class="text-right">{{ spot.spot_type }}</td>

                    <td class="text-right">
                      <q-chip
                        v-if="spot.available == true"
                        color="green"
                        text-color="white"
                      >
                        Yes
                      </q-chip>
                      <q-chip v-else color="red" text-color="white">
                        No
                      </q-chip>
                    </td>
                    <td class="text-right">
                      {{ spot.callsign == null ? "-----" : spot.callsign }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      weather: {
        description: "",
        last_update: "No weather data",
        temperature: "",
        visibility: "",
        wind_speed: "",
      },
      parking_spots: [],
      request_logs:[],
      interval:null
    };
  },
  mounted() {
    //this.getWeatherInfo()
  },
  created() {
    
    this.getWeatherInfo();
    this.getParkingOverview();
    this.getRequestLogUpdates();
    
    //Refresh 10 seconds
    this.interval = setInterval(() => this.getRequestLogUpdates(), 10000);
    // setTimeout(() => {
    //           clearInterval(this.interval);
    //         }, 1000);
  },
  methods: {
    getWeatherInfo() {
      axios
        .get("/weather/update")
        .then((response) => {
          //alert('getting weather update')
          console.log(response);

          if (response.data.weather) {
            let weather = response.data.weather;
            this.weather.description = weather.description;
            this.weather.temperature = weather.temperature;
            this.weather.visibility = weather.visibility;
            this.weather.wind_speed = weather.wind["speed"];
            this.weather.last_update = weather.last_update;
          }else{
            //alert('no weather')
            this.weather.last_update="Fetching Data. Please wait..."
            this.fetchFromOpenWeather()
          }
          //alert('pause')
          //this.weather = response.data.weather;

          //this.loading = false;
          //this.is_loading = false;
        })
        .catch(function (error) {});
    },
    getParkingOverview() {
      axios
        .get("/parking/overview")
        .then((response) => {
          
          if (response.data.parking_spots) {
            this.parking_spots = response.data.parking_spots;
          }
        })
        .catch(function (error) {});
    },

    getRequestLogUpdates() {
      axios
        .get("/logs/updates")
        .then((response) => {
          //console.log(response.data);
          if (response.data.logs) {
            this.request_logs = response.data.logs;
          }else{
            this.last_update="No weather data";
          }
        })
        .catch(function (error) {});
    },

     fetchFromOpenWeather() {
      axios
        .get("/public/fetchweatherapi")
        .then((response) => {
          
          if (response.data.message=="success") {
            this.getWeatherInfo();
          }else{
            
          }
        })
        .catch(function (error) {});
    },
  },
};
</script>
