import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const categories = await categoriesRepository.find();
  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const { title } = request.body;
  let category = await categoriesRepository.findOne({
    where: { title },
  });

  if (!category) {
    category = categoriesRepository.create({
      title,
    });
    await categoriesRepository.save(category);
  } else {
    throw new AppError('Category already exists!');
  }
  return response.json(category) || null;
});

export default categoriesRouter;
