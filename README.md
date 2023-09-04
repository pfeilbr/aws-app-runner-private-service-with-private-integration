# aws-app-runner-private-service-with-private-integration

based on [KarlDeux/arps](https://github.com/KarlDeux/arps)

- 

## Demo

```sh
export AWS_PROFILE="hub01-admin"
export STACK_NAME=aws-app-runner-private-service-with-private-integration
export REGION=us-east-1

sam build --use-container

sam deploy --guided
sam deploy

aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs' \
  > stack-outputs.json

# test the enpoint.  this public apig endpoint calls a lambda fn in vpc that calls a private app runner service
watch curl https://r4d8inqs3m.execute-api.us-east-1.amazonaws.com/Prod/test

# get default vpc id
export DEFAULT_VPC_ID=$(aws ec2 describe-vpcs --region $REGION  --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text)

aws ec2 describe-subnets --filters "Name=vpc-id,Values=${DEFAULT_VPC_ID}" --query "Subnets[].SubnetId" --output text


sam delete --no-prompts

aws cloudformation delete-stack --stack-name $STACK_NAME

docker build -t hello-world-express .
docker run -p 8000:8000 hello-world-express

# deployment and event logs
/aws/apprunner/code-based-private-endpoint-1/58b5e70db6aa4481b6cf42ca0c38b5f9/service

# application logs
/aws/apprunner/private-endpoint-1/cc0078056c7d48ab9b434dfcadc796f3/application

```

## TODO

- test via cloud shell (runs in VPC)
- private service only accessible via VPC
- private integration only accessible via VPC. e.g. RDS DB in private subnet
- apig -> lambda with VPC access/config to test private app runner service.  this is a lot easier than running ec2 in a VPC

## screenshots

![](https://www.evernote.com/shard/s1/sh/18a71605-9778-4af0-8800-d465998408b6/8tyXunWbDknpVYVKaounQONUrPUpMtjhftgC_RcpyJ8U2V4fsJ-bABJP2w/deep/0/image.png)

![](https://www.evernote.com/shard/s1/sh/7b8db5c2-c94b-4816-b8ea-44b793009a70/79hssC8rmg7EKpAcAIfULgZAMUNIRX7LCQWeBLBaQd3F1eMWNt-zTJDGzQ/deep/0/image.png)

![](https://www.evernote.com/shard/s1/sh/6a3a5d1e-4f33-4aa8-bbc9-7ea09028c664/fQLL1ac2vuxEmKIYW8mzvmsUQ8Ke2SMY0stWe6g2u2v9cega-Q9picndVQ/deep/0/image.png)

![](https://www.evernote.com/shard/s1/sh/9fd913ef-76ea-46bc-97d4-4a2c8e8ac988/iu3nUqPrG6gHYybuZ1uJMpoKgoE1JAzB6FSpBQfIbMnj1PfSfDdiCAJf4w/deep/0/image.png)

## Resources

- [KarlDeux/arps](https://github.com/KarlDeux/arps)