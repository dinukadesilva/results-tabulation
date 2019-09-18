"""empty message

Revision ID: eeb1bca5db44
Revises: b2375d5a0330
Create Date: 2019-09-18 09:42:10.113202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eeb1bca5db44'
down_revision = 'b2375d5a0330'
branch_labels = None
depends_on = None


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('area', sa.Column('_registeredVotersCount', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('area', '_registeredVotersCount')
    ### end Alembic commands ###
