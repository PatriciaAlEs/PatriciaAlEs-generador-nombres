"""create placeholder migration to satisfy alembic history

Revision ID: b171d665420f
Revises: 0763d677d453
Create Date: 2025-11-06 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b171d665420f'
down_revision = '0763d677d453'
branch_labels = None
depends_on = None


def upgrade():
    # placeholder: no schema changes
    pass


def downgrade():
    # placeholder: no schema changes
    pass
