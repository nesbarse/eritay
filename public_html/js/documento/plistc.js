/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

moduloDocumento.controller('DocumentoPListcController', ['$scope', '$routeParams', 'serverService', '$location',
    function ($scope, $routeParams, serverService, $location) {

        $scope.Fields = [
            {name: "id", shortname: "ID", longname: "Identificador", visible: true},
            {name: "titulo", shortname: "Título", longname: "Título", visible: true},
            {name: "contenido", shortname: "Contenido", longname: "Contenido", visible: false},
            {name: "alta", shortname: "Alta", longname: "Fecha de alta", visible: false},
            {name: "cambio", shortname: "Cambio", longname: "Fecha de último cambio", visible: false},
            {name: "hits", shortname: "Hits", longname: "Visitas", visible: true},
            {name: "id_usuario", shortname: "Usuario", longname: "Usuario propietario", visible: true},
            {name: "id_tipodocumento", shortname: "Tipo", longname: "Tipo de documento", visible: true},
            {name: "etiquetas", shortname: "Etiquetas", longname: "Etiquetas", visible: false},
            {name: "publicado", shortname: "¿Publ.?", longname: "¿Publicado?", visible: true},
            {name: "portada", shortname: "¿Port.?", longname: "¿Portada?", visible: true},
            {name: "destacado", shortname: "¿Dest.?", longname: "¿Destacado?", visible: true}
        ];

        $scope.ob = "documento";
        $scope.op = "plist";
        //--
        $scope.title = "Listado de documentos";
        $scope.icon = "fa-file-text-o";
        
 if (!$routeParams.page || $routeParams.page < 1) {
            $scope.numpage = 1;
        } else {
            $scope.numpage = $routeParams.page;
        }

        if (!$routeParams.rpp || $routeParams.rpp < 1) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        $scope.order = "";
        $scope.ordervalue = "";

        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";

        if ($routeParams.filter) {
            $scope.filterParams = $routeParams.filter;
        } else {
            $scope.filterParams = null;
        }
        ;

        if ($routeParams.order) {
            $scope.orderParams = $routeParams.order;
        } else {
            $scope.orderParams = null;
        }
        ;

        if ($routeParams.sfilter) {
            $scope.sfilterParams = $routeParams.sfilter;
        } else {
            $scope.sfilterParams = null;
        }
        ;

        if ($routeParams.sfilter) {
            $scope.filterExpression = $routeParams.filter + '+' + $routeParams.sfilter;
        } else {
            $scope.filterExpression = $routeParams.filter;
        }


        serverService.promise_getCount($scope.ob, $scope.filterExpression).then(function (response) {
            if (response.status == 200) {
                $scope.registers = response.data.message;
                $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                if ($scope.numpage > $scope.pages) {
                    $scope.numpage = $scope.pages;
                }
                return serverService.promise_getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).then(function (response) {
            if (response.status == 200) {
                $scope.page = response.data.message;
                $scope.status = "";
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });
    }]);