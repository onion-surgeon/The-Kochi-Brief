from logging.config import fileConfig

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import pool

from alembic import context

from app.core.db.base import Base
from app.models.user import User

import asyncio
import os

from dotenv import load_dotenv
load_dotenv() 

DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL not set in environment")

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.





async def run_migrations_online():
    connectable = create_async_engine(DATABASE_URL, poolclass=pool.NullPool,
                    connect_args={'server_settings': {'sslmode': 'require','channel_binding':'require'}})

    async with connectable.connect() as connection:
        await connection.run_sync(lambda conn: context.configure(
            connection=conn,
            target_metadata=target_metadata
        ))

        await connection.run_sync(lambda conn: context.run_migrations())
        await connection.commit()

def run_migrations_online_sync():
    asyncio.run(run_migrations_online())


run_migrations_online_sync()

