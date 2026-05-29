# Deployment Guide for CuratedCities

This document outlines the steps and prerequisites for deploying the CuratedCities web application to a production environment.

## Prerequisites

- **Node.js**: Version 18.x or higher is recommended.
- **npm**: Standard Node Package Manager.
- **Data Files**: Ensure `src/data/city_gifts.json` and `src/data/shipping_rates.json` are present in the repository. These files contain the product catalog and shipping logistics data.

## Deployment Steps

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd gift-shop
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Build the Application**:
    This step generates an optimized production build in the `.next` directory.
    ```bash
    npm run build
    ```

4.  **Start the Production Server**:
    Run the application using the production server.
    ```bash
    npm run start
    ```
    *Note: To bind to all interfaces, use `npm run start -- -H 0.0.0.0`.*

## Environment Variables

Currently, the application does not require any external environment variables. All data is sourced from local JSON files in `src/data/`.

## Verification

After deployment, verify that the following routes are accessible and displaying the correct content:
- `/`: Homepage
- `/cities`: City Selection page
- `/gifts`: Full Catalog with filtering
- `/our-story`: Brand story page
- `/cart`: Shopping cart
- `/checkout`: Checkout form
