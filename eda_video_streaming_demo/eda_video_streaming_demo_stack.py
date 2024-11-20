from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_s3_deployment as s3deploy,
    aws_cloudfront as cloudfront,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct
from aws_solutions_constructs.aws_cloudfront_s3 import CloudFrontToS3


class EdaVideoStreamingDemoStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create S3 bucket
        website_bucket = s3.Bucket(
            self, "WebsiteBucket",
            auto_delete_objects=True,
            removal_policy=RemovalPolicy.DESTROY,
            enforce_ssl=True,
        )

        # Deploy index.html to the S3 bucket
        s3deploy.BucketDeployment(
            self, "DeployWebsite",
            sources=[s3deploy.Source.asset("./website")],  # Using the website subdirectory
            destination_bucket=website_bucket,
            retain_on_delete=False,
        )

        # Create CloudFront distribution with S3 origin
        cloudfront_to_s3 = CloudFrontToS3(
            self, "CloudFrontToS3",
            existing_bucket_obj=website_bucket,
            cloud_front_distribution_props={
                "defaultBehavior": {
                    "originRequestPolicy": cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
                    "viewerProtocolPolicy": cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    'cachePolicy': cloudfront.CachePolicy.CACHING_DISABLED,
                }
            }
        )

        # Output the CloudFront URL
        CfnOutput(
            self, "CloudFrontURL",
            value=cloudfront_to_s3.cloud_front_web_distribution.distribution_domain_name,
            description="CloudFront URL"
        )
