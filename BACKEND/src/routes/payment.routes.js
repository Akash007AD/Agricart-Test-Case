import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { renderProductPage, createOrder } from '../controllers/payment.controller.js'; // Import the updated payment controller

const paymentRoute = express.Router();

// Use body-parser middleware
paymentRoute.use(bodyParser.json());
paymentRoute.use(bodyParser.urlencoded({ extended: false }));

// Set up the view engine and views directory
paymentRoute.set('view engine', 'ejs');
paymentRoute.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), '../views'));

// Routes for rendering the product page and creating an order
paymentRoute.get('/', renderProductPage); // Render the product page
paymentRoute.post('/createOrder', createOrder); // Create a new order with UPI

export default paymentRoute;
