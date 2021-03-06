"""empty message

Revision ID: 89dc7b6495d7
Revises: 56b012b2b5dc
Create Date: 2019-09-03 16:18:01.980659

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89dc7b6495d7'
down_revision = '56b012b2b5dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tallySheetVersionRow_ALL_ISLAND_RESULT',
    sa.Column('tallySheetVersionRowId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('tallySheetVersionId', sa.Integer(), nullable=False),
    sa.Column('candidateId', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['candidateId'], ['candidate.candidateId'], ),
    sa.ForeignKeyConstraint(['tallySheetVersionId'], ['tallySheetVersion.tallySheetVersionId'], ),
    sa.PrimaryKeyConstraint('tallySheetVersionRowId'),
    sa.UniqueConstraint('tallySheetVersionId', 'candidateId', name='CandidatePerALL_ISLAND_RESULT')
    )
    op.create_table('tallySheetVersionRow_PRE_30_ED',
    sa.Column('tallySheetVersionRowId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('tallySheetVersionId', sa.Integer(), nullable=False),
    sa.Column('candidateId', sa.Integer(), nullable=False),
    sa.Column('pollingDivisionId', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['candidateId'], ['candidate.candidateId'], ),
    sa.ForeignKeyConstraint(['pollingDivisionId'], ['area.areaId'], ),
    sa.ForeignKeyConstraint(['tallySheetVersionId'], ['tallySheetVersion.tallySheetVersionId'], ),
    sa.PrimaryKeyConstraint('tallySheetVersionRowId'),
    sa.UniqueConstraint('tallySheetVersionId', 'candidateId', 'pollingDivisionId', name='CandidateAndPollingDivision')
    )
    op.create_table('tallySheetVersionRow_PRE_30_PD',
    sa.Column('tallySheetVersionRowId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('tallySheetVersionId', sa.Integer(), nullable=False),
    sa.Column('candidateId', sa.Integer(), nullable=False),
    sa.Column('countingCentreId', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['candidateId'], ['candidate.candidateId'], ),
    sa.ForeignKeyConstraint(['countingCentreId'], ['area.areaId'], ),
    sa.ForeignKeyConstraint(['tallySheetVersionId'], ['tallySheetVersion.tallySheetVersionId'], ),
    sa.PrimaryKeyConstraint('tallySheetVersionRowId'),
    sa.UniqueConstraint('tallySheetVersionId', 'candidateId', 'countingCentreId', name='CandidateAndCountingCentrePerPRE30PD')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tallySheetVersionRow_PRE_30_PD')
    op.drop_table('tallySheetVersionRow_PRE_30_ED')
    op.drop_table('tallySheetVersionRow_ALL_ISLAND_RESULT')
    # ### end Alembic commands ###
