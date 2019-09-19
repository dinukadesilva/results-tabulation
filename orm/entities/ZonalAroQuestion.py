
from app import db



class ZonalAroQuestionModel(db.Model):
    __tablename__ = 'zonalAroQuestion'
    zonalAroQuestionId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    electionId = db.Column(db.Integer, db.ForeignKey("election.electionId"))
    zonalAroQuestionText = db.Column(db.String(300), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('electionId', 'zonalAroQuestionText', name='QuestionPerElection'),
    )

    def __init__(self, electionId, zonalAroQuestionText):
        super(ZonalAroQuestionModel, self).__init__(
            electionId=electionId,
            zonalAroQuestionText=zonalAroQuestionText
        )

        db.session.add(self)
        db.session.flush()


Model = ZonalAroQuestionModel


def create(electionId, zonalAroQuestionText):
    result = Model(
        electionId=electionId,
        zonalAroQuestionText=zonalAroQuestionText
    )

    return result
