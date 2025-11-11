"""autogenerate: sync password_hash

Revision ID: 46ac17f45d5a
Revises: b171d665420f
Create Date: 2025-11-06 12:20:12.224951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46ac17f45d5a'
down_revision = 'b171d665420f'
branch_labels = None
depends_on = None


def upgrade():
    # Make the migration robust for existing data:
    # 1. add new column as NULLABLE
    # 2. copy data from old column `password` -> `password_hash`
    # 3. alter `password_hash` to NOT NULL
    # 4. drop old `password` column
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('password_hash', sa.String(length=255), nullable=True))

    # copy existing hashes from `password` to `password_hash`
    op.execute('UPDATE "user" SET password_hash = password')

    # now make the new column NOT NULL and drop the old one
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column(
            'password_hash', existing_type=sa.String(length=255), nullable=False)
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # Reverse the upgrade safely:
    # 1. add `password` column nullable
    # 2. copy data from `password_hash` to `password`
    # 3. make `password` NOT NULL
    # 4. drop `password_hash`
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(
            length=255), autoincrement=False, nullable=True))

    op.execute('UPDATE "user" SET password = password_hash')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column(
            'password', existing_type=sa.VARCHAR(length=255), nullable=False)
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
