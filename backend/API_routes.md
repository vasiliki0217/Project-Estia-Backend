# Estia Project API Documentation

## Base URL
https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1

## Endpoints-Users

### 1.Get all users
Method : `GET`
URL : `/users`
Description : Fetch a list of all users.

### 2.Get user by id.
Method : `GET`
URL : `/userss/{id}`
Description : Fetch details of a specific user by its ID.



## Endpoints-Business

### 1.Get all businesses
Method : `GET`
URL : `/business`
Description : Fetch a list of all businesses.

### 2.Get business by id
Method : `GET`
URL : `/business/{id}`
Description : Fetch details of a specific business by its ID.

### 3.Get business with address
Method : `GET`
URL : `/business/{id}/address_details`
Description : Fetch details of a specific business with its address details.


## Endpoints-Address

### 1.Get all Addresses
Method : `GET`
URL : `/address`
Description : Fetch a list of all addresses.

### 2.Get business by id
Method : `GET`
URL : `/address/{id}`
Description : Fetch details of a specific address by its ID.