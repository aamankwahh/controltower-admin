<template>
  <q-page class="main-page">
    <section class="page-section q-pa-md">
      <div class="container-fluid">
        <div class="row q-col-gutter-x-md">
          <div class="col comp-grid">
            <div class="">
              <div class="row items-center q-col-gutter-sm q-px-sm">
                <div class="col">
                  <div class="text-h6 text-bold">Dashboard</div>
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm"></q-separator>
          </div>
        </div>
        <div class="row q-col-gutter-lg">
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
                
                  <p>Last Updated: <span class=" text-bold">{{weather.last_update}}</span></p>
                
                <div class="text-subtitle1">{{weather.description}}</div>
                <div class="text-caption text-grey">Description</div>
                <q-list>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="red" name="thermostat" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{weather.temperature}}</q-item-label>
                      <q-item-label caption>Temperature</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="primary" name="visibility" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{weather.visibility}}</q-item-label>
                      <q-item-label caption>Visibility</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="amber" name="air" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{weather.wind['speed']}}</q-item-label>
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
                    <th class="text-left">Dessert (100g serving)</th>
                    <th class="text-right">Calories</th>
                    <th class="text-right">Fat (g)</th>
                    <th class="text-right">Carbs (g)</th>
                    <th class="text-right">Protein (g)</th>
                    <th class="text-right">Sodium (mg)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Frozen Yogurt</td>
                    <td class="text-right">159</td>
                    <td class="text-right">6</td>
                    <td class="text-right">24</td>
                    <td class="text-right">4</td>
                    <td class="text-right">87</td>
                  </tr>
                  <tr>
                    <td class="text-left">Ice cream sandwich</td>
                    <td class="text-right">237</td>
                    <td class="text-right">9</td>
                    <td class="text-right">37</td>
                    <td class="text-right">4.3</td>
                    <td class="text-right">129</td>
                  </tr>
                  <tr>
                    <td class="text-left">Eclair</td>
                    <td class="text-right">262</td>
                    <td class="text-right">16</td>
                    <td class="text-right">23</td>
                    <td class="text-right">6</td>
                    <td class="text-right">337</td>
                  </tr>
                  <tr>
                    <td class="text-left">Cupcake</td>
                    <td class="text-right">305</td>
                    <td class="text-right">3.7</td>
                    <td class="text-right">67</td>
                    <td class="text-right">4.3</td>
                    <td class="text-right">413</td>
                  </tr>
                  <tr>
                    <td class="text-left">Gingerbread</td>
                    <td class="text-right">356</td>
                    <td class="text-right">16</td>
                    <td class="text-right">49</td>
                    <td class="text-right">3.9</td>
                    <td class="text-right">327</td>
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
import axios from 'axios'
export default {
 data(){
  return{
    weather:{},
    parking:[]
  }
 },
 mounted(){},
 created(){
  //this.getWeatherInfo()
 },
 methods:{
  getWeatherInfo(){
      
      axios
        .get("/weather/update")
        .then((response) => {
          console.log(response)
          this.weather = response.data.weather;
         
          //this.loading = false;
          //this.is_loading = false;
        })
        .catch(function (error) {});
  },
  getParkingOverview(){
    axios
        .get("/parking/overview")
        .then((response) => {
          this.data = response.data;
          if (this.data[0].weather) {
          
          }
          this.loading = false;
          this.is_loading = false;
        })
        .catch(function (error) {});
  }
 }
};
</script>
