'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Annonce = mongoose.model('Annonce'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, annonce;

/**
 * Annonce routes tests
 */
describe('Annonce CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Annonce
		user.save(function() {
			annonce = {
				name: 'Annonce Name'
			};

			done();
		});
	});

	it('should be able to save Annonce instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Annonce
				agent.post('/annonces')
					.send(annonce)
					.expect(200)
					.end(function(annonceSaveErr, annonceSaveRes) {
						// Handle Annonce save error
						if (annonceSaveErr) done(annonceSaveErr);

						// Get a list of Annonces
						agent.get('/annonces')
							.end(function(annoncesGetErr, annoncesGetRes) {
								// Handle Annonce save error
								if (annoncesGetErr) done(annoncesGetErr);

								// Get Annonces list
								var annonces = annoncesGetRes.body;

								// Set assertions
								(annonces[0].user._id).should.equal(userId);
								(annonces[0].name).should.match('Annonce Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Annonce instance if not logged in', function(done) {
		agent.post('/annonces')
			.send(annonce)
			.expect(401)
			.end(function(annonceSaveErr, annonceSaveRes) {
				// Call the assertion callback
				done(annonceSaveErr);
			});
	});

	it('should not be able to save Annonce instance if no name is provided', function(done) {
		// Invalidate name field
		annonce.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Annonce
				agent.post('/annonces')
					.send(annonce)
					.expect(400)
					.end(function(annonceSaveErr, annonceSaveRes) {
						// Set message assertion
						(annonceSaveRes.body.message).should.match('Please fill Annonce name');
						
						// Handle Annonce save error
						done(annonceSaveErr);
					});
			});
	});

	it('should be able to update Annonce instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Annonce
				agent.post('/annonces')
					.send(annonce)
					.expect(200)
					.end(function(annonceSaveErr, annonceSaveRes) {
						// Handle Annonce save error
						if (annonceSaveErr) done(annonceSaveErr);

						// Update Annonce name
						annonce.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Annonce
						agent.put('/annonces/' + annonceSaveRes.body._id)
							.send(annonce)
							.expect(200)
							.end(function(annonceUpdateErr, annonceUpdateRes) {
								// Handle Annonce update error
								if (annonceUpdateErr) done(annonceUpdateErr);

								// Set assertions
								(annonceUpdateRes.body._id).should.equal(annonceSaveRes.body._id);
								(annonceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Annonces if not signed in', function(done) {
		// Create new Annonce model instance
		var annonceObj = new Annonce(annonce);

		// Save the Annonce
		annonceObj.save(function() {
			// Request Annonces
			request(app).get('/annonces')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Annonce if not signed in', function(done) {
		// Create new Annonce model instance
		var annonceObj = new Annonce(annonce);

		// Save the Annonce
		annonceObj.save(function() {
			request(app).get('/annonces/' + annonceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', annonce.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Annonce instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Annonce
				agent.post('/annonces')
					.send(annonce)
					.expect(200)
					.end(function(annonceSaveErr, annonceSaveRes) {
						// Handle Annonce save error
						if (annonceSaveErr) done(annonceSaveErr);

						// Delete existing Annonce
						agent.delete('/annonces/' + annonceSaveRes.body._id)
							.send(annonce)
							.expect(200)
							.end(function(annonceDeleteErr, annonceDeleteRes) {
								// Handle Annonce error error
								if (annonceDeleteErr) done(annonceDeleteErr);

								// Set assertions
								(annonceDeleteRes.body._id).should.equal(annonceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Annonce instance if not signed in', function(done) {
		// Set Annonce user 
		annonce.user = user;

		// Create new Annonce model instance
		var annonceObj = new Annonce(annonce);

		// Save the Annonce
		annonceObj.save(function() {
			// Try deleting Annonce
			request(app).delete('/annonces/' + annonceObj._id)
			.expect(401)
			.end(function(annonceDeleteErr, annonceDeleteRes) {
				// Set message assertion
				(annonceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Annonce error error
				done(annonceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Annonce.remove().exec();
		done();
	});
});