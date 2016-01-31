import Reflux from 'reflux';

var actions = Reflux.createActions([
    "testAction", // a dummy action to which the store listens to
    "submitDestination",
    "findSuggestDestination",
    "checkTodo",
    "submitTodo",
    "searchNearByHotel",
    "setHotel",
    "submitHotel",
    "findBusRoutes",
    "findUberPrice",
    "findRentalCars",
    "hoverHotel",
    "unhoverHotel",
    "hoverDestination",
    "removeSuggestDestination",
    "findTodo",
    "setStartDate",
    "setEndDate",
    "submitStartEndDate",
    "toStep"
]);

module.exports = actions;