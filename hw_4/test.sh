cd express-mongo-redis
docker-compose -f docker/docker-compose-dev.yml up -d
sleep 30
siege -c10 -t30S --content-type "application/json" 'http://localhost:45000/api/users POST {"email": "email", "name": "test", "last_name": "test"}'
docker-compose -f docker/docker-compose-dev.yml restart
sleep 30
siege -c20 -t30S --content-type "application/json" 'http://localhost:45000/api/users POST {"email": "email", "name": "test", "last_name": "test"}'
docker-compose -f docker/docker-compose-dev.yml restart
sleep 30
siege -c40 -t30S --content-type "application/json" 'http://localhost:45000/api/users POST {"email": "email", "name": "test", "last_name": "test"}'
docker-compose -f docker/docker-compose-dev.yml restart
sleep 30
siege -c100 -t30S --content-type "application/json" 'http://localhost:45000/api/users POST {"email": "email", "name": "test", "last_name": "test"}'
