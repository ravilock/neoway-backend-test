import PostTaxIdController from './Actions/PostTaxIdController';
import PostTaxIdService from './Services/PostTaxIdService';
import PostTaxIdTransformer from './Transformers/PostTaxIdTransformer';

const postTaxIdTransformer = new PostTaxIdTransformer();

const postTaxIdService = new PostTaxIdService(postTaxIdTransformer);

export const postTaxIdController = new PostTaxIdController(postTaxIdTransformer, postTaxIdService);
