# Thorikos
[![Image from Gyazo](https://i.gyazo.com/ac57063ac81b1017aa065db48b286e2d.gif)](https://gyazo.com/ac57063ac81b1017aa065db48b286e2d)

## Steps to create the map
1. Retrieve data
2. Deconstruct the context number
3. Map out the amount of findings per macro square
4. Create the grid
5. Render the DOM elements

# Retrieve data
The data consists in a Excel sheet which is then exported to a `CSV`, then converted to a `JSON` and loaded in `Javascript`.

``` js
fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

```

# Deconstruct the context number
The grid consists of macro square. These are 50x50m squares which are then divided in meso(4th) squares. The context number is constructed like this:

`T13-124-1-A`

- `T` = Thorikos
- `13` = year
- `124` = macro square
- `1` = meso square
- `A` = micro square

The function below deconstructs the context number into the above parts.

``` js 
function getContextNumberDetails(contextNumber) {
  if (!contextNumber) return '';

  const regex = /T(\d{2})?-?(\d{3})?-?([1234])?-?([ABCD1234])/g;
  const contextNumberSearch = regex.exec(contextNumber);

  return {
    contextNumber: contextNumberSearch[0] || null,
    year: contextNumberSearch[1] || null,
    macro: contextNumberSearch[2] || null,
    meso: contextNumberSearch[3] || null,
    micro: contextNumberSearch[4] || null
  };
}
```


# Map out the amount of findings per macro square
For the map we use the macro square codes. The function below creates an object with each square and counts how many objects have the same value. 

We do this by checking the key of an empty object. If the object doesnt contain the key, we add it and set it to 1. If the object already has the key, we increment it.

``` js
/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */

const map = {};

function countMacroCodes(data, map) {
  data.forEach(finding => {
    const macro = getContextNumberDetails(finding.CONTEXT).macro;
    if (!map[macro]) {
      map[macro] = 1;
    } else map[macro]++;
  });
  return map;
}
```

The function returns a map(obj) of the macro squares. The keys of map are the macro squares. The values are the findings of the square.

``` js
{
  101: 256,
  102: 160,
  103: 187,
  104: 157,
  ...
}
```


# Create the grid
We manually added the macro squares to an array, since we couldn't find a pattern to the grid layout. The squares in the layout represent the macro squares we highlighted above.

![image](https://user-images.githubusercontent.com/8048514/70654398-873e6580-1c56-11ea-85b0-fcaad2941789.png)

### Ordered macro square array
The grid is first stored in one long array which contains each macro number in order.

``` js
const grid = [
  0,
  196,
  195,
  197,
  200,
  202,
  ...
```

### Construct the grid
From this we can re-create the grid. The function below creates an array of objects. Each object resembles a square with the `macro-number`, `row`, `column` and `value`.

#### Cap at 20
The grid consists of 20 columns. By using a modulo we can set up a conditional.

`i % 20 === 0 && i !== 0`

After each 20th number we insert a new row and reset the columns. The value is retrieved from the map which we check with the square parameter.

``` js
function createSpatialGrid(map) {
  const spatialGrid = [];

  let row = 0;
  let column = 0;

  grid.forEach((square, i) => {
    if (i % 20 === 0 && i !== 0) {
      column = 0;
      row++;
    }

    const tempObj = {
      macro: square,
      value: map[square],
      column,
      row
    };

    column++;
    spatialGrid.push(tempObj);
  });

  return spatialGrid;
}
```


# Render the DOM elements 
Now we can use that information with [D3](https://d3js.org/) to render the grid. For each square we create a `rect`. The `x` and `y` values are positioned by the `column` and `row` values from above. Times that with 50 for the size.

### Fill
The fill is based on the value. If there is a value we return a `rgba` color value. The opacity is based on the value.

### Normalize
This data first needs to be normalized, since the values go as high as 1030. It's difficult to work with high numbers like that. With the function below this we make the data workable.

``` js
  svg
    .selectAll('rect')
    .data(spatialGrid)
    .enter()
    .append('rect')
    .attr('x', (d, i) => d.column * 50)
    .attr('y', (d, i) => d.row * 50)
    .attr('fill', d => (d.value ? `rgba(16, 115, 197, ${normalize(d.value, 0, 1030)})` : '#fff'))
    .attr('width', 50)
    .attr('height', 50);
};
```

## Normalize function
This function normalizes a given value based on the lowest and highest values in the dataset. It returns a float between 0 and 1. 

``` js
function normalize(value, min, max) {
  return (value - min) / (max - min);
}
```
