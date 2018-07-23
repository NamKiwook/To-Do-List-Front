cd /home/ubuntu/To-Do/To-Do-List-Front
pm2 stop todo || true
npm run build
pm2 restart todo
