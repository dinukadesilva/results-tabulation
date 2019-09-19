from app import db
from util import RequestBody, get_ballot_type

from schemas import ZonalAroResponseSchema as Schema
from orm.entities import ZonalAroResponse
import connexion


def get_all(pollingStationId):
    result = ZonalAroResponse.get_by_id(
        pollingStationId=pollingStationId
    )

    return Schema(many=True).dump(result).data


def create(pollingStationId, zonalAroQuestionId):
    result = ZonalAroResponse.create(
        pollingStationId=pollingStationId,
        zonalAroQuestionId=zonalAroQuestionId
    )

    db.session.commit()

    return Schema().dump(result).data, 201
