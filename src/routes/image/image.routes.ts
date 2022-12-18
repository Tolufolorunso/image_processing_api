import express from 'express';
import { processImage } from './image.controller';

const imageRoute = express.Router();

imageRoute.get('/', processImage);

export default imageRoute;
