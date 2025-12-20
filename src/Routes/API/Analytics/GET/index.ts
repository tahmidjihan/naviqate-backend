import handleGetAnalyticsByOwner from './get.controller.js';
import getServices from './get.service.js';

export { handleGetAnalyticsByOwner, getServices };
export default { handleGetAnalyticsByOwner, ...getServices };
