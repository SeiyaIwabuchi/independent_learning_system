#!/bin/bash
npx sequelize db:migrate --env=home;
npx next build;
# "npx next start" to start server
