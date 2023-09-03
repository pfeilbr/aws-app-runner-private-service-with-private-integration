# aws-app-runner-private-service-with-private-integration

based on [KarlDeux/arps](https://github.com/KarlDeux/arps)

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



```

## TODO

- test via cloud shell (runs in VPC)
- private service only accessible via VPC
- private integration only accessible via VPC. e.g. RDS DB in private subnet
- apig -> lambda with VPC access/config to test private app runner service.  this is a lot easier than running ec2 in a VPC

## screenshots

![](https://www.evernote.com/shard/s1/sh/18a71605-9778-4af0-8800-d465998408b6/8tyXunWbDknpVYVKaounQONUrPUpMtjhftgC_RcpyJ8U2V4fsJ-bABJP2w/deep/0/image.png)

## Resources

- [KarlDeux/arps](https://github.com/KarlDeux/arps)