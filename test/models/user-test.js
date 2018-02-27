const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const User = require('../../app/models/user')
const supertest = require('supertest')
const expect = chai.expect

const mockUser = {
  email: 'email@email.com',
  name: 'Name',
  username: 'username'
}

describe('User', function(){
	let transaction;

	beforeEach(done => {
		bookshelf.transaction(t => {
			transaction = t
			done()
		})
	})

	afterEach(function(){
		return transaction.rollback()
	})

	it('saves a record to the database', function(){
		return User.forge()
		.save(mockUser, {transacting: transaction})
		.then(user => {
			expect(user.get('id')).to.be.a('number')
		})
	})
})
describe('app', function() {
  describe('up', function() {
    it('is a function', function() {
      expect(app.up).to.be.an.instanceof(Function)
    })
  })

  describe('/user', function() {
    describe('POST', function() {
      it('fails with an empty request body', function(done) {
        supertest(server).
          post('/user').
          expect(400, done)
      })

      /** This is new! */
      it('succeeds with valid name, username, and email', function(done) {
        supertest(server).
          post('/user').
          send({
            email: 'test@email.com',
            name: 'testName',
            username: 'testUsername'
          }).
          set('content-type', 'application/json').
          expect(200, done)
      })
    })
  })
