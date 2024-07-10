import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../app';
import { numberOfLinks, nonExistingId } from './link_helper';
import { Link } from '../../models';
 
const api = supertest(app);

describe.concurrent('when there is initially some links saved', () => {

  test('links are returned as json', async () => {

    await api
      .get('/api/links')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('all links are returned', async () => {

    const numberOfSavedLinks = await Link.count();
    expect(numberOfSavedLinks).toEqual(numberOfLinks);

  });
  
  /* Difficult to test this because we are generating random titles */
  test.skip('a specific link is within the returned links', async () => {

    const savedLinks = await Link.findAll();
    const titles = savedLinks.map(e => e.title);

    expect(titles.includes('ECMAScript 6'));

  });

});

describe.concurrent('viewing a specific link', () => {
  
  test( 'a specific link can be viewed', async () => {

    const linkToView = await Link.findOne();

    const resultLink = await api
      .get(`/api/links/${linkToView?.id}`)
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

describe( 'adding a new link' , () => {

  test('link can be created', async() => {

    const link = 	{ 
      "url": "https://www.digitalocean.com/community/tutorials?q=%5Btutorial-series%5D" 
    };

    await api
      .post('/api/links/')
      .send(link)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const savedLinks = await Link.findAll();
    expect(savedLinks).toHaveLength(numberOfLinks + 1);

    const urls = savedLinks.map(link => link.url);
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

    const numberOfSavedLinks = await Link.count();

    expect(numberOfSavedLinks).toEqual(numberOfLinks+1);

  });

});

describe( 'deleting a link' , () => {
 
  test ( 'a link can be deleted', async() => {

    const linkToDelete = await Link.findOne();

    await api
      .delete(`/api/links/${linkToDelete?.id}`)
      .expect(204);

    const linksAfterDeletion = await Link.findAll();
    expect(linksAfterDeletion).toHaveLength( numberOfLinks );
    
    const titles = linksAfterDeletion.map(link => link.title);
    expect(titles).not.toContain(linkToDelete?.title);

  });

});