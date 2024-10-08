import { createResponse } from '../../utils/createResponse.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';
import * as adminsService from './admins.service.js';

export const createAdmin = asyncHandler(async (req, res) => {
  const admin = req.body;
  await adminsService.create(admin);
  return res.status(201).json(createResponse(201));
});

export const getAll = asyncHandler(async (req, res) => {
  const result = await adminsService.get(req.query);
  return res.status(200).json(createResponse(200, result));
});

export const updateRole = asyncHandler(async (req, res) => {
  const result = await adminsService.updateRole(req.params.id, req.body.role);
  return res.status(200).json(createResponse(200, result));
});

export const removeAdmin = asyncHandler(async (req, res) => {
  await adminsService.removeAdmin(req.params.id, true);
  return res.status(200).json(createResponse(200));
});

export const unRemoveAdmin = asyncHandler(async (req, res) => {
  await adminsService.removeAdmin(req.params.id, false);
  return res.status(200).json(createResponse(200));
});
