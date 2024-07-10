import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../app';
import { numberOfFolders, nonExistingId } from './folder_helper';
import { Folder } from '../../models';

const api = supertest(app); 

describe.concurrent('when there is initially some folders saved', () => {

  test('folders are returned as json', async () => {

    await api
      .get('/api/folders')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('all folders are returned', async () => {

    const numberOfSavedFolders = await Folder.count();
    expect(numberOfSavedFolders).toEqual(numberOfFolders);
    
  });
  
  /* Difficult to test this because we are generating random titles */
  test.skip('a specific folder is within the returned folders', async () => {

    const savedFolders = await Folder.findAll();
    const titles = savedFolders.map(e => e.title);

    expect(titles.includes('BCIT'));

  });

});

describe.concurrent('viewing a specific folder', () => {
  
  test( 'a specific folder can be viewed', async () => {

    const folderToView = await Folder.findOne();

    const resultFolder = await api
      .get(`/api/folders/${folderToView?.id}`)
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
      "title": "new test folder" 
    };

    await api
      .post('/api/folders/')
      .send(folder)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const savedFolders = await Folder.findAll();
    expect(savedFolders).toHaveLength(numberOfFolders + 1);

    const titles = savedFolders.map(e => e.title);
    expect(titles).toContain( 'new test folder' );

  });

  test('folder without title can\'t be added', async() => {

    const folder = {
      "addDate": new Date().toISOString()
    };

    await api
      .post('/api/folders/')
      .send(folder)
      .expect(400);

    const numberOfSavedFolders = await Folder.count();

    expect(numberOfSavedFolders).toEqual(numberOfFolders+1);

  });

});

describe( 'deleting a folder' , () => {
 
  test ( 'a folder can be deleted', async() => {

    const folderToDelete = await Folder.findOne();

    await api
      .delete(`/api/folders/${folderToDelete?.id}`)
      .expect(204);

    const foldersAfterDeletion = await Folder.findAll();
    expect(foldersAfterDeletion).toHaveLength( numberOfFolders );
    
    const titles = foldersAfterDeletion.map(folder => folder.title);
    expect(titles).not.toContain(folderToDelete?.title);

  });

});