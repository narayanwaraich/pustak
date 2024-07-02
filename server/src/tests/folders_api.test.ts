import { describe, test, beforeAll, afterAll, expect } from 'vitest';
// import {Response} from 'express';
import supertest from 'supertest';
import app from '../app';
import { connectToDatabase, createFolders, dropTables, folders } from './db_setup';
import {FolderParams} from '../typings/router';

const start = async () => {
  await connectToDatabase();
};
start();

const api = supertest(app);

beforeAll( async () => {
	await createFolders();
});

describe('basic tests for folders', () => {
  test('folders are returned as json', async () => {
    await api
      .get('/api/folders')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are five folders', async () => {
    const response = await api.get('/api/folders');
    expect(response.body).toHaveLength(folders.length);
  });
  
  test('the first folder title is BCIT', async () => {
    const response = await api.get('/api/folders');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload: FolderParams[] = response.body;

    const titles = payload.map(e => e.title);
    expect(titles.includes('BCIT'));
  });
});

afterAll(async () => {
  await dropTables();
});