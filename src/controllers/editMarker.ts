import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Marker } from "../entity/Marker";

export const editMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);

  const marker = request.files
    ? {
        name: request.body.markerName,
        icon: request.files[0].filename,
        id: parseInt(request.params.id)
      }
    : {
        name: request.body.name,
        icon: request.body.icon,
        id: parseInt(request.params.id)
      };

  const editedMarker = await markerRepository
    .preload(marker)
    .then(updatedMarker => markerRepository.save(updatedMarker));
  return response.json(editedMarker);
};
