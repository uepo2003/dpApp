"""Generated message classes for workflowexecutions version v1alpha1.

Execute workflows created with Workflows API.
"""
# NOTE: This file is autogenerated and should not be edited by hand.

from __future__ import absolute_import

from apitools.base.protorpclite import messages as _messages
from apitools.base.py import encoding


package = 'workflowexecutions'


class CancelExecutionRequest(_messages.Message):
  r"""Request for the `CancelExecution` method."""


class Execution(_messages.Message):
  r"""A running instance of Cloud Workflow.

  Enums:
    StateValueValuesEnum: Output only. Current state of Cloud Workflow
      Execution.

  Fields:
    argument: Input parameters of the Cloud Workflow represented as a JSON
      string.
    endTime: Output only. Marks the end of execution, successful or not.
    error: Output only. The error which caused the execution to fail. The
      value is only present if the execution's state is FAILED.
    name: Output only. Resource name of the Cloud Workflow Execution. It must
      have the format of "projects/*/locations/*/workflows/*/executions/*".
      For example: "projects/project1/locations/us-
      central1/workflows/workflow1/executions/execution1".
    result: Output only. Output of the Cloud Workflow represented as a JSON
      string. The value is only present if the execution's state is FINISHED.
    startTime: Output only. Marks the beginning of execution.
    state: Output only. Current state of Cloud Workflow Execution.
    workflowVersionId: Output only. The version of the workflow used.
  """

  class StateValueValuesEnum(_messages.Enum):
    r"""Output only. Current state of Cloud Workflow Execution.

    Values:
      STATE_UNSPECIFIED: Invalid state.
      ACTIVE: The Workflow Execution is in progress.
      SUCCEEDED: The Workflow Execution has finished successfully.
      FAILED: The Workflow Execution failed with an error.
      CANCELLED: The Workflow Execution has been stopped intentionally.
      UNAVAILABLE: Reserved for future use.
      QUEUED: Request has been placed in the backlog for processing at a later
        time.
    """
    STATE_UNSPECIFIED = 0
    ACTIVE = 1
    SUCCEEDED = 2
    FAILED = 3
    CANCELLED = 4
    UNAVAILABLE = 5
    QUEUED = 6

  argument = _messages.StringField(1)
  endTime = _messages.StringField(2)
  error = _messages.StringField(3)
  name = _messages.StringField(4)
  result = _messages.StringField(5)
  startTime = _messages.StringField(6)
  state = _messages.EnumField('StateValueValuesEnum', 7)
  workflowVersionId = _messages.IntegerField(8)


class ListExecutionsResponse(_messages.Message):
  r"""Response for the `ListExecutions` method.

  Fields:
    executions: The workflow executions which match the request.
    nextPageToken: If not empty, indicates that there may be more workflow
      executions that match the request; this value should be passed in a new
      cloud.eventworkflows.v1alpha.ListWorkflowExecutionsRequest to get more
      workflows.
  """

  executions = _messages.MessageField('Execution', 1, repeated=True)
  nextPageToken = _messages.StringField(2)


