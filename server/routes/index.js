import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import UserController from '../controllers/user';
import CandidateController from '../controllers/candidate';
import middlewares from '../middlewares';
import VoteController from '../controllers/vote';

const router = express.Router();
router.post('/auth/signup', middlewares.validateSignUp, UserController.signup);
router.post('/auth/login', middlewares.validateUserLogin, UserController.login);
router.get('/parties', PartyController.getAllParty);
router.get('/offices', OfficeController.getAllOffice);
router.get('/office/:id/result', VoteController.getVoteResult);
router.get('/parties/:id', PartyController.getParty);
router.get('/offices/:id', OfficeController.getOffice);


router.post('/parties/', middlewares.verifyToken, middlewares.validateCreateParty, PartyController.createParty);
router.patch('/parties/:id/name', middlewares.verifyToken, middlewares.validateUpdateParty, PartyController.updateParty);
router.delete('/parties/:id', middlewares.verifyToken, PartyController.deleteParty);
router.post('/offices/', middlewares.verifyToken, middlewares.validateOfficeInput, OfficeController.createOffice);
router.post('/office/:id/register', middlewares.verifyToken, middlewares.validateCreateCandidate, CandidateController.enrollCandidate);
router.post('/votes', middlewares.verifyToken, middlewares.validateCreateVote, VoteController.createVote);


export default router;
