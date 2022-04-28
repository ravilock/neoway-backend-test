import ListTaxIdsController from './Actions/ListTaxIdsController';
import PostTaxIdController from './Actions/PostTaxIdController';
import ListTaxIdsService from './Services/ListTaxIdsService';
import PostTaxIdService from './Services/PostTaxIdService';
import TaxIdRepository from './Storage/TaxIdRepository';
import ListTaxIdsTransformer from './Transformers/ListTaxIdsTransformer';
import PostTaxIdTransformer from './Transformers/PostTaxIdTransformer';

const taxIdRepository = new TaxIdRepository();

const postTaxIdTransformer = new PostTaxIdTransformer();
const listTaxIdsTransformer = new ListTaxIdsTransformer();

const postTaxIdService = new PostTaxIdService(postTaxIdTransformer, taxIdRepository);
const listTaxIdsService = new ListTaxIdsService(listTaxIdsTransformer, taxIdRepository);

export const postTaxIdController = new PostTaxIdController(postTaxIdTransformer, postTaxIdService);
export const listTaxIdsController = new ListTaxIdsController(listTaxIdsTransformer, listTaxIdsService);
