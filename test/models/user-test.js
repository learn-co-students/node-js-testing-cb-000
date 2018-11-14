const chai = require('chai')
const supertest = require('supertest');

const bookshelf = require('../../app/db/bookshelf')
const User = require('../../app/models/user')

const expect = chai.expect

const mockUser = {
  email: 'email@email.com',
  name: 'Name',
  username: 'username'
}

describe('app', () => {
  describe('up', () => {
    it('is a function', () => {
      epect(app.up).to.be.an.instanceof(Function);
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      it('fails with an empty request body', done => {
        supertest(app).post('/user').expect(400, done);
      });
      it('succeeds with valid name, username, and email', done => {
        supertest(server).post('/user')
          .send({
            email: 'test@email.com',
            name: 'Test Man',
            username: 'testMan'
          }).set('content-type', 'application/json')
            .expect(200, done)
      });
    });
  });
});

describe('User', () => {
  let transaction;

  beforeEach(done => {
    bookshelf.transaction(t => {
      transaction = t;
      done();
    });
  });

  afterEach(() => {
    return transaction.rollback();
  });

  it('saves a record to the database', () => {
    return User.forge().save(mockUser, { transacting: transaction })
      .then(user => expect(user.get('id')).to.be.a('number'));
  });
});
