import { describe, test, beforeAll, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../app';
// import { nonExistingId } from '../db/connect';
// import '../helpers'; 
import { folders, createFolders, foldersInDb } from './folder_helper';

const api = supertest(app); 

beforeAll( async () => {

	await createFolders();

});

describe.concurrent('when there is initially some folders saved', () => {

  test('folders are returned as json', async () => {

    await api
      .get('/api/folders')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('all folders are returned', async () => {

    const dbFolders = await foldersInDb();

    expect(dbFolders).toHaveLength(folders.length);

  });
  
  test('a specific folder is within the returned folders', async () => {

    const dbFolders = await foldersInDb();
    const titles = dbFolders.map(e => e.title);

    expect(titles.includes('BCIT'));

  });

});

describe.concurrent('viewing a specific folder', () => {
  
  test( 'a specific folder can be viewed', async () => {

    const dbFolders = await foldersInDb();
    const folderToView = dbFolders[0];

    const resultFolder = await api
      .get(`/api/folders/${folderToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    expect(JSON.stringify(resultFolder.body)).toEqual(JSON.stringify(folderToView));

  });

  test('fails with statuscode 404 if a folder does not exist', async () => {

    const validNonExistingId = await nonExistingId();

    await api
      .get(`/api/folders/${validNonExistingId}`)
      .expect(404);

  });

  test('fails with statuscode 400 if id is invalid', async () => {

    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/folders/${invalidId}`)
      .expect(400);

  });

});

describe( 'adding a new folder' , () => {

  test('folder can be created', async() => {

    const folder = 	{ 
      "title": "new folder" 
    };

    await api
      .post('/api/folders/')
      .send(folder)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const dbFolders = await foldersInDb();
    expect(dbFolders).toHaveLength(folders.length + 1);

    const titles = dbFolders.map(e => e.title);
    expect(titles).toContain( 'new folder' );

  });

  test('folder without title can\'t be added', async() => {

    const folder = {
      "addDate": new Date().toISOString()
    };

    await api
      .post('/api/folders/')
      .send(folder)
      .expect(400);

    const dbFolders = await foldersInDb();

    expect(dbFolders).toHaveLength(folders.length+1);

  });

});

describe( 'deleting a folder' , () => {
 
  test ( 'a folder can be deleted', async() => {

    const foldersBeforeDeletion = await foldersInDb();
    const folderToDelete = foldersBeforeDeletion[0];

    await api
      .delete(`/api/folders/${folderToDelete.id}`)
      .expect(204);

    const foldersAfterDeletion = await foldersInDb();

    expect(foldersAfterDeletion).toHaveLength( folders.length );
    
    const titles = foldersAfterDeletion.map(folder => folder.title);
    
    expect(titles).not.toContain(folderToDelete.title);

  });

});