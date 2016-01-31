var expediaKey = "qmh5X6yG43XRtMtsbZn955CDyq4G4w92";
var googleKey = "AIzaSyDR-9bW4YVK7RtahpMw-M1zYopG__qUqkI";
var uberKey = "qRlXb7dH5daQb0Bcufw4QvECWG_kN3Oxv9-Kzaqn";
var Reflux = require('reflux');
var actions = require('../actions/actions');
var $ = require('jquery');


var Store = Reflux.createStore({
    listenables: [actions],
    data: {
    	uberArray:[],
    	busArray:[],
    	step: 0,
        msg: "",
        thingsToDo:[],
        thingsTodoFood:[],
        thingsTodoSightSeeing:[],
        thingsTodoNightLife:[],
        destinationSuggestion:[],
        selectedTodo:[],
        selectedDestination: null,
        nearByHotel:[],
        selectedHotel: null,
        rentalCars:null,
        farthestUber:null,
        farthestBus:null,
        cheapestCarRental: null,
        startDate:null,
        endDate:null
    },
    onSetStartDate(date) {
    	this.data.startDate = date;
    	this.trigger(this.data);
    },
    onSetEndDate(date) {
    	this.data.endDate = date;
    	this.trigger(this.data);
    },
    onHoverDestination(i){
    	if(!this.data.destinationSuggestion[i].hover){
    		this.data.destinationSuggestion[i].hover = true;
    	}else{
    		this.data.destinationSuggestion[i].hover = false;
    	}
    	this.trigger(this.data);
    },
    onTestAction() {
        // dummy handler for action
        this.data.msg = "fuck this shit"
        // publish changes to view
        this.trigger(this.data);
    },
    init() {
        // initial values
        this.data.msg = "Click me";
        this.trigger(this.data);
    },
    getInitialState() {
        // export state for view
        return this.data
    },
    onFindTodo(todoID){
    	for (var i = this.data.thingsToDo.length - 1; i >= 0; i--) {
    		if(this.data.thingsToDo[i].id == todoID){
    			if(!this.data.thingsToDo[i].selected) {
		            this.data.thingsToDo[i].selected = true;
		        }else{
		            this.data.thingsToDo[i].selected = false;
		        }
		        break;
    		}
    	};
    	this.trigger(this.data);
    },
    onCheckTodo(i) {
        if(this.data.thingsToDo[i].selected) {
            this.data.thingsToDo[i].selected = false;
        }else{
            this.data.thingsToDo[i].selected = true;
        }
        this.trigger(this.data);
    },
    onSubmitTodo() {
        for (var i = this.data.thingsToDo.length - 1; i >= 0; i--) {
            if(this.data.thingsToDo[i].selected) {
                this.data.selectedTodo.push(this.data.thingsToDo[i]);
            }
        };
        this.data.step = 2;
        this.trigger(this.data);
    },

    onFindSuggestDestination(destination) {
        var self = this;
        $.ajax({
            url: 'http://terminal2.expedia.com/x/suggestions/regions',
            type: 'GET',
            data: {
                query: destination,
                apikey: expediaKey
            },
            success: function (data) {
                self.data.destinationSuggestion = [];
                for (var i = 0; i <= 3; i++) {
                    if(self.data.destinationSuggestion[0]) {
                        if(self.data.destinationSuggestion[0].s != data.sr[i].s) {
                            self.data.destinationSuggestion.push(data.sr[i])
                        }
                    }else {
                        self.data.destinationSuggestion.push(data.sr[i])
                    }
                };
                self.trigger(self.data)
            }
        });
    },

    onSearchNearByHotel() {
        var self = this;

        $.ajax({
            url: 'http://terminal2.expedia.com/x/hotels',
            type: 'GET',
            data: {
                dates: self.data.startDate.toString() + ',' + self.data.endDate.toString(),
                radius: '10km',
                limit: 30,
                location: self.data.selectedDestination.ll.lat + ',' + self.data.selectedDestination.ll.lng,
                apikey: expediaKey
            },
            success: function (data) {
                self.data.nearByHotel = [];
                for (var i = 0; i <= 7; i++) {
                    self.data.nearByHotel.push(data.HotelInfoList.HotelInfo[i])
                };
                self.trigger(self.data);
            }
        });
    },
    onToStep(step){
    	this.data.step = step;
    	this.trigger(this.data);
    },
    onSetHotel(index) {
        for (var i = this.data.nearByHotel.length - 1; i >= 0; i--) {
            if(i == index) {
                this.data.nearByHotel[i].selected = true;
            }else{
                this.data.nearByHotel[i].selected = false;
            }
        };
        this.data.selectedHotel = this.data.nearByHotel[index];
        this.trigger(this.data);
    },
    onSubmitHotel() {
        for (var i = this.data.selectedTodo.length - 1; i >= 0; i--) {
            actions.findBusRoutes(i);
            actions.findUberPrice(i);
        };
        this.data.step = 3
        this.trigger(this.data);
    },
    onRemoveSuggestDestination() {
    	this.data.destinationSuggestion = [];
    	this.trigger(this.data);
    },
    onFindUberPrice(i) {
        var self = this;
        $.ajax({
            url: 'https://api.uber.com/v1/estimates/price',
            type: 'GET',
            data: {
                start_latitude: parseFloat(self.data.selectedHotel.Location.GeoLocation.Latitude),
                start_longitude: parseFloat(self.data.selectedHotel.Location.GeoLocation.Longitude),
                end_latitude: parseFloat(self.data.selectedTodo[i].latLng.split(",")[0]),
                end_longitude: parseFloat(self.data.selectedTodo[i].latLng.split(",")[1]),
                server_token: uberKey
            },
            success: function (data) {
                self.data.selectedTodo[i].uberPrice = data;
                self.data.uberArray.push(data)
                if(self.data.uberArray.length === self.data.selectedTodo.length) {
                	var highest = 0;
                	self.data.farthestUber = {};
                	for (var j = self.data.selectedTodo.length - 1; j >= 0; j--) {
                		if(self.data.selectedTodo[j].uberPrice.prices[0].high_estimate > highest){
                			highest = self.data.selectedTodo[j].uberPrice.prices[0].high_estimate
                			self.data.farthestUber.uber = self.data.selectedTodo[j].uberPrice.prices[0].high_estimate
                			self.data.farthestUber.place = self.data.selectedTodo[j].title;
                		}
                	};
                }

                self.trigger(self.data);
            }
        });
    },
    onFindBusRoutes(i) {
        var self = this;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/directions/json',
            type: 'GET',
            data: {
                origin: self.data.selectedHotel.Location.GeoLocation.Latitude + "," + self.data.selectedHotel.Location.GeoLocation.Longitude,
                destination: self.data.selectedTodo[i].latLng,
                key: googleKey,
                mode: 'transit'
            },
            success: function (data) {
                self.data.selectedTodo[i].busRoutes = data;
                self.data.busArray.push(data)

                if(self.data.busArray.length == self.data.selectedTodo.length) {
                	var highest = 0;
                	self.data.farthestBus = {};
                	for (var j = self.data.selectedTodo.length - 1; j >= 0; j--) {
                		if(self.data.selectedTodo[j].busRoutes.routes[0].legs[0].duration.value > highest){
                			highest = self.data.selectedTodo[j].busRoutes.routes[0].legs[0].duration.value
                			self.data.farthestBus.bus = self.data.selectedTodo[j].busRoutes.routes[0].legs[0].duration.text
                			self.data.farthestBus.place = self.data.selectedTodo[j].title;
                		}
                	};
                }

                // if(self.data.farthestBus){
                // 	if(data.routes[0].legs[0].duration.value > self.data.farthestBus.bus.routes[0].legs[0].duration.value) {
                // 		self.data.farthestBus.bus = data;
                // 		self.data.farthestBus.place = self.data.selectedTodo[i];
                // 	}
                // }else{
                // 	self.data.farthestBus = {}
                // 	self.data.farthestBus.bus = data;
                // 	self.data.farthestBus.place = self.data.selectedTodo[i];
                // }
                self.trigger(self.data);
                console.log("bus route",self.data.selectedTodo[i].busRoutes)

            }
        });
    },
    onSubmitStartEndDate(){
    	actions.findRentalCars();
    	actions.searchNearByHotel();
    	this.data.step = 1;
    	this.trigger(this.data);
    },
    onSubmitDestination(destination) {
        var self = this;
        self.data.destinationSuggestion = [];
        self.data.selectedDestination = destination;
        $.ajax({
            url: 'http://terminal2.expedia.com/x/activities/search',
            type: 'GET',
            data: {
                location: destination.s,
                apikey: expediaKey
            },
            success: function (data) {
                self.data.thingsToDo = [];
                for (var i = 0; i <= 50; i++) {
                    if(data.activities[i].categories[0].toLowerCase().indexOf("attractions") > -1 ||  data.activities[i].categories[0].toLowerCase().indexOf("sightseeing") > -1 || data.activities[i].categories[0].toLowerCase().indexOf("water") > -1) {
                    	self.data.thingsTodoSightSeeing.push(data.activities[i])
                    	self.data.thingsToDo.push(data.activities[i])
                    }else if(data.activities[i].categories[0].toLowerCase().indexOf("night") > -1){
                    	self.data.thingsTodoNightLife.push(data.activities[i])
                    	self.data.thingsToDo.push(data.activities[i])
                    }else if(data.activities[i].categories[0].toLowerCase().indexOf("food") > -1){
                    	self.data.thingsTodoFood.push(data.activities[i])
                    	self.data.thingsToDo.push(data.activities[i])
                    }
                };
                self.trigger(self.data);

            }
        });
    },
    hoverHotel(i) {
        this.data.nearByHotel[i].hovered = true;
        this.trigger(this.data);
    },
    unhoverHotel(i) {
        this.data.nearByHotel[i].hovered = false;
        this.trigger(this.data);
    },
    onFindRentalCars() {
        var self = this;
        $.ajax({
            url: 'http://terminal2.expedia.com/x/cars/search',
            type: 'GET',
            data: {
                pickupdate: self.data.startDate.toString(),
                dropoffdate: self.data.endDate.toString(),
                pickuplocation: self.data.selectedDestination.a,
                dropofflocation: self.data.selectedDestination.a,
                sort: 'price',
                limit: '10',
                apikey: expediaKey
            },
            success: function (data) {
                self.data.rentalCars = data
                self.data.cheapestCarRental = data.CarInfoList.CarInfo[0];
                self.trigger(self.data);
                console.log("rental cars", self.data.rentalCars)
            }
        });

    }

});

module.exports = Store;