class StandardQueryParameters(_messages.Message):
  r"""Query parameters accepted by all methods.

  Enums:
    FXgafvValueValuesEnum: V1 error format.
    AltValueValuesEnum: Data format for response.

  Fields:
    f__xgafv: V1 error format.
    access_token: OAuth access token.
    alt: Data format for response.
    callback: JSONP
    fields: Selector specifying which fields to include in a partial response.
    key: API key. Your API key identifies your project and provides you with
      API access, quota, and reports. Required unless you provide an OAuth 2.0
      token.
    oauth_token: OAuth 2.0 token for the current user.
    prettyPrint: Returns response with indentations and line breaks.
    quotaUser: Available to use for quota purposes for server-side
      applications. Can be any arbitrary string assigned to a user, but should
      not exceed 40 characters.
    trace: A tracing token of the form "token:<tokenid>" to include in api
      requests.
    uploadType: Legacy upload protocol for media (e.g. "media", "multipart").
    upload_protocol: Upload protocol for media (e.g. "raw", "multipart").
  """

  class AltValueValuesEnum(_messages.Enum):
    r"""Data format for response.

    Values:
      json: Responses with Content-Type of application/json
      media: Media download with context-dependent Content-Type
      proto: Responses with Content-Type of application/x-protobuf
    """
    json = 0
    media = 1
    proto = 2

  class FXgafvValueValuesEnum(_messages.Enum):
    r"""V1 error format.

    Values:
      _1: v1 error format
      _2: v2 error format
    """
    _1 = 0
    _2 = 1

  f__xgafv = _messages.EnumField('FXgafvValueValuesEnum', 1)
  access_token = _messages.StringField(2)
  alt = _messages.EnumField('AltValueValuesEnum', 3, default='json')
  callback = _messages.StringField(4)
  fields = _messages.StringField(5)
  key = _messages.StringField(6)
  oauth_token = _messages.StringField(7)
  prettyPrint = _messages.BooleanField(8, default=True)
  quotaUser = _messages.StringField(9)
  trace = _messages.StringField(10)
  uploadType = _messages.StringField(11)
  upload_protocol = _messages.StringField(12)


class WorkflowexecutionsProjectsLocationsWorkflowsExecutionsCancelRequest(_messages.Message):
  r"""A WorkflowexecutionsProjectsLocationsWorkflowsExecutionsCancelRequest
  object.

  Fields:
    cancelExecutionRequest: A CancelExecutionRequest resource to be passed as
      the request body.
    name: Required. Name of the workflow execution which should be cancelled.
      "projects/project1/locations/us-
      central1/workflows/workflow1/executions/execution1"
  """

  cancelExecutionRequest = _messages.MessageField('CancelExecutionRequest', 1)
  name = _messages.StringField(2, required=True)


class WorkflowexecutionsProjectsLocationsWorkflowsExecutionsCreateRequest(_messages.Message):
  r"""A WorkflowexecutionsProjectsLocationsWorkflowsExecutionsCreateRequest
  object.

  Fields:
    execution: A Execution resource to be passed as the request body.
    parent: Required. Name of the workflow for which an execution should be
      created, for example, "projects/project1/locations/us-
      central1/workflows/workflow1".
  """

  execution = _messages.MessageField('Execution', 1)
  parent = _messages.StringField(2, required=True)


class WorkflowexecutionsProjectsLocationsWorkflowsExecutionsGetRequest(_messages.Message):
  r"""A WorkflowexecutionsProjectsLocationsWorkflowsExecutionsGetRequest
  object.

  Fields:
    name: Required. Name of the workflow execution which information should be
      retrieved, for example, "projects/project1/locations/us-
      central1/workflows/workflow1/executions/execution1"
  """

  name = _messages.StringField(1, required=True)


class WorkflowexecutionsProjectsLocationsWorkflowsExecutionsListRequest(_messages.Message):
  r"""A WorkflowexecutionsProjectsLocationsWorkflowsExecutionsListRequest
  object.

  Fields:
    filter: The filter expression.
    pageSize: Maximum number of workflow executions to return per call.
    pageToken: The value returned by the last `ListExecutionsResponse`
      indicates that this is a continuation of a prior `ListExecutions` call,
      and that the system should return the next page of data.
    parent: Required. Name of the workflow from which the executions should be
      listed, for example, "projects/project1/locations/us-
      central1/workflows/workflow1".
  """

  filter = _messages.StringField(1)
  pageSize = _messages.IntegerField(2, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(3)
  parent = _messages.StringField(4, required=True)


encoding.AddCustomJsonFieldMapping(
    StandardQueryParameters, 'f__xgafv', '$.xgafv')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_1', '1')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_2', '2')
