## API routes


|            Routes             | Method |          Description          |        TOKEN                    |
| :---------------------------: | :----: | :---------------------------: | :------------------:    
|      /users                   |  POST  |        Register A user        | 
|      /users/authenticate      |  POST  |       Authenticate A user     |
|      /users			        |  GET   |         Gets all users        |  TOKEN NEEDED
|      /users/:id	            |  GET   |         Gets A user  	     |	TOKEN NEEDED
|      /products		        |  GET   |         Gets all products     | 
|       /products/:id           |  GET   |         Gets A product        |
|      /products                |  POST  |   	   Creates A product     | 	TOKEN NEEDED
|     /orders			        |  POST  |       Creates An order        | 	TOKEN NEEDED
|      /orders/:id              |  GET   |       Gets An order	         |	TOKEN NEEDED 


## Database schema


```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255)
);
```
```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INTEGER
);
```
  
```
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id bigint REFERENCES users(id)
);
```

  ```
 CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```