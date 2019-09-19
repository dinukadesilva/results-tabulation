from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import and_, cast, Integer
from sqlalchemy.orm import relationship

from app import db

from orm.entities import ZonalAroQuestion, Area


class ZonalAroResponseModel(db.Model):
    __tablename__ = 'zonalAroResponse'
    zonalAroResponseId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    zonalAroQuestionId = db.Column(db.Integer, db.ForeignKey(ZonalAroQuestion.Model.__table__.c.zonalAroQuestionId),
                                   nullable=False)
    pollingStationId = db.Column(db.Integer, db.ForeignKey(Area.Model.__table__.c.areaId), nullable=False)
    done = db.Column(db.Boolean(), default=True, nullable=False)

    zonalAroQuestion = relationship(ZonalAroQuestion.Model, foreign_keys=[zonalAroQuestionId])
    zonalAroQuestionText = association_proxy("zonalAroQuestion", "zonalAroQuestionText")

    __table_args__ = (
        db.UniqueConstraint('zonalAroQuestionId', 'pollingStationId', name='ZonalAroResponse'),
    )

    def __init__(self, pollingStationId, zonalAroQuestionId):
        super(ZonalAroResponseModel, self).__init__(
            zonalAroQuestionId=zonalAroQuestionId,
            pollingStationId=pollingStationId
        )

        db.session.add(self)
        db.session.flush()


Model = ZonalAroResponseModel


def get_by_id(pollingStationId, zonalAroQuestionId=None):
    return db.session.query(
        ZonalAroQuestion.Model.zonalAroQuestionId,
        ZonalAroQuestion.Model.zonalAroQuestionText,
        db.case([(ZonalAroResponseModel.zonalAroResponseId == None, False)], else_=True).label("done")
    ).join(
        ZonalAroResponseModel,
        and_(
            ZonalAroResponseModel.zonalAroQuestionId == ZonalAroQuestion.Model.zonalAroQuestionId,
            ZonalAroResponseModel.pollingStationId == pollingStationId
        ),
        isouter=True
    ).all()


def create(pollingStationId, zonalAroQuestionId):
    result = Model(
        zonalAroQuestionId=zonalAroQuestionId,
        pollingStationId=pollingStationId
    )

    db.session.add(result)
    db.session.flush()

    return result
