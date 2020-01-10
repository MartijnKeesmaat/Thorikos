import { normalize } from './helpers';

export function update(svg, spatialGrid) {
  const t = d3.transition().duration(750);
  const values = spatialGrid.map(i => i.value);
  const highestValue = d3.max(values);

  svg
    .selectAll('rect')
    .data(spatialGrid)
    .transition(t)
    .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : '#fff')); // TODO Create a slider for the 500

  svg
    .selectAll('.value')
    .data(spatialGrid)
    .text(d => d.value);
}

export function drawGrid(svg, spatialGrid) {
  const values = spatialGrid.map(i => i.value);
  const highestValue = d3.max(values);

  svg
    .selectAll('rect')
    .data(spatialGrid)
    .enter()
    .append('rect')
    .attr('x', (d, i) => d.column * 50)
    .attr('y', (d, i) => d.row * 50)
    .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : '#fff')) // TODO Create a slider for the 500
    .attr('width', 50)
    .attr('height', 50)
    .exit()
    .remove();

  svg
    .selectAll('.macro')
    .data(spatialGrid)
    .enter()
    .append('text')
    .attr('class', 'macro')
    .text(d => (d.macro ? d.macro : ''))
    .attr('x', (d, i) => d.column * 50 + 15)
    .attr('y', (d, i) => d.row * 50 + 25);

  svg
    .selectAll('.value')
    .data(spatialGrid)
    .enter()
    .append('text')
    .attr('class', 'value')
    .text(d => d.value)
    .attr('x', (d, i) => d.column * 50 + 15)
    .attr('y', (d, i) => d.row * 50 + 40);
}
