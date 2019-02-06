import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import UserController from '../controllers/user';
import CandidateController from '../controllers/candidate';
import middlewares from '../middlewares';

const router = express.Router();
router.post('/auth/signup', middlewares.validateSignUp, UserController.signup);
router.post('/auth/login', middlewares.validateUserLogin, UserController.login);
router.get('/parties', PartyController.getAllParty);
router.get('/offices', OfficeController.getAllOffice);

router.get('/parties/:id', PartyController.getParty);
router.get('/offices/:id', OfficeController.getOffice);
router.post('/parties/', middlewares.validateCreateParty, PartyController.createParty);
router.patch('/parties/:id/name', middlewares.validateUpdateParty, PartyController.updateParty);
router.delete('/parties/:id', PartyController.deleteParty);
router.post('/offices/', middlewares.validateOfficeInput, OfficeController.createOffice);
router.post('/office/:id/register', middlewares.validateCreateCandidate, CandidateController.enrollCandidate);

export default router;
