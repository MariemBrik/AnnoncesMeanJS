'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Annonce = mongoose.model('Annonce'),
	_ = require('lodash');

/**
 * Create a Annonce
 */
exports.create = function(req, res) {
	var annonce = new Annonce(req.body);
	
	annonce.user = req.user;
	//image:data.picture;


	annonce.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(annonce);
		}
	});
};

/**
 * Show the current Annonce
 */
exports.read = function(req, res) {
	res.jsonp(req.annonce);
};

/**
 * Update a Annonce
 */
exports.update = function(req, res) {
	var annonce = req.annonce ;

	annonce = _.extend(annonce , req.body);

	annonce.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(annonce);
		}
	});
};

/**
 * Delete an Annonce
 */
exports.delete = function(req, res) {
	var annonce = req.annonce ;

	annonce.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(annonce);
		}
	});
};

/**
 * List of Annonces
 */
exports.list = function(req, res) { 
	Annonce.find().sort('-created').populate('user', 'displayName').exec(function(err, annonces) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(annonces);
		}
	});
};

/**
 * Annonce middleware
 */
exports.annonceByID = function(req, res, next, id) { 
	Annonce.findById(id).populate('user', 'displayName').exec(function(err, annonce) {
		if (err) return next(err);
		if (! annonce) return next(new Error('Failed to load Annonce ' + id));
		req.annonce = annonce ;
		next();
	});
};

exports.annonceByPID = function(req, res, next, id) { 
	Annonce.findOne({'idbuilding':id}).populate('user', 'displayName').exec(function(err, annonce) {
		if (err) return next(err);
		if (! annonce) return next(new Error('Failed to load Annonce ' + id));
		req.annonce = annonce ;
		next();
	});
};

/**
 * Annonce authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.annonce.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');

exports.postImage = function(req, res) {
    var form = new multiparty.Form();
    
           
    form.parse(req, function(err, fields, files) {

        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        var destPath = 'public/modules/annonces/img/' + fileName;

        fs.rename(tmpPath, destPath, function(err) {
            if (err) {
                return res.status(400).send('Image is not saved:');
            }
	   		var data= {picturename:fileName};
        	res.send(data);
	   		
             //Send the file name while success in storing photo
				       //You need this name to put it in your database
        });
    });
};
