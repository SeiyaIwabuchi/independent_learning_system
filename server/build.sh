#!/bin/bash
npx sequelize db:migrate --env=school;
npx next build;
