import aws_cdk as core
import aws_cdk.assertions as assertions

from eda_video_streaming_demo.eda_video_streaming_demo_stack import EdaVideoStreamingDemoStack

# example tests. To run these tests, uncomment this file along with the example
# resource in eda_video_streaming_demo/eda_video_streaming_demo_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = EdaVideoStreamingDemoStack(app, "eda-video-streaming-demo")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
