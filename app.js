const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    result: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'succes',
    requestAt: req.requestTime,
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'succes',
    data: { tour: '<Updated tour here...>' }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(204).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'succes',
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

const getUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

const createUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

const updateUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

const deleteUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App Runnig on port : ${port} `);
});
