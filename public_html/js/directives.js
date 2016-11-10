/*
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * eritay: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Java and jQuery
 * eritay is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/eritay
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

angular.module('Directives', [])


        .directive('linkusuario', function () {
            return {
                restrict: 'E',
                template: '<a ng-show="obj.id" href="#/usuario/view/{{obj.id}}">{{obj.id}} - {{obj.login}} ({{obj.ciudad}})</a>',
                scope: {
                    obj: "=source"
                }
            }
        })
        .directive('linktipodocumento', function () {
            return {
                restrict: 'E',
                template: '<a ng-show="obj.id" href="#/tipodocumento/view/{{obj.id}}">{{obj.id}}-({{obj.descripcion}})</a>',
                scope: {
                    obj: "=source"
                }
            }
        })

//        .directive('validDate', function () {
//            return {
//                restrict: 'A',
//                require: 'ngModel',
//                link: function (scope, element, attrs, control) {
////                    element.bind("keyup", function (event) {
////                        var newDate = control.$viewValue;
////                        if (!newDate.match(/^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/))
////                            control.$setValidity("validDate", true);
////                        else
////                            control.$setValidity("validDate", false);
////                    });
//                    control.$parsers.push(function (viewValue) {
//                        var newDate = control.$viewValue;
//                        control.$setValidity("validDate", true);
//                        if (typeof newDate === "object" || newDate == "")
//                            return newDate;  // pass through if we clicked date from popup
//                        if (!newDate.match(/^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/))
//                            control.$setValidity("validDate", false);
//                        return viewValue;
//                    });
//                }
//            };
//        })


        .directive('validatemin', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    scope.$watch(attr.validatemin, function () {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    });
                    var minValidator = function (value) {
                        var min = scope.$eval(attr.validatemin) || 0;
                        if (value && value < min) {
                            ctrl.$setValidity('validatemin', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('validatemin', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(minValidator);
                    ctrl.$formatters.push(minValidator);
                }
            };
        })

        .directive('validatemax', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    scope.$watch(attr.validatemax, function () {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    });
                    var maxValidator = function (value) {
                        var max = scope.$eval(attr.validatemax) || Infinity;
                        if (value && value > max) {
                            ctrl.$setValidity('validatemax', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('validatemax', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(maxValidator);
                    ctrl.$formatters.push(maxValidator);
                }
            };
        });



