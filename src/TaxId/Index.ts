import BlockTaxIdController from './Actions/BlockTaxIdController';
import DeleteTaxIdController from './Actions/DeleteTaxIdController';
import GetTaxIdController from './Actions/GetTaxIdController';
import ListTaxIdsController from './Actions/ListTaxIdsController';
import PostTaxIdController from './Actions/PostTaxIdController';
import UnblockTaxIdController from './Actions/UnblockTaxIdController';
import UpdateTaxIdController from './Actions/UpdateTaxIdController';
import BlockTaxIdService from './Services/BlockTaxIdService';
import DeleteTaxIdService from './Services/DeleteTaxIdService';
import GetTaxIdService from './Services/GetTaxIdService';
import IsTaxIdBlockedService from './Services/IsTaxIdBlockedService';
import ListTaxIdsService from './Services/ListTaxIdsService';
import PostTaxIdService from './Services/PostTaxIdService';
import UnblockTaxIdService from './Services/UnblockTaxIdService';
import UpdateTaxIdService from './Services/UpdateTaxIdService';
import TaxIdBlocklistRepository from './Storage/TaxIdBlocklistRepository';
import TaxIdRepository from './Storage/TaxIdRepository';
import BlockTaxIdTransformer from './Transformers/BlockTaxIdTransformer';
import DeleteTaxIdTransformer from './Transformers/DeleteTaxIdTransformer';
import GetTaxIdTransformer from './Transformers/GetTaxIdTransformer';
import ListTaxIdsTransformer from './Transformers/ListTaxIdsTransformer';
import PostTaxIdTransformer from './Transformers/PostTaxIdTransformer';
import UnblockTaxIdTransformer from './Transformers/UnblockTaxIdTransformer';
import UpdateTaxIdTransformer from './Transformers/UpdateTaxIdTransformer';

const taxIdRepository = new TaxIdRepository();

const taxIdBlocklistRepository = new TaxIdBlocklistRepository();

const postTaxIdTransformer = new PostTaxIdTransformer();
const listTaxIdsTransformer = new ListTaxIdsTransformer();
const getTaxIdTransformer = new GetTaxIdTransformer();
const updateTaxIdTransformer = new UpdateTaxIdTransformer();
const deleteTaxIdTransformer = new DeleteTaxIdTransformer();

const postTaxIdService = new PostTaxIdService(postTaxIdTransformer, taxIdRepository);
const listTaxIdsService = new ListTaxIdsService(listTaxIdsTransformer, taxIdRepository);
const getTaxIdService = new GetTaxIdService(getTaxIdTransformer, taxIdRepository);
const updateTaxIdService = new UpdateTaxIdService(updateTaxIdTransformer, taxIdRepository);
const deleteTaxIdService = new DeleteTaxIdService(taxIdRepository);
const blockTaxIdTransformer = new BlockTaxIdTransformer();
const unblockTaxIdTransformer = new UnblockTaxIdTransformer();

const blockTaxIdService = new BlockTaxIdService(taxIdBlocklistRepository);
const unblockTaxIdService = new UnblockTaxIdService(taxIdBlocklistRepository);
export const isTaxIdBlockedService = new IsTaxIdBlockedService(taxIdBlocklistRepository);

export const postTaxIdController = new PostTaxIdController(postTaxIdTransformer, postTaxIdService);
export const listTaxIdsController = new ListTaxIdsController(listTaxIdsTransformer, listTaxIdsService);
export const getTaxIdController = new GetTaxIdController(getTaxIdTransformer, getTaxIdService);
export const updateTaxIdController = new UpdateTaxIdController(updateTaxIdTransformer, updateTaxIdService);
export const deleteTaxIdController = new DeleteTaxIdController(deleteTaxIdTransformer, deleteTaxIdService);

export const blockTaxIdController = new BlockTaxIdController(blockTaxIdTransformer, blockTaxIdService);
export const unblockTaxIdController = new UnblockTaxIdController(unblockTaxIdTransformer, unblockTaxIdService);
