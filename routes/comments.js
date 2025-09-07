const express = require("express");
const router = express.Router();

const comments = require("../data/comments")
const error = require("../utilities/error")

routes.route("/")
      .get((req, res) => {
        res.json({comments})
      })