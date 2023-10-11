import { Stack, StackProps, aws_apigateway, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

export class ScrapAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new aws_lambda.Function(this, "Lambda", {
      functionName: "scrap-app",
      code: aws_lambda.Code.fromAsset("../backend/dist"),
      handler: "index.handler",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
      },
    });

    const api = new aws_apigateway.RestApi(this, "Api", {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
      },
    });
    api.root.addProxy({
      defaultIntegration: new aws_apigateway.LambdaIntegration(fn),
    });
  }
}
