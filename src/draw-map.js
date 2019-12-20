import { normalize } from './helpers';

export function drawGrid(svg, spatialGrid) {
  svg
    .selectAll('rect')
    .data(spatialGrid)
    .enter()
    .append('rect')
    .attr('x', (d, i) => d.column * 50)
    .attr('y', (d, i) => d.row * 50)
    .attr('fill', d => (d.value ? `rgba(16, 115, 197, ${normalize(d.value, 0, 1030)})` : '#fff')) // TODO Create a slider for the 500
    .attr('width', 50)
    .attr('height', 50);

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
