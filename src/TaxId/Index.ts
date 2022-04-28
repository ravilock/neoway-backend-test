import GetTaxIdController from './Actions/GetTaxIdController';
import ListTaxIdsController from './Actions/ListTaxIdsController';
import PostTaxIdController from './Actions/PostTaxIdController';
import UpdateTaxIdController from './Actions/UpdateTaxIdController';
import GetTaxIdService from './Services/GetTaxIdService';
import ListTaxIdsService from './Services/ListTaxIdsService';
import PostTaxIdService from './Services/PostTaxIdService';
import UpdateTaxIdService from './Services/UpdateTaxIdService';
import TaxIdRepository from './Storage/TaxIdRepository';
import GetTaxIdTransformer from './Transformers/GetTaxIdTransformer';
import ListTaxIdsTransformer from './Transformers/ListTaxIdsTransformer';
import PostTaxIdTransformer from './Transformers/PostTaxIdTransformer';
import UpdateTaxIdTransformer from './Transformers/UpdateTaxIdTransformer';

const taxIdRepository = new TaxIdRepository();

const postTaxIdTransformer = new PostTaxIdTransformer();
const listTaxIdsTransformer = new ListTaxIdsTransformer();
const getTaxIdTransformer = new GetTaxIdTransformer();
const updateTaxIdTransformer = new UpdateTaxIdTransformer();

const postTaxIdService = new PostTaxIdService(postTaxIdTransformer, taxIdRepository);
const listTaxIdsService = new ListTaxIdsService(listTaxIdsTransformer, taxIdRepository);
const getTaxIdService = new GetTaxIdService(getTaxIdTransformer, taxIdRepository);
const updateTaxIdService = new UpdateTaxIdService(updateTaxIdTransformer, taxIdRepository);

export const postTaxIdController = new PostTaxIdController(postTaxIdTransformer, postTaxIdService);
export const listTaxIdsController = new ListTaxIdsController(listTaxIdsTransformer, listTaxIdsService);
export const getTaxIdController = new GetTaxIdController(getTaxIdTransformer, getTaxIdService);
export const updateTaxIdController = new UpdateTaxIdController(updateTaxIdTransformer, updateTaxIdService);
