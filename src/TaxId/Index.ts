import PostTaxIdController from './Actions/PostTaxIdController';
import PostTaxIdService from './Services/PostTaxIdService';
import TaxIdRepository from './Storage/TaxIdRepository';
import PostTaxIdTransformer from './Transformers/PostTaxIdTransformer';

const taxIdRepository = new TaxIdRepository();

const postTaxIdTransformer = new PostTaxIdTransformer();

const postTaxIdService = new PostTaxIdService(postTaxIdTransformer, taxIdRepository);

export const postTaxIdController = new PostTaxIdController(postTaxIdTransformer, postTaxIdService);
