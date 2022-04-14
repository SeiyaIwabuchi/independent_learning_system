#!/bin/bash
yum -y install sqlite-devel
npm install sqlite3 --build-from-source --sqlite=/usr/local
