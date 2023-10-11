#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ScrapAppStack } from "../lib/scrap-app-stack";

const app = new cdk.App();
new ScrapAppStack(app, "InfrastructureStack");
