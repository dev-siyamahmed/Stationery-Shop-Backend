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

## Installation $ Scripts


The following npm scripts are available for development, building, and running the project:


1. **Clone the repository**:
   ```bash
   git clone https://github.com/dev-siyamahmed/Stationery-Shop-Backend.git
  ```


2. `Install dependencies`

```bash
npm install
```


3.  ***Set up MongoDB: Ensure that MongoDB is running locally or set up a cloud database (e.g., MongoDB Atlas). Update the database URI in `.env`***


4. `start:dev`: **Runs the application in development mode with TypeScript support, automatically restarting on changes**.


5. **Start the server:**
```bash
npm run start:dev
```


6. `build`: Compiles the TypeScript files into JavaScript.
```bash
npm run build
```


7. `lint`: Lints the codebase using ESLint, checking for any style or syntax issues.

```bash
npm run lint
```

8. `lint:fix`: Automatically fixes linting issues where possible.

```bash
npm run lint:fix
```


9. `prettier`: Formats the codebase using Prettier, according to the settings in `.prettierrc` and 
`.gitignore`.

```bash
npm run prettier
```


10. `prettier:fix`: Automatically formats the codebase using Prettier.

```bash
npm run prettier:fix
```


11. `start:prod`: Runs the application in production mode.
  ```bash
  npm run start:prod
  ```
***The server will run at `http://localhost:5000`.***