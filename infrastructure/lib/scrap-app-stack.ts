import {
  RemovalPolicy,
  Stack,
  StackProps,
  aws_apigateway,
  aws_dynamodb,
  aws_lambda,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class ScrapAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new aws_lambda.Function(this, "Lambda", {
      functionName: "scrap-app-functions",
      code: aws_lambda.Code.fromAsset("../backend/dist"),
      handler: "index.handler",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
      },
    });

    const api = new aws_apigateway.RestApi(this, "Api", {
      restApiName: "scrap-app-api",
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
      },
    });
    api.root.addProxy({
      defaultIntegration: new aws_apigateway.LambdaIntegration(fn),
    });

    const scrapsTable = new aws_dynamodb.Table(this, "ScrapsTable", {
      tableName: "scrapp-app-scraps",
      partitionKey: {
        name: "id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      readCapacity: 5,
      writeCapacity: 5,
      pointInTimeRecovery: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    scrapsTable.addGlobalSecondaryIndex({
      indexName: "CreatedAtIndex",
      partitionKey: {
        name: "createdAt",
        type: aws_dynamodb.AttributeType.STRING,
      },
    });
    scrapsTable.addGlobalSecondaryIndex({
      indexName: "UserIndex",
      partitionKey: {
        name: "userId",
        type: aws_dynamodb.AttributeType.STRING,
      },
    });
    scrapsTable.grantReadWriteData(fn);
  }
}
