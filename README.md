# Kalimati Vegetable rates

An Api for vegetable rates of Kalimait, Nepal

## Getting Started

```
npm install kalimati-rate
```
## Import 

```
const Kalimati = require('kalimati-rate');
```

```
Kalimati.retail().then((retail_price) => {
    console.log(retail_price)
})
```

```
Kalimati.wholesale().then((wholesale_price) => {
    console.log(wholesale_price)
})
```

## Authors

* **Aditya Thebe** - *@adityathebe* - [Blog](http://adityathebe.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details