# API Requirements
## Server is running on port: **http://localhost:5050** 
## Database is running on port: **127.0.0.1:5432**

## **API Endpoints**
### User
- Create [generates token] -- `POST: /user` 
- Show [token required] -- `GET: /user/:id` 
- Index [token required] -- `GET: /user` 
- Destroy [token required] -- `DELETE: /user/:id` 

### Product
- Create [token required] -- `POST: /product`
- Show [No token required] -- `GET: /product/:id`
- Index [No token required] -- `GET: /product` 

### Order
- Create [token required] -- `POST: /order`
- Show [token required] -- `GET: /order/:id ` 

### Order Details
- Create [Token required] -- `POST: /order-details`
- Show [Token required] -- `GET: /order-details/:id`

----
## **Data Shapes / Database Tables**
### __*users*__
| Entry         | Type               |
| --------------|:------------------:|
| id            | serial primary key |
| first_name    | varchar(50)        |
| last_name     | varchar(70)        |
| user_password | varchar            |

### __*products*__
| Entry        | Type               |
| -------------|:------------------:|
| id           | serial primary key |
| product_name | varchar(100)       |
| price        | integer            |

### __*orders*__
| Entry         | Type                    |
| --------------|:-----------------------:|
| id            | serial primary key      |
| user_id       | forign key to users(id) |
| order_status  | varchar(50)             |

### __*order_details*__
| Entry      | Type                       |
| -----------|:--------------------------:|
| id         | serial primary key         |
| quantity   | integer                    |
| order_id   | references orders(id)      |
| product_id | references products(id)    |


