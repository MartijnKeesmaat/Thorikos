import { normalize, getMap, capitalize, structureData } from './helpers';
import { getContextNumberDetails } from './map';

// https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9
const margin = { top: 0, right: 0, bottom: 0, left: 0 },
  aspect = 0.85,
  minHeight = 450,
  duration = 300;

let currentData = [],
  selection = [],
  currentCategory = '',
  path = [],
  pathText = ``,
  pathIndex = 0;

fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

function renderPath() {
  const pathQuery = document.querySelector('#path');
  const entry = capitalize(path[pathIndex].toLowerCase());
  if (path.length > 1) pathText += ` > ${entry}`;
  else pathText += `${entry}`;
  pathQuery.innerHTML = pathText;
  pathIndex++;
}

function handleData(data) {
  currentData = [...data];
  let shapeObjects = structureData(data);

  // Setup treemap
  const config = setup();
  const treemap = config.treemap;
  const svg = config.svg;
  const g = config.g;

  function addCategoryToTreemap(category) {
    if (category === 'CONTEXT') {
      const map = currentData.map(e => {
        return getContextNumberDetails(e['CONTEXT']).macro;
      });
    }

    if (selection.length > 0) {
      currentCategory = category;

      const currentPath = selection[0].category;
      const currentSelection = selection[0].name;

      path.push(category);
      renderPath();

      const filtered = currentData.filter(e => e[currentPath] == currentSelection);
      var newData = structureData(filtered, category);
    } else {
      var newData = structureData(data, category);
    }

    // Render new data
    root = d3
      .hierarchy(newData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    draw();
  }

  onresize = _ => draw(true);
  addEventToCategoryBttn(addCategoryToTreemap);

  // First paint
  let root = d3
    .hierarchy(shapeObjects)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  draw();

  const zoomBtn = document.querySelector('#zoom');
  zoomBtn.addEventListener('click', zoomTreemap);

  const zoomBtnOut = document.querySelector('#back');
  zoomBtnOut.addEventListener('click', zoomTreemapOut);

  function zoomTreemap() {
    if (shapeObjects.children[0].children.length > 10) {
      shapeObjects.children[0].children.splice(0, 10);
      root = d3
        .hierarchy(shapeObjects)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
      draw();
    }
  }

  function zoomTreemapOut() {
    shapeObjects = structureData(data, 'SHAPE OBJECT');
    root = d3
      .hierarchy(shapeObjects)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    draw();
  }

  function draw(resizing) {
    const width = 1000;
    let baseHeight = innerWidth * aspect;
    baseHeight = baseHeight < minHeight ? minHeight : baseHeight > innerHeight ? innerHeight : baseHeight;
    const height = 450;

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
        .duration(0)
        .style('opacity', 1e-6)
        .remove();
      rects
        .transition()
        .duration(100)
        .attr('transform', d => `translate(${d.x0},${d.y0})`)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0);
    }

    const objCount = root.children[0].children.length;
    let counter = root.children[0].children.length;

    rects
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .style('fill', (d, i) => {
        counter--;
        return objCount > 3 ? `rgba(127, 205, 144, ${0.4 + normalize(counter, 0, objCount)}` : `rgba(127, 205, 144, 1)`;
      })
      .attr('transform', d => `translate(${d.x0},${d.y0})`)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('opacity', 1e-6)
      .on('click', function(d) {
        selection.push({
          name: d.data.name,
          category: d.data.category
        });

        path.push(d.data.name);

        const newData = {
          name: 'root',
          children: [
            {
              name: 'ao',
              children: [{ name: d.data.name, value: d.data.value }]
            }
          ]
        };

        currentData = currentData.filter(e => e[d.data.category] == d.data.name);
        renderPath();

        root = d3
          .hierarchy(newData)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value);

        draw();
      })
      .on('mouseover', function(d) {
        this.style.opacity = 0.8;
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
        .duration(100)
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
      .duration(300)
      .style('opacity', 1);
  }
}

function setup() {
  const treemap = d3
    .treemap()
    .padding(1)
    .round(true);

  const svg = d3
    .select('.treemap')
    .append('svg')
    .attr('class', 'svg');

  const g = svg
    .append('g')
    .attr('class', 'g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  return { treemap, svg: d3.select('.svg'), g: d3.select('g') };
}

function addEventToCategoryBttn(event) {
  const categoryButtons = document.querySelectorAll('.button-category');
  categoryButtons.forEach(e => {
    const category = e.dataset.category;
    e.addEventListener('click', function() {
      event(category);
    });
  });
}
