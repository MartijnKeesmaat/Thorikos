# 🗺 ThorikΩs
ThorikΩs is a project created for the Information Design course of the [Amsterdam University of Applied Sciences](https://www.hva.nl/)

The ThorikΩs visualization was created in collaboration with the [UU](http://www.uu.nl/). Thorikos was a city in the southern portion of ancient Attica. There have been found all sorts of objects from ancient Greece in this area. These findings consist mostly of shards of objects like tiles, amphora's, jugs and cups. 

The findings have been categorized and are visualized manually. Creating those visualizations takes a lot of work which is why this project is created. With the ThorikΩs project, we can dynamically create map views of specific findings. Like Amphora found in 2013, poorly reserved grinding stones with a black glaze or drinking vessels from the Archaic period.

See the live demo [here](https://thorikos.netlify.com/)

### Browse through the collection
You start with the entire collection. This is represented by the green rectangle. You can divide the collection into categories seen below. For example, when you click shape objects, you will see the main objects like tiles, amphora's, jugs and cups. These can then be discovered further. Once you click one of these objects you will reduce the objects to your selection. This process can be repeated over and over until there are no more findings.

[![Image from Gyazo](https://i.gyazo.com/d6e8ff60a50319e836da5760df02b8df.gif)](https://gyazo.com/d6e8ff60a50319e836da5760df02b8df)

#### Focus on the smaller variables
Some categories contain a lot of variables. The shape objects, for example, contain 144 different types of objects. By zooming in, you remove the 10 biggest and fill the screen with the remaining variables.
[![Image from Gyazo](https://i.gyazo.com/5cf96432a86dd3dabf55d033d5bccd30.gif)](https://gyazo.com/5cf96432a86dd3dabf55d033d5bccd30)

### Explore the map
Once you are happy with your selection, you can view the finding with the map view. The map view is divided into meso squares, these are areas of 25x25 meter. The meso squares are group by macros squares (50x50) and these can be shown by toggling the grid. If you hover over the meso squares you see the number of findings.

[![Image from Gyazo](https://i.gyazo.com/f7625700aaae0211a44355dd02a20e6b.gif)](https://gyazo.com/f7625700aaae0211a44355dd02a20e6b)

### Keep track of your progress
To keep track of where you are in the collection, we've added breadcrumbs. These can be found in the upper-left area above the visualizations. Every time you browse the collection it's stored and shown here. The breadcrumbs are interactive in both the collection view and map view. Once you click them you navigate to that selection. 

[![Image from Gyazo](https://i.gyazo.com/fa2571cb8a3ad15b3ecf83519a97c1fe.gif)](https://gyazo.com/fa2571cb8a3ad15b3ecf83519a97c1fe)

[![Image from Gyazo](https://i.gyazo.com/32bdd315061bfd8a72affea8014bbd53.gif)](https://gyazo.com/32bdd315061bfd8a72affea8014bbd53)

### Share your findings
If you want to share your findings you can click the button in the upper-right area and download the map view. You will then receive a .png image that contains the grid, map, legend, and breadcrumbs.

[![Image from Gyazo](https://i.gyazo.com/0eeccfb81ed0bdf16922b0844b933614.gif)](https://gyazo.com/0eeccfb81ed0bdf16922b0844b933614)

## Sources
Here you briefly see the sources that were used and how they were transformed to fit this project. The process of adapting these examples can be found in the [wiki](https://github.com/MartijnKeesmaat/Thorikos/wiki). 

| Map of the Thorikos site        | [Treemap](https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9)           | [Result](https://thorikos.netlify.com/)  |
| :-------------: |:-------------:| :-----:|
| [![Image from Gyazo](https://i.gyazo.com/b4e21b3c7af12ecd93646eceafe2629f.png)](https://gyazo.com/b4e21b3c7af12ecd93646eceafe2629f)      | [![Image from Gyazo](https://i.gyazo.com/6a863944da868a51ca280c828acc82cf.gif)](https://gyazo.com/6a863944da868a51ca280c828acc82cf) | [![Image from Gyazo](https://i.gyazo.com/d293366c6ac8b2c3fe9581ceb2bfd5f3.gif)](https://gyazo.com/d293366c6ac8b2c3fe9581ceb2bfd5f3) |

## Install
[Parcel](https://parceljs.org/) is used as the application bundler for this project. The main goal of using Parcel was to use ES6 imports. This allows for the code to be more modular and easier to work with.

First, install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Wiki
The [wiki](https://github.com/MartijnKeesmaat/Thorikos/wiki) documents the progress of this project.


## Acknowledgments
- [The Internationale Research Universiteit](http://www.uu.nl/), for providing us with the project and data
