import { Request, Response } from "express";
import { getManager } from "typeorm";
import { SelectedMarker } from "../../entity/SelectedMarker";

export const getSelectedMarker = async (
  request: Request,
  response: Response
) => {
  const markerRepository = getManager().getRepository(SelectedMarker);
  const getMarker = await markerRepository.findOne(request.params.id);

  if (getMarker.userId !== request.user.userData.userId) {
    return response.json(getMarker);
  } else {
    Promise.reject("Forbidden");
  }
};
