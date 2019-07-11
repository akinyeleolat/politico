import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import UserController from '../controllers/user';
import CandidateController from '../controllers/candidate';
import middlewares from '../middlewares';
import VoteController from '../controllers/vote';
import PetitionController from '../controllers/petition';

const router = express.Router();
/** Unaunthenticated route */
router.post('/auth/signup', middlewares.validateSignUp, UserController.signup);
router.post('/auth/login', middlewares.validateUserLogin, UserController.login);
router.get('/parties', PartyController.getAllParty);
router.get('/offices', OfficeController.getAllOffice);
router.get('/parties/:id', PartyController.getParty);
router.get('/offices/:id', OfficeController.getOffice);
router.get('/office/:id/candidate', CandidateController.viewApprovedCandidate);

/** Authenticated Admin route */
router.get('/auth/users', middlewares.verifyAdminToken, UserController.getAllUsers);
router.post('/parties/', middlewares.verifyAdminToken, middlewares.validateCreateParty, PartyController.createParty);
router.patch('/parties/:id/name', middlewares.verifyAdminToken, middlewares.validateUpdateParty, PartyController.updateParty);
router.delete('/parties/:id', middlewares.verifyAdminToken, PartyController.deleteParty);
router.post('/offices/', middlewares.verifyAdminToken, middlewares.validateOfficeInput, OfficeController.createOffice);
router.patch('/office/:candidateId/register/:officeId', middlewares.verifyAdminToken, middlewares.validateCandidateApproval, CandidateController.approveCandidate);
router.get('/office/:id/interestedcandidate', middlewares.verifyAdminToken, CandidateController.viewInterestedCandidate);
router.get('/petitions/', middlewares.verifyAdminToken, PetitionController.getAllPetition);
router.get('/petitions/:id', middlewares.verifyAdminToken, PetitionController.getPetition);
router.delete('/petitions/:id', middlewares.verifyAdminToken, PetitionController.deletePetition);
/** Authenticated User route */
router.post('/candidate/', middlewares.verifyToken, middlewares.validateCreateCandidate, CandidateController.enrollCandidate);
router.post('/votes', middlewares.verifyToken, middlewares.validateCreateVote, VoteController.createVote);
router.get('/office/:id/result', middlewares.verifyToken, VoteController.getVoteResult);
router.patch('/petitions/:id', middlewares.verifyToken, PetitionController.updatePetition);


export default router;
