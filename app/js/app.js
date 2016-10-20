// Module Dashboard
var dashboard = angular.module("dashboard", ['chart.js']);

//Controller for bar chart
dashboard.controller("BarCtrl",   function ($scope,$http) {
    //Reading index.get.json file
    $http.get('index.get.json')
        .success(function (data) {
            $scope.colors = ['#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD','#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD','#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD','#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD', '#1CA8DD'];
            $scope.jsonData = data;
            $scope.totalDrivers = data.length;
            var countMale = 0;
            var countFemale = 0;
            var totalKmdriven = 0;
            var kmDrivendata = [];
            var driverNamedata = [];
            // Counting for total male and female drivers
            angular.forEach($scope.jsonData, function (value, key) {
                if (value.driverGender == "male")
                    countMale++;
                else countFemale++;
                totalKmdriven = totalKmdriven + value.kmDriven;
                kmDrivendata.push(value.kmDriven);
                driverNamedata.push(value.driverName);
            });
            $scope.maleDrivers = countMale;
            $scope.femaleDrivers = countFemale;
            $scope.totalKmdriven = totalKmdriven;
            $scope.labels = driverNamedata;
            $scope.data = kmDrivendata;
        });
});

//Controller for doughnut chart
dashboard.controller("DoughnutCtrl", function ($scope,$http) {
    //Reading index.get.json file
    $http.get('index.get.json')
        .success(function (data) {
            $scope.colors = ['#1CA8DD', '#1BC98E'];
            $scope.jsonData = data;
            var countMale = 0;
            var countFemale = 0;
            var pieChartdata =[];
            // Counting for total male and female drivers
            angular.forEach($scope.jsonData, function (value, key) {
                if (value.driverGender == "male")
                    countMale++;
                else countFemale++;
            });
            pieChartdata.push(((countMale/data.length)*100));
            pieChartdata.push(((countFemale/data.length)*100));
            $scope.labels = ["Male Drivers", "Female Drivers"];
            $scope.data = pieChartdata;
        });
});