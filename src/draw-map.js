import { normalize } from './helpers';

export function update(svg, spatialGrid, mesos) {
  const t = d3.transition().duration(750);
  const values = mesos.map(i => i.value);
  const highestValue = d3.max(values);

  // svg
  //   .selectAll('rect')
  //   .data(spatialGrid)
  //   .transition(t)
  // .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : '#fff')); // TODO Create a slider for the 500

  // console.log('a');

  svg
    .selectAll('.meso')
    .data(mesos)
    .attr('fill', d => {
      // console.log(d.value);
      return d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : '#fff';
    });

  svg
    .selectAll('.value')
    .data(spatialGrid)
    .text(d => d.value);
}

export function drawGrid(svg, spatialGrid, mesos) {
  // const macros = [];

  // let f = 0;
  // spatialGrid.forEach((square, i) => {
  //   if (i % 4 === 0) macros.push(square);
  // });

  // console.log(macros);

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
    // .attr('stroke', 'grey')
    // .attr('stroke', 'grey')
    .attr('fill', 'none')
    // .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : 'rgba(255, 255, 255, 0)')) // TODO Create a slider for the 500
    .attr('width', 50)
    .attr('height', 50)
    .exit()
    .remove();

  // console.log(spatialGrid);
  let f = 0;
  let notF = 0;
  svg
    .selectAll('.meso')
    .data(mesos)
    .enter()
    .append('rect')
    .attr('class', 'meso')
    .attr('x', (d, i) => {
      // console.log(d.value);
      if (i % 4 === 0 && i !== 0) f++;
      const m = mesos[i].rMeso;
      if (m === 2 || m === 4) return spatialGrid[f].column * 50 + 25;
      else return spatialGrid[f].column * 50;
      // return spatialGrid[i].column * 25;
    })
    .attr('y', (d, i) => {
      if (i % 4 === 0 && i !== 0) notF++;
      const m = mesos[i].rMeso;
      if (m === 3 || m === 4) return spatialGrid[notF].row * 50 + 25;
      else return spatialGrid[notF].row * 50;
      // return spatialGrid[notF].row * 50;
      // return spatialGrid[i].row * 25;
    })
    .attr('fill', d => (d.value ? `rgba(127, 205, 144, ${normalize(d.value, 0, highestValue)})` : 'rgba(255, 255, 255, 0)'))
    // .attr('fill', d => `rgba(127, 205, 144, 1`)
    .attr('width', 25)
    .attr('height', 25)
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
    .attr('y', (d, i) => d.row * 50 + 35);
}
