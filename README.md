To run the application:
1) DB initialization - docker compose up
2) npx prisma migrate dev --name init - migration tables
3)  npx prisma db seed - add to DB some data
4) npm start
