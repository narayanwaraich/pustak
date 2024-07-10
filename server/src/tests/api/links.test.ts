import { describe, test, beforeAll, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../app';
import { nonExistingId } from '../db/connect';
// import '../helpers'; 
import { links, linksInDb } from './link_helper';
 
const api = supertest(app);

beforeAll( async () => {

	// await createLinks();

}); 

describe.concurrent.skip('when there is initially some links saved', () => {

  test('links are returned as json', async () => {

    await api
      .get('/api/links')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('all links are returned', async () => {

    const dbLinks = await linksInDb();

    expect(dbLinks).toHaveLength(links.length);

  });
  
  test('a specific link is within the returned links', async () => {

    const dbLinks = await linksInDb();
    const titles = dbLinks.map(e => e.title);

    expect(titles.includes('ECMAScript 6'));

  });

});

describe.concurrent.skip('viewing a specific link', () => {
  
  test( 'a specific link can be viewed', async () => {

    const dbLinks = await linksInDb();
    const linkToView = dbLinks[0];

    const resultLink = await api
      .get(`/api/links/${linkToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    expect(JSON.stringify(resultLink.body)).toEqual(JSON.stringify(linkToView));

  });

  test('fails with statuscode 404 if a link does not exist', async () => {

    const validNonExistingId = await nonExistingId();

    await api
      .get(`/api/links/${validNonExistingId}`)
      .expect(404);

  });

  test('fails with statuscode 400 if id is invalid', async () => {

    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/links/${invalidId}`)
      .expect(400);

  });

});

describe.skip( 'adding a new link' , () => {

  test('link can be created', async() => {

    const link = 	{ 
      "url": "https://www.digitalocean.com/community/tutorials?q=%5Btutorial-series%5D" 
    };

    await api
      .post('/api/links/')
      .send(link)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const dbLinks = await linksInDb();
    expect(dbLinks).toHaveLength(links.length + 1);

    const urls = dbLinks.map(link => link.url);
    expect(urls).toContain( 'https://www.digitalocean.com/community/tutorials?q=%5Btutorial-series%5D' );

  });

  test('link without url can\'t be added', async() => {

    const link = {
      "addDate": new Date().toISOString()
    };

    await api
      .post('/api/links/')
      .send(link)
      .expect(400);

    const dbLinks = await linksInDb();

    expect(dbLinks).toHaveLength(links.length+1);

  });

});

describe.skip( 'deleting a link' , () => {
 
  test ( 'a link can be deleted', async() => {

    const linksBeforeDeletion = await linksInDb();
    const linkToDelete = linksBeforeDeletion[0];

    await api
      .delete(`/api/links/${linkToDelete.id}`)
      .expect(204);

    const linksAfterDeletion = await linksInDb();

    expect(linksAfterDeletion).toHaveLength( links.length );
    
    const titles = linksAfterDeletion.map(link => link.title);
    
    expect(titles).not.toContain(linkToDelete.title);

  });

});