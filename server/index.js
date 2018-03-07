const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.get('/api/v1/products', (req, res) => {
    const query = req.query.query;
    axios.all([
        axios.get('http://api.walmartlabs.com/v1/search?apiKey=qes37uv9gp73mbhcnpjkfurs&query=' + query),
        axios.get('https://api.bestbuy.com/v1/products((search='+ query +'))?apiKey=gTzEkyZvR6bDgm4ynfme04Ek&format=json')
    ]).then(response => {
        console.log(response)

        var bestBuyResponse = response[1].data.products.map(product => {
            return {
                productId: product.productId,
                price: product.salePrice,
                image: product.thumbnailImage,
                name : product.name,
                url: product.url
            }
        });

        res.json({
            walmart: response[0].data.items || [],
            bestbuy: bestBuyResponse || []
        })
    }).catch(error => res.status(400).send(error.message))
});

app.listen(PORT, () => console.log('listening on port ', PORT));