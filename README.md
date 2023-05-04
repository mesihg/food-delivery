# Food Delivery System

# REST API for food delivery with DRF

### EndPoints API Actions

- [x] Add, Update, Delete and List Restaurants
- [x] Add, Update, Delete and List Restaurant Menus
- [x] Add, Update, Delete and List Customers
- [x] Create Account
- [x] Login to Account
- [ ] Track Orders
- [ ] Edit Profile

# Restaurant Management end point

1. List all restaurants on get request

```
http://127.0.0.1:8000/api/restaurant/restaurants/
```

2. Create restaurant on post request

```
http://127.0.0.1:8000/api/restaurant/restaurants/
```

3. Retrieve restaurant on get request

```
http://127.0.0.1:8000/api/restaurant/restaurants/<uuid:pk>/
```

4. Update restaurant on put request

```
http://127.0.0.1:8000/api/restaurant/restaurants/<uuid:pk>/
```

5. Delete restaurant on delete request

```
http://127.0.0.1:8000/api/restaurant/restaurants/<uuid:pk>/
```

# Restaurant Menu Management end point

1. List all menus on get request

```
http://127.0.0.1:8000/api/menu/menus/
```

2. Create menu on post request

```
http://127.0.0.1:8000/api/menu/menus/
```

3. Retrieve menu on get request

```
http://127.0.0.1:8000/api/menu/menus/<uuid:pk>/
```

4. Update menu on put request

```
http://127.0.0.1:8000/api/menu/menus/<uuid:pk>/
```

5. Delete menu on delete request

```
http://127.0.0.1:8000/api/menu/menus/<uuid:pk>/
```

6. Retrieve list of menus for a single restaurant on get request

```
http://127.0.0.1:8000/api/menu/restaurants/<uuid:restaurant_id>/menu/
```

# User Management end point

1. List all users on get request

```
http://127.0.0.1:8000/api/users/
```

2. Create user on post request

```
http://127.0.0.1:8000/api/users/register/
```

3. Login user on post request

```
http://127.0.0.1:8000/api/users/login/
```

4. User detail on get request

```
http://127.0.0.1:8000/api/users/<uuid:pk>/
```

# Order Management end point

1. List all orders on get request

```
http://127.0.0.1:8000/api/order/orders/
```

2. Create order on post request

```
http://127.0.0.1:8000/api/order/orders/
```

3. Retrieve order detail on get request

```
http://127.0.0.1:8000/api/order/orders/<uuid:order_id>/
```

# frontend for food delivery with react-native

### User Interface Actions

- [x] Register and Authenticate user
- [x] Get list of restaurants
- [x] Get list of menus for a single restaurant
- [x] Cart items for the menus to be added
- [x] Login and Logout
- [ ] Track Orders
- [ ] Edit Profile
