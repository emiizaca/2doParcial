const express = require('express');
const router = express.Router();
const tutorialesController = require('../controller/tutorialesController');

router.get("/", async (req, res, next) => {
    try {
        const tutoriales = await tutorialesController.getTutoriales();
        res.status(200).json(tutoriales);
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {

  const id = req.params.id;
  try {
      const tutorial = await tutorialesController.getTutorial(id);
      if (tutorial !==undefined)
        res.status(200).json(tutorial);
      else
        res.status(404).json("Not Found")
  } catch (e) {
      res.status(500).json(e);
      next(e);
  }
});


router.post("/", async(req, res, next) => {
  try {
      const tutorialAdd = await tutorialesController.addTutorial(req.body);
      res.status(201).json({ status: 'success', message: `${tutorialAdd} tutorial agregado.`, tutorial: req.body })
  } catch (e) {
    res.status(500).json(e);
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {

  const id = req.params.id;
  try {
      const removeTutorial = await tutorialesController.removeTutorial(id);
      if (removeTutorial === 1)
        res.status(200).json({status: 'success', message: `${removeTutorial} tutorial borrado.`});
      else
        res.status(404).json("Not Found")
  } catch (e) {
      res.status(500).json(e);
      next(e);
  }
});

router.delete("/", async (req, res, next) => {
    try {
        const tutoriales = await tutorialesController.removeTutoriales();
        res.status(200).json({status: 'success', message: `Todos los tutoriales fueron borrados.`});
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});


module.exports = router;