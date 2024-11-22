# Stationery Shop API

## Overview

This project implements a Stationery Shop API using **Express**, **TypeScript**, and **MongoDB** with **Mongoose** to manage stationery products and orders. It supports basic CRUD operations for products, inventory management for orders, and revenue calculation using MongoDB's aggregation pipeline. The API also includes validation for product details and order quantities to ensure data integrity.

---

## Features

1. **CRUD Operations for Stationery Products**:
   - Create, Read, Update, and Delete products.
   - Data validation for product attributes using Mongoose schema validation.
   - Category-based search functionality for filtering products.

2. **Order Management**:
   - Place orders for stationery products.
   - Update product inventory on order placement.
   - Track orders by customer email.

3. **Revenue Calculation**:
   - Calculate total revenue from all orders using MongoDB's aggregation pipeline.

4. **Error Handling**:
   - Handles various error scenarios such as insufficient stock, validation failures, and product not found.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dev-siyamahmed/Stationery-Shop-Backend.git
  ```


2. **Directory chnage**
```bash
cd Stationery-Shop-A2
```


3. **Install dependencies: Navigate to the project directory and run:**
 ```bash 
 npm install 
 ```

4.  ***Set up MongoDB: Ensure that MongoDB is running locally or set up a cloud database (e.g., MongoDB Atlas). Update the database URI in `.env`***


5. **Start the server:**
```bash
npm run start:dev

```

***The server will run at `http://localhost:5000`.***