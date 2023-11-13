# First Pulumi Project

This project is about learning Pulumi. In this specific one, I am doing the [Pulumi Fundamentals](https://www.pulumi.com/learn/pulumi-fundamentals/).

I learned how to use Pulumi to build, configure, and deploy a real-life, modern application using Docker. Created a frontend, a backend, and a database to deploy the [Pulumipus Boba Tea Shop](https://github.com/pulumi/tutorial-pulumi-fundamentals/tree/main).


## Update the database

```bash
$ curl --location --request POST 'http://localhost:3000/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "ratings": {
        "reviews": [],
        "total": 63,
        "avg": 5
    },
    "created": 1600979464567,
    "currency": {
        "id": "USD",
        "format": "$"
    },
    "sizes": [
        "M",
        "L"
    ],
    "category": "boba",
    "teaType": 2,
    "status": 1,
    "_id": "5f6d025008a1b6f0e5636bc7",
    "images": [
        {
            "src": "classic_boba.png"
        }
    ],
    "name": "My New Milk Tea",
    "price": 5,
    "description": "none",
    "productCode": "852542-107"
}'

```
