import { normalize, getMap, structureData } from './helpers';
import { formatData } from './map';
import { drawGrid, update } from './draw-map';
import { renderPath } from './breadcrumbs';

import { formatMeso, getContextNumberDetails } from './map';

// https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9
const margin = { top: 0, right: 0, bottom: 0, left: 0 },
  aspect = 0.85,
  minHeight = 450,
  duration = 300;

let currentData = [],
  selection = [],
  // currentCategory = '',
  currentDataStructured;

let currentLevel = 0;

const breadcrumbs = {
  currentLevel: 0,
  nextLevel: true,
  path: []
};

fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

function handleData(data) {
  document.querySelector('.treemap--loading').style.display = 'none';

  // Set data
  currentData = [...data];
  currentData = currentData.filter(i => getContextNumberDetails(i.CONTEXT).mesoOnly);
  currentDataStructured = structureData(currentData);

  updateBreadCrumbs(currentData, 'All findings', 'root');
  printBreadCrumbs(breadcrumbs);

  const mapSvg = d3.select('.map').append('svg');
  const spatialGrid = formatData(currentData);
  // console.log(spatialGrid);
  drawGrid(mapSvg, spatialGrid, formatMeso(data));

  // Setup treemap
  const config = setup();
  const treemap = config.treemap;
  const svg = config.svg;
  const g = config.g;

  // let catCount = 0;
  function addCategoryToTreemap(category, e) {
    if (e.className.match('activated')) return;
    currentDataStructured = structureData(currentData, category);

    updateBreadCrumbs(currentData, category, 'category');
    printBreadCrumbs(breadcrumbs);

    var newData = structureData(currentData, category);

    root = d3
      .hierarchy(newData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    draw();
  }

  onresize = _ => draw(true);
  addEventToCategoryBttn(addCategoryToTreemap);

  document.querySelector('#showMap').classList.add('pulse');
  setTimeout(() => {
    document.querySelector('#showMap').classList.remove('pulse');
  }, 1000);

  // First paint
  let root = d3
    .hierarchy(currentDataStructured)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  draw();

  setTimeout(() => {
    document.querySelector('.treemap').classList.add('treemap--active');
  }, 1);

  const zoomBtn = document.querySelector('#zoom');
  zoomBtn.addEventListener('click', zoomTreemap);
  zoomBtn.addEventListener('mouseenter', showZoomTreemap);
  zoomBtn.addEventListener('mouseleave', noShowZoomTreemap);

  // const zoomBtnOut = document.querySelector('#back');
  // zoomBtnOut.addEventListener('click', zoomTreemapOut);

  function zoomTreemap() {
    const current = currentDataStructured.children[0].children.sort((a, b) => b.value - a.value);

    if (current.length > 10) {
      current.splice(0, 10);

      root = d3
        .hierarchy(currentDataStructured)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
      draw();
    }
  }

  function showZoomTreemap() {
    const current = currentDataStructured.children[0].children.sort((a, b) => b.value - a.value);
    if (current.length > 10) {
      if (currentDataStructured.children[0].children.sort((a, b) => b.value - a.value)) {
        d3.selectAll('.rect').each(function(d, i) {
          for (let j = 0; j < 10; j++) {
            if (i == j) {
              d3.select(this).style('opacity', `0`);
            }
          }
        });

        d3.selectAll('.label').each(function(d, i) {
          for (let j = 0; j < 10; j++) {
            if (i == j) {
              d3.select(this).style('opacity', `.4`);
            }
          }
        });
      }
    }
  }

  function noShowZoomTreemap() {
    if (currentDataStructured.children[0].children.sort((a, b) => b.value - a.value)) {
      d3.selectAll('.rect').each(function(d, i) {
        for (let j = 0; j < 10; j++) {
          if (i == j) {
            d3.select(this).style('opacity', `1`);
          }
        }
      });

      d3.selectAll('.label').each(function(d, i) {
        for (let j = 0; j < 10; j++) {
          if (i == j) {
            d3.select(this).style('opacity', `1`);
          }
        }
      });
    }
  }

  function zoomTreemapOut() {
    currentDataStructured = structureData(data, 'SHAPE OBJECT');
    root = d3
      .hierarchy(currentDataStructured)
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
        if (document.querySelectorAll('rect.rect').length <= 1) return;

        selection.push({
          name: d.data.name,
          category: d.data.category
        });

        document.querySelector('#showMap').classList.add('pulse');
        setTimeout(() => {
          document.querySelector('#showMap').classList.remove('pulse');
        }, 1000);

        const newData = {
          name: 'root',
          children: [
            {
              name: 'ao',
              children: [{ name: d.data.name, value: d.data.value }]
            }
          ]
        };

        const activeButton = document.querySelector('.button-active');
        activeButton.classList.remove('button-active');
        activeButton.classList.add('button-activated');

        currentData = currentData.filter(e => e[d.data.category] == d.data.name);
        currentDataStructured = structureData(currentData);
        // renderPath(path, pathIndex, pathText);
        updateBreadCrumbs(currentData, d.data.name, 'detail');
        printBreadCrumbs(breadcrumbs);

        const spatialGrid = formatData(currentData);
        // const spatialGrid = formatMeso(currentData);
        update(mapSvg, spatialGrid, formatMeso(currentData));

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
  function updateBreadCrumbs(currentData, name, type) {
    if (type === 'category' && breadcrumbs.nextLevel) {
      breadcrumbs.path.push({
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        name,
        category: true
      });

      breadcrumbs.currentLevel++;
      breadcrumbs.nextLevel = false;
    } else if (type === 'category' && !breadcrumbs.nextLevel) {
      breadcrumbs.path[breadcrumbs.path.length - 1] = {
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        category: true,
        name
      };
    }

    if (type === 'detail' || type === 'root') {
      breadcrumbs.path.push({
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        name
      });

      breadcrumbs.currentLevel++;
      breadcrumbs.nextLevel = true;
    }
  }

  function printBreadCrumbs(breadcrumbs) {
    // console.log(breadcrumbs);

    const container = document.querySelector('#path');
    container.innerHTML = '';

    breadcrumbs.path.forEach(e => {
      if (e.category) {
        const img = document.createElement('img');
        if (e.name === 'SHAPE OBJECT') img.src = '/shape object.c010fc72.svg';
        if (e.name === 'SHAPE DETAILS') img.src = '/shape-detail.34d50015.svg';
        if (e.name === 'CHRONOLOGY 1st IMPRESSION') img.src = '/tijdperk.cb680242.svg';
        if (e.name === 'PRODUCTION PLACE') img.src = '/production-place.4212d16c.svg';
        if (e.name === 'CONSERVATION') img.src = '/conservation.9e748c39.svg';
        if (e.name === 'SEASON') img.src = '/season.ee70b878.svg';
        if (e.name === 'WARE') img.src = '/ware.d4219b9e.svg';
        container.appendChild(img);
      } else {
        const button = document.createElement('button');
        // const linkText = document.createTextNode(`${e.name} (${e.objCount})`);
        const linkText = document.createTextNode(`${e.name} ›`);
        button.appendChild(linkText);
        button.value = e.name;
        button.addEventListener('click', function(e) {
          clickBreadcrumb(e, breadcrumbs);
        });
        container.appendChild(button);
      }
    });
  }

  function clickBreadcrumb(current, breadcrumbs) {
    const clickedBread = breadcrumbs.path.filter(e => e.name === current.target.value)[0];
    currentData = clickedBread.data;
    currentDataStructured = structureData(clickedBread.data, false, clickedBread.name);
    update(mapSvg, spatialGrid, formatMeso(currentData));

    breadcrumbs.path.splice(clickedBread.level + 1);
    breadcrumbs.currentLevel = clickedBread.level;
    breadcrumbs.nextLevel = true;

    printBreadCrumbs(breadcrumbs);

    const categoryButtons = document.querySelectorAll('.button-category');

    console.log(breadcrumbs);

    categoryButtons.forEach(e => {
      const category = e.dataset.category;
      console.log(category);
      if (breadcrumbs.path.some(i => i.name == category)) {
        console.log('a');
      } else {
        console.log('b');
        e.classList.remove('button-active');
        e.classList.remove('button-activated');
      }
    });

    root = d3
      .hierarchy(currentDataStructured)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    draw();
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
      event(category, e);
    });
  });
}

const allButtons = document.querySelectorAll('.button-category');
allButtons.forEach(e => e.addEventListener('click', addStateToButton));

function addStateToButton(e) {
  if (e.currentTarget.className.match('activated')) return;
  const button = e.currentTarget;

  allButtons.forEach(e => e.classList.remove('button-active'));
  button.classList.add('button-active');
}
