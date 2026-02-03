#!/bin/bash
cd /home/kavia/workspace/code-generation/fashion-lifestyle-admin-dashboard-211069-211078/admin_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

