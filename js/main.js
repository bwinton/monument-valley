/*! This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
strict:true, undef:true, unused:true, curly:true, browser:true, white:true,
moz:true, esnext:true, indent:2, maxerr:50, devel:true, node:true, boss:true,
globalstrict:true, nomen:false, newcap:false */
/* global d3 */


"use strict";

const WIDTH = 640;
const HEIGHT = 758;

const MOUNTAIN_ANIMATION = 2000;

const GIANT_V = [
  [0, HEIGHT * 2],
  [0, HEIGHT/4],
  [WIDTH/2, 2*HEIGHT/3],
  [WIDTH, HEIGHT/4],
  [WIDTH, HEIGHT * 2]
];

const GIANT_M4 = [
  [0, HEIGHT * 2],
  [0, HEIGHT/3],
  [WIDTH/8, HEIGHT/4],
  [WIDTH/2, HEIGHT*0.56],
  [7*WIDTH/8, HEIGHT/4],
  [WIDTH, HEIGHT/3],
  [WIDTH, HEIGHT * 2]
];

/*
const GIANT_M3 = [
];

const GIANT_M2 = [
];

const GIANT_M1 = [
];
*/

// Back to front…
const MOUNTAIN_DATA = [{
    start: GIANT_M4,
    offset: [0, -90],
    end: [0, -20],
    gradient: [{stop:"0%", colour:"#ADB091"}, {stop: "100%", colour:"#534F45"}]
  }, {
    start: GIANT_V,
    offset: [0, -155],
    end: [0, -45],
    gradient: [{stop:"0%", colour:"#578D82"}, {stop: "100%", colour:"#1A2221"}]
  }, {
    start: GIANT_V,
    offset: [0, -140],
    end: [0, 0],
    gradient: [{stop:"0%", colour:"#98856A"}, {stop: "100%", colour:"#021B21"}]
  }
];
var skyColourBottom = "#FFCA9C";
var skyColourTop = "#1C4A4D";

function draw() {
  var chart = d3.select('.chart');
  chart.attr({state: 'start'});
  var defs = chart.append('defs');
  var gradients = defs.selectAll('radialGradient').data(MOUNTAIN_DATA)
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
  var mountains = chart.selectAll('.mountain');
  mountains.data(MOUNTAIN_DATA)
    .enter().append('g').classed('mountain', true)
    .attr({'transform': d => 'translate(' + d.offset[0] + ','+ d.offset[1] + ')'})
    .append('path').attr({
      'stroke-width': '1',
      'fill': (d, i) => 'url(#mountainGradient' + i + ')',
      'd': d => d3.svg.line()(d.start)
    });

  mountains = chart.selectAll('.mountain');
  chart.on('click', d => {
    var state = chart.attr('state');
    if (state === 'start') {
      mountains.transition().duration(MOUNTAIN_ANIMATION)
        .attr({'transform': d => 'translate(' + d.end[0] + ','+ d.end[1] + ')'});
      chart.attr({state: 'end'});
    } else if (state === 'end') {
      mountains.transition().duration(MOUNTAIN_ANIMATION)
        .attr({'transform': d => 'translate(' + d.offset[0] + ','+ d.offset[1] + ')'});
      chart.attr({state: 'start'});
    }
  });
}

draw();