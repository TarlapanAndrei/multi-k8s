docker bulid -t andreitarlapan/multi-client:latest -t andreitarlapan/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t andreitarlapan/multi-server:latest -t andreitarlapan/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t andreitarlapan/multi-worker:latest -t andreitarlapan/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push andreitarlapan/multi-client:latest
docker push andreitarlapan/multi-server:latest
docker push andreitarlapan/multi-worker:latest

docker push andreitarlapan/multi-client:$SHA
docker push andreitarlapan/multi-server:$SHA
docker push andreitarlapan/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=andreitarlapan/multi-server:$SHA
kubectl set image deployments/client-deployment client=andreitarlapan/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=andreitarlapan/multi-worker:$SHA