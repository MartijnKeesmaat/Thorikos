import { normalize, getMap } from './helpers';

// https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9
const margin = { top: 0, right: 0, bottom: 0, left: 0 },
  aspect = 0.85,
  minHeight = 400,
  duration = 1000,
  categories = 'abcdef'.split(''),
  colors = {};

categories.forEach((d, i) => {
  colors[d] = d3.schemeSet2[i];
});

fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

function handleData(data) {
  const shapeObjects = getShapeObjectData(data);

  console.log(shapeObjects);
  console.log(dummy);

  const treemap = d3
    .treemap()
    .padding(1)
    .round(true);

  const svg = d3
    .select('.treemap')
    .append('svg')
    .call(
      d3.zoom().on('zoom', function() {
        svg.attr('transform', d3.event.transform);
      })
    );

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  onresize = _ => draw(true);

  let root = d3
    .hierarchy(shapeObjects)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  draw();

  function draw(resizing) {
    // width = innerWidth - margin.left - margin.right;
    const width = 1000;
    let baseHeight = innerWidth * aspect;
    baseHeight = baseHeight < minHeight ? minHeight : baseHeight > innerHeight ? innerHeight : baseHeight;
    // height = baseHeight - margin.top - margin.bottom;
    const height = 500;

    svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    treemap.size([width, height]);

    const leaves = treemap(root).leaves();
    const rects = svg.selectAll('.rect').data(leaves, d => d.data.name);

    if (resizing) {
      rects.exit().remove();

      rects
        .attr('transform', d => `translate(${d.x0},${d.y0})`)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0);
    } else {
      rects
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(duration)
        .style('opacity', 1e-6)
        .remove();

      rects
        .transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.x0},${d.y0})`)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0);
    }

    let counter = 104;

    rects
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .style('fill', (d, i) => {
        // const random = Math.floor(Math.random() * 3) + 7;
        // console.log(random);
        // return `rgba(127, 205, 144, ${random / 10}`;
      })
      .style('fill', (d, i) => {
        counter--;
        return `rgba(127, 205, 144, ${0.3 + normalize(counter, 0, 104)})`;
      }) // TODO update this n eventually
      .attr('transform', d => `translate(${d.x0},${d.y0})`)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('opacity', 1e-6)
      .on('click', function(d) {
        var coords = d3.mouse(this);
        // console.log(this);
        // console.log(d.data.name);
        // console.log(d.data.value);

        const newData = {
          name: 'root',
          children: [
            {
              name: 'ao',
              children: [{ name: d.data.name, value: d.data.value }]
            }
          ]
        };

        root = d3
          .hierarchy(newData)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value);

        draw();
      })
      .on('mouseover', function(d) {
        this.style.opacity = 0.6;
      })
      .on('mouseleave', function(d) {
        this.style.opacity = 1;
      })
      .transition()
      .duration(duration)
      .style('opacity', 1);

    const labels = svg.selectAll('.label').data(
      leaves.filter(f => f.x1 - f.x0 > 60 && f.y1 - f.y0 > 30),
      d => d.data.name
    );

    if (resizing) {
      labels.exit().remove();

      labels
        .html(d => `<tspan style='font-weight: 500'>${d.data.name}</tspan><tspan dx=10>${d.data.value}</tspan>`)
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
    } else {
      labels
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(duration)
        .style('opacity', 1e-6)
        .remove();

      labels
        .html(d => `<tspan style='font-weight: 500'>${d.data.name}</tspan><tspan dx=10>${d.data.value}</tspan>`)
        .transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
    }

    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('dy', 16)
      .attr('dx', 5)
      .attr('fill', '#fff')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
      .html(d => `<tspan style='font-weight: 500'>${d.data.name}</tspan><tspan dx=10>${d.data.value}</tspan>`)
      .style('opacity', 1e-6)
      .transition()
      .duration(duration)
      .style('opacity', 1);
  }
}

function getShapeObjectData(data) {
  const mapped = getMap(data, 'SHAPE OBJECT');

  const obj = {
    name: 'root',
    children: [
      {
        name: 'a',
        children: []
      }
    ]
  };

  Object.values(mapped).forEach((e, i) => {
    obj.children[0].children.push({
      name: Object.keys(mapped)[i],
      value: e
    });
  });

  return obj;
}

// d3.interval(_ => {
//   // console.log(makeData());

//   root = d3
//     .hierarchy(dummy)
//     .sum(d => d.value)
//     .sort((a, b) => b.value - a.value);

//   draw();
// }, duration * 2);
