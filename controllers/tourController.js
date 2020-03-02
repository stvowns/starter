const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Param Middleware
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please add name and price!'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    result: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'succes',
    requestAt: req.requestTime,
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'succes',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: { tour: '<Updated tour here...>' }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'succes',
    data: null
  });
};
