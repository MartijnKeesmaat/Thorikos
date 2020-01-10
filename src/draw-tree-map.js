function normalize(value, min, max) {
  return (value - min) / (max - min);
}

const dummy = {
  name: 'root',
  children: [
    {
      name: 'ao',
      children: [
        { name: 'Lekane', value: 364 },
        { name: 'Tile', value: 2482 },
        { name: 'Loomweight', value: 13 },
        { name: 'Jug', value: 532 },
        { name: 'Pithos', value: 712 },
        { name: 'Amphora', value: 2472 },
        { name: 'Undetermined', value: 5980 },
        { name: 'Closed shape', value: 2394 },
        { name: 'Cooking pot', value: 838 },
        { name: 'Open shape', value: 1720 },
        { name: 'Basin', value: 352 },
        { name: 'Bowl', value: 128 },
        { name: 'Skyphos', value: 163 },
        { name: 'Krater', value: 75 },
        { name: 'Kantharos', value: 16 },
        { name: 'Chytra', value: 38 },
        { name: 'Cup', value: 301 },
        { name: 'Juglet', value: 152 },
        { name: 'Louterion', value: 14 },
        { name: 'Grinding stone', value: 118 },
        { name: 'Plate', value: 38 },
        { name: 'Lamp', value: 59 },
        { name: 'Waster', value: 4 },
        { name: 'Hydria', value: 31 },
        { name: 'Table amphora', value: 73 },
        { name: 'Beehive', value: 90 },
        { name: 'Mortar', value: 127 },
        { name: 'Brasier', value: 3 },
        { name: 'Lekythos', value: 33 },
        { name: 'Kotyle', value: 44 },
        { name: 'Lid', value: 52 },
        { name: 'Stopper', value: 4 },
        { name: 'Lekanis', value: 23 },
        { name: 'Oinochoe', value: 38 },
        { name: 'Kylix', value: 44 },
        { name: 'Terracotta', value: 8 },
        { name: 'Amphora stopper', value: 1 },
        { name: 'Stone', value: 145 },
        { name: 'Stemless cup', value: 6 },
        { name: 'Slag', value: 18 },
        { name: 'Jar', value: 110 },
        { name: 'Brick', value: 44 },
        { name: 'Unguentarium', value: 3 },
        { name: 'Lagynos', value: 1 },
        { name: 'Saltcellar', value: 5 },
        { name: '', value: 2 },
        { name: 'Stand', value: 9 },
        { name: 'Shell', value: 39 },
        { name: 'Collared jar', value: 1 },
        { name: 'Pebble', value: 34 },
        { name: 'Pedestalled bowl', value: 7 },
        { name: 'Drinking vessel', value: 50 },
        { name: 'Olpe', value: 10 },
        { name: 'Mug', value: 3 },
        { name: 'Lopas', value: 12 },
        { name: 'Alabastron', value: 1 },
        { name: 'Funerary stele', value: 1 },
        { name: 'Cheese pot', value: 4 },
        { name: 'Lebes', value: 8 },
        { name: 'Aryballos', value: 4 },
        { name: 'Litharge', value: 3 },
        { name: 'Cistern lining', value: 6 },
        { name: 'Horseshoe', value: 1 },
        { name: 'Pyxis', value: 5 },
        { name: 'Stamnos', value: 1 },
        { name: 'Flake', value: 13 },
        { name: 'Bead', value: 1 },
        { name: 'Scraper', value: 1 },
        { name: 'Kados', value: 18 },
        { name: 'Scoop', value: 2 },
        { name: 'Pan', value: 9 },
        { name: 'Pessos', value: 7 },
        { name: 'Tripod', value: 3 },
        { name: 'Askos', value: 2 },
        { name: 'Antefix', value: 2 },
        { name: 'Griddle', value: 1 },
        { name: 'Loutrophoros', value: 1 },
        { name: 'Stemmed cup', value: 6 },
        { name: 'Cooking bell', value: 4 },
        { name: 'Tankard', value: 1 },
        { name: 'Exaleiptron', value: 2 },
        { name: 'Amphoriskos', value: 6 },
        { name: 'Storage vessel', value: 9 },
        { name: 'Skeleton', value: 2 },
        { name: 'Stemmed vessel', value: 2 },
        { name: 'Krateriskos', value: 2 },
        { name: 'Crushing stone', value: 1 },
        { name: 'Psykter', value: 1 },
        { name: 'Bolsal', value: 2 },
        { name: 'Spindle whorl', value: 1 },
        { name: 'Furnace base', value: 1 },
        { name: 'Pot', value: 2 },
        { name: 'Ashlar', value: 1 },
        { name: 'Crucible', value: 2 },
        { name: 'Sieve', value: 1 },
        { name: 'Dinos', value: 1 },
        { name: 'Trough', value: 1 },
        { name: 'Ladle', value: 1 },
        { name: 'Lopadion', value: 1 },
        { name: 'Stemmed bowl', value: 1 }
      ]
    }
  ]
};

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

let root = d3
  .hierarchy(dummy)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value);
draw();

onresize = _ => draw(true);

// d3.interval(_ => {
//   // console.log(makeData());

//   root = d3
//     .hierarchy(dummy)
//     .sum(d => d.value)
//     .sort((a, b) => b.value - a.value);

//   draw();
// }, duration * 2);

function draw(resizing) {
  // width = innerWidth - margin.left - margin.right;
  width = 1000;
  let baseHeight = innerWidth * aspect;
  baseHeight = baseHeight < minHeight ? minHeight : baseHeight > innerHeight ? innerHeight : baseHeight;
  // height = baseHeight - margin.top - margin.bottom;
  height = 500;

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
      console.log(this);
      console.log(d.data.name);
      console.log(d.data.value);

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

    labels.html(d => `<tspan style='font-weight: 500'>${d.data.name}</tspan><tspan dx=10>${d.data.value}</tspan>`).attr('transform', d => `translate(${d.x0}, ${d.y0})`);
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

function makeData() {
  return {
    name: 'root',
    children: categories.map(name => {
      return {
        name,
        children: d3.range(randBetween(5, 10)).map((d, i) => {
          return {
            name: `${name}${i}`,
            value: randBetween(10, 100)
          };
        })
      };
    })
  };
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
