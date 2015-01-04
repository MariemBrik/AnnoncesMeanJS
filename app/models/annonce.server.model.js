'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Annonce Schema
 */
var AnnonceSchema = new Schema({
    idbuilding: {
		type: String,
		required: '',
		trim: true
	},
	name: {
		type: String,
		required: '',
		trim: true
	},
	surface: {
		type: Number,
		required: '',
		trim: true
	},
	prix: {
		type: Number,
		required: '',
		trim: true
	},
	nombre: {
		type: Number,
		required: '',
		trim: true
	},
	email: {
		type: String,
		required: '',
		trim: true
	},
	contact: {
		type: String,
		required: '',
		trim: true
	},
	info: {
		type: String,
		required: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});



mongoose.model('Annonce', AnnonceSchema);