/*! This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
strict:true, undef:true, unused:true, curly:true, browser:true, white:true,
moz:true, esnext:false, indent:2, maxerr:50, devel:true, node:true, boss:true,
globalstrict:true, nomen:false, newcap:false */

"use strict";

const WIDTH = 640;
const HEIGHT = 758;
const START = [0, HEIGHT];
const END = [WIDTH, HEIGHT];

var mountains = [
  {path: [START, [0, HEIGHT/4],
     [WIDTH/2, 2*HEIGHT/3],
     [WIDTH, HEIGHT/4], END],
   gradient: [
     {stop:"0%", colour:"#98856A"}, {stop: "100%", colour:"#021B21"}
   ]},
];
var skyColourBottom = "#FFCA9C";
var skyColourTop = "#1C4A4D";

function draw() {
  var chart = d3.select('.chart');
  var defs = chart.append('defs');
  var gradients = defs.selectAll('radialGradient').data(mountains)
    .enter().append('radialGradient')
    .attr({
      'id': (d, i) => 'mountainGradient' + i,
      'cx': '50%',
      'cy': '0%',
      'r': '65%',
      'fx': '50%',
      'fy': '0%',
    });
  gradients.selectAll('stop').data(d => d.gradient)
    .enter().append('stop')
    .attr({
      'offset': d => d.stop,
      'stop-color': d => d.colour
    });
  chart.style('background', 'linear-gradient(to top, ' + skyColourBottom + ', ' + skyColourTop + ')');
  chart.selectAll('.mountain').data(mountains)
    .enter().append('path').classed('mountain', true)
    .attr({
      'stroke-width': '1',
      'fill': (d, i) => 'url(#mountainGradient' + i + ')',
      'd': d => d3.svg.line()(d.path)
    });
}

draw();