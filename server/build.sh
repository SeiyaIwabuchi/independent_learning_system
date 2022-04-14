#!/bin/bash
npx sequelize db:migrate --env=home;
npx next build;
