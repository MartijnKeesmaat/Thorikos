import { normalize } from './helpers';

export function update(svg, spatialGrid, mesos) {
  const t = d3.transition().duration(750);
  const values = mesos.map(i => i.value);
  const highestValue = d3.max(values);

  document.querySelector('.map-legend__middle').innerHTML = highestValue / 2;
  document.querySelector('.map-legend__highest').innerHTML = highestValue;

  svg
    .selectAll('.meso')
    .data(mesos)
    .transition(4000)
    .attr('fill', d => {
      return d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : 'rgba(127, 205, 144, 0)';
    });

  svg
    .selectAll('.value')
    .data(spatialGrid)
    .text(d => d.value);
}

export function drawGrid(svg, spatialGrid, mesos) {
  const values = mesos.map(i => i.value);
  const highestValue = d3.max(values);

  svg
    .selectAll('rect')
    .data(spatialGrid)
    .enter()
    .append('rect')
    .attr('class', 'macroSquare')
    .attr('x', (d, i) => d.column * 50)
    .attr('y', (d, i) => d.row * 50)
    .attr('fill', 'none')
    .attr('width', 50)
    .attr('height', 50)
    .exit()
    .remove();

  var tooltipV = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .text('');

  var tooltipM = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .text('');

  let f = 0;
  let notF = 0;
  svg
    .selectAll('.meso')
    .data(mesos)
    .enter()
    .append('rect')
    .attr('class', 'meso')
    .attr('x', (d, i) => {
      if (i % 4 === 0 && i !== 0) f++;
      const m = mesos[i].rMeso;
      if (m === 2 || m === 4) return spatialGrid[f].column * 50 + 25;
      else return spatialGrid[f].column * 50;
    })
    .attr('y', (d, i) => {
      if (i % 4 === 0 && i !== 0) notF++;
      const m = mesos[i].rMeso;
      if (m === 3 || m === 4) return spatialGrid[notF].row * 50 + 25;
      else return spatialGrid[notF].row * 50;
    })
    .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : 'rgba(255, 255, 255, 0)'))
    .attr('width', 25)
    .attr('height', 25)
    .on('mouseover', d => {
      tooltipV.text(`Objecten: ${d.value || 0}`).style('visibility', 'visible');
      tooltipM.text(`Meso: ${d.meso}`).style('visibility', 'visible');
    })
    .on('mousemove', function() {
      tooltipV.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px');
      tooltipM.style('top', event.pageY - 30 + 'px').style('left', event.pageX + 10 + 'px');
    })
    .on('mouseout', function() {
      tooltipV.style('visibility', 'hidden');
      tooltipM.style('visibility', 'hidden');
      // tooltipM.text(d.value).style('visibility', 'visible');
    })
    .exit()
    .remove();

  svg
    .selectAll('.macro')
    .data(spatialGrid)
    .enter()
    .append('text')
    .attr('class', 'macro')
    .text(d => (d.macro ? d.macro : ''))
    .attr('x', (d, i) => d.column * 50 + 25)
    .attr('y', (d, i) => d.row * 50 + 15);

  document.querySelector('.map-legend__middle').innerHTML = Math.floor(highestValue / 2);
  document.querySelector('.map-legend__highest').innerHTML = highestValue;
}
