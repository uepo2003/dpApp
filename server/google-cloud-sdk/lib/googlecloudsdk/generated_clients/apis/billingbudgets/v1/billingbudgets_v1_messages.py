"""Generated message classes for billingbudgets version v1.

The Cloud Billing Budget API stores Cloud Billing budgets, which define a
budget plan and the rules to execute as spend is tracked against that plan.
"""
# NOTE: This file is autogenerated and should not be edited by hand.

from __future__ import absolute_import

from apitools.base.protorpclite import messages as _messages
from apitools.base.py import encoding
from apitools.base.py import extra_types


package = 'billingbudgets'


class BillingbudgetsBillingAccountsBudgetsCreateRequest(_messages.Message):
  r"""A BillingbudgetsBillingAccountsBudgetsCreateRequest object.

  Fields:
    googleCloudBillingBudgetsV1Budget: A GoogleCloudBillingBudgetsV1Budget
      resource to be passed as the request body.
    parent: Required. The name of the billing account to create the budget in.
      Values are of the form `billingAccounts/{billingAccountId}`.
  """

  googleCloudBillingBudgetsV1Budget = _messages.MessageField('GoogleCloudBillingBudgetsV1Budget', 1)
  parent = _messages.StringField(2, required=True)


class BillingbudgetsBillingAccountsBudgetsDeleteRequest(_messages.Message):
  r"""A BillingbudgetsBillingAccountsBudgetsDeleteRequest object.

  Fields:
    name: Required. Name of the budget to delete. Values are of the form
      `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
  """

  name = _messages.StringField(1, required=True)


class BillingbudgetsBillingAccountsBudgetsGetRequest(_messages.Message):
  r"""A BillingbudgetsBillingAccountsBudgetsGetRequest object.

  Fields:
    name: Required. Name of budget to get. Values are of the form
      `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
  """

  name = _messages.StringField(1, required=True)


class BillingbudgetsBillingAccountsBudgetsListRequest(_messages.Message):
  r"""A BillingbudgetsBillingAccountsBudgetsListRequest object.

  Fields:
    pageSize: Optional. The maximum number of budgets to return per page. The
      default and maximum value are 100.
    pageToken: Optional. The value returned by the last `ListBudgetsResponse`
      which indicates that this is a continuation of a prior `ListBudgets`
      call, and that the system should return the next page of data.
    parent: Required. Name of billing account to list budgets under. Values
      are of the form `billingAccounts/{billingAccountId}`.
    scope: Optional. Set the scope of the budgets to be returned, in the
      format of the resource name. The scope of a budget is the cost that it
      tracks, such as costs for a single project, or the costs for all
      projects in a folder. Only project scope (in the format of
      "projects/project-id" or "projects/123") is supported in this field.
      When this field is set to a project's resource name, the budgets
      returned are tracking the costs for that project.
  """

  pageSize = _messages.IntegerField(1, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(2)
  parent = _messages.StringField(3, required=True)
  scope = _messages.StringField(4)


class BillingbudgetsBillingAccountsBudgetsPatchRequest(_messages.Message):
  r"""A BillingbudgetsBillingAccountsBudgetsPatchRequest object.

  Fields:
    googleCloudBillingBudgetsV1Budget: A GoogleCloudBillingBudgetsV1Budget
      resource to be passed as the request body.
    name: Output only. Resource name of the budget. The resource name implies
      the scope of a budget. Values are of the form
      `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
    updateMask: Optional. Indicates which fields in the provided budget to
      update. Read-only fields (such as `name`) cannot be changed. If this is
      not provided, then only fields with non-default values from the request
      are updated. See https://developers.google.com/protocol-
      buffers/docs/proto3#default for more details about default values.
  """

  googleCloudBillingBudgetsV1Budget = _messages.MessageField('GoogleCloudBillingBudgetsV1Budget', 1)
  name = _messages.StringField(2, required=True)
  updateMask = _messages.StringField(3)


class GoogleCloudBillingBudgetsV1Budget(_messages.Message):
  r"""A budget is a plan that describes what you expect to spend on Cloud
  projects, plus the rules to execute as spend is tracked against that plan,
  (for example, send an alert when 90% of the target spend is met). The budget
  time period is configurable, with options such as month (default), quarter,
  year, or custom time period.

  Fields:
    amount: Required. Budgeted amount.
    budgetFilter: Optional. Filters that define which resources are used to
      compute the actual spend against the budget amount, such as projects,
      services, and the budget's time period, as well as other filters.
    displayName: User data for display name in UI. The name must be less than
      or equal to 60 characters.
    etag: Optional. Etag to validate that the object is unchanged for a read-
      modify-write operation. An empty etag causes an update to overwrite
      other changes.
    name: Output only. Resource name of the budget. The resource name implies
      the scope of a budget. Values are of the form
      `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
    notificationsRule: Optional. Rules to apply to notifications sent based on
      budget spend and thresholds.
    thresholdRules: Optional. Rules that trigger alerts (notifications of
      thresholds being crossed) when spend exceeds the specified percentages
      of the budget. Optional for `pubsubTopic` notifications. Required if
      using email notifications.
  """

  amount = _messages.MessageField('GoogleCloudBillingBudgetsV1BudgetAmount', 1)
  budgetFilter = _messages.MessageField('GoogleCloudBillingBudgetsV1Filter', 2)
  displayName = _messages.StringField(3)
  etag = _messages.StringField(4)
  name = _messages.StringField(5)
  notificationsRule = _messages.MessageField('GoogleCloudBillingBudgetsV1NotificationsRule', 6)
  thresholdRules = _messages.MessageField('GoogleCloudBillingBudgetsV1ThresholdRule', 7, repeated=True)


class GoogleCloudBillingBudgetsV1BudgetAmount(_messages.Message):
  r"""The budgeted amount for each usage period.

  Fields:
    lastPeriodAmount: Use the last period's actual spend as the budget for the
      present period. LastPeriodAmount can only be set when the budget's time
      period is a Filter.calendar_period. It cannot be set in combination with
      Filter.custom_period.
    specifiedAmount: A specified amount to use as the budget. `currency_code`
      is optional. If specified when creating a budget, it must match the
      currency of the billing account. If specified when updating a budget, it
      must match the currency_code of the existing budget. The `currency_code`
      is provided on output.
  """

  lastPeriodAmount = _messages.MessageField('GoogleCloudBillingBudgetsV1LastPeriodAmount', 1)
  specifiedAmount = _messages.MessageField('GoogleTypeMoney', 2)


class GoogleCloudBillingBudgetsV1CustomPeriod(_messages.Message):
  r"""All date times begin at 12 AM US and Canadian Pacific Time (UTC-8).

  Fields:
    endDate: Optional. The end date of the time period. Budgets with elapsed
      end date won't be processed. If unset, specifies to track all usage
      incurred since the start_date.
    startDate: Required. The start date must be after January 1, 2017.
  """

  endDate = _messages.MessageField('GoogleTypeDate', 1)
  startDate = _messages.MessageField('GoogleTypeDate', 2)


class GoogleCloudBillingBudgetsV1Filter(_messages.Message):
  r"""A filter for a budget, limiting the scope of the cost to calculate.

  Enums:
    CalendarPeriodValueValuesEnum: Optional. Specifies to track usage for
      recurring calendar period. For example, assume that
      CalendarPeriod.QUARTER is set. The budget tracks usage from April 1 to
      June 30, when the current calendar month is April, May, June. After
      that, it tracks usage from July 1 to September 30 when the current
      calendar month is July, August, September, so on.
    CreditTypesTreatmentValueValuesEnum: Optional. If not set, default
      behavior is `INCLUDE_ALL_CREDITS`.

  Messages:
    LabelsValue: Optional. A single label and value pair specifying that usage
      from only this set of labeled resources should be included in the
      budget. If omitted, the report includes all labeled and unlabeled usage.
      An object containing a single `"key": value` pair. Example: `{ "name":
      "wrench" }`. _Currently, multiple entries or multiple values per entry
      are not allowed._

  Fields:
    calendarPeriod: Optional. Specifies to track usage for recurring calendar
      period. For example, assume that CalendarPeriod.QUARTER is set. The
      budget tracks usage from April 1 to June 30, when the current calendar
      month is April, May, June. After that, it tracks usage from July 1 to
      September 30 when the current calendar month is July, August, September,
      so on.
    creditTypes: Optional. If Filter.credit_types_treatment is
      INCLUDE_SPECIFIED_CREDITS, this is a list of credit types to be
      subtracted from gross cost to determine the spend for threshold
      calculations. See [a list of acceptable credit type
      values](https://cloud.google.com/billing/docs/how-to/export-data-
      bigquery-tables#credits-type). If Filter.credit_types_treatment is
      **not** INCLUDE_SPECIFIED_CREDITS, this field must be empty.
    creditTypesTreatment: Optional. If not set, default behavior is
      `INCLUDE_ALL_CREDITS`.
    customPeriod: Optional. Specifies to track usage from any start date
      (required) to any end date (optional). This time period is static, it
      does not recur.
    labels: Optional. A single label and value pair specifying that usage from
      only this set of labeled resources should be included in the budget. If
      omitted, the report includes all labeled and unlabeled usage. An object
      containing a single `"key": value` pair. Example: `{ "name": "wrench"
      }`. _Currently, multiple entries or multiple values per entry are not
      allowed._
    projects: Optional. A set of projects of the form `projects/{project}`,
      specifying that usage from only this set of projects should be included
      in the budget. If omitted, the report includes all usage for the billing
      account, regardless of which project the usage occurred on.
    resourceAncestors: Optional. A set of folder and organization names of the
      form `folders/{folderId}` or `organizations/{organizationId}`,
      specifying that usage from only this set of folders and organizations
      should be included in the budget. If omitted, the budget includes all
      usage that the billing account pays for. If the folder or organization
      contains projects that are paid for by a different Cloud Billing
      account, the budget *doesn't* apply to those projects.
    services: Optional. A set of services of the form `services/{service_id}`,
      specifying that usage from only this set of services should be included
      in the budget. If omitted, the report includes usage for all the
      services. The service names are available through the Catalog API:
      https://cloud.google.com/billing/v1/how-tos/catalog-api.
    subaccounts: Optional. A set of subaccounts of the form
      `billingAccounts/{account_id}`, specifying that usage from only this set
      of subaccounts should be included in the budget. If a subaccount is set
      to the name of the parent account, usage from the parent account is
      included. If the field is omitted, the report includes usage from the
      parent account and all subaccounts, if they exist.
  """

  class CalendarPeriodValueValuesEnum(_messages.Enum):
    r"""Optional. Specifies to track usage for recurring calendar period. For
    example, assume that CalendarPeriod.QUARTER is set. The budget tracks
    usage from April 1 to June 30, when the current calendar month is April,
    May, June. After that, it tracks usage from July 1 to September 30 when
    the current calendar month is July, August, September, so on.

    Values:
      CALENDAR_PERIOD_UNSPECIFIED: Calendar period is unset. This is the
        default if the budget is for a custom time period (CustomPeriod).
      MONTH: A month. Month starts on the first day of each month, such as
        January 1, February 1, March 1, and so on.
      QUARTER: A quarter. Quarters start on dates January 1, April 1, July 1,
        and October 1 of each year.
      YEAR: A year. Year starts on January 1.
    """
    CALENDAR_PERIOD_UNSPECIFIED = 0
    MONTH = 1
    QUARTER = 2
    YEAR = 3

  class CreditTypesTreatmentValueValuesEnum(_messages.Enum):
    r"""Optional. If not set, default behavior is `INCLUDE_ALL_CREDITS`.

    Values:
      CREDIT_TYPES_TREATMENT_UNSPECIFIED: <no description>
      INCLUDE_ALL_CREDITS: All types of credit are subtracted from the gross
        cost to determine the spend for threshold calculations.
      EXCLUDE_ALL_CREDITS: All types of credit are added to the net cost to
        determine the spend for threshold calculations.
      INCLUDE_SPECIFIED_CREDITS: [Credit
        types](https://cloud.google.com/billing/docs/how-to/export-data-
        bigquery-tables#credits-type) specified in the credit_types field are
        subtracted from the gross cost to determine the spend for threshold
        calculations.
    """
    CREDIT_TYPES_TREATMENT_UNSPECIFIED = 0
    INCLUDE_ALL_CREDITS = 1
    EXCLUDE_ALL_CREDITS = 2
    INCLUDE_SPECIFIED_CREDITS = 3

  @encoding.MapUnrecognizedFields('additionalProperties')
  class LabelsValue(_messages.Message):
    r"""Optional. A single label and value pair specifying that usage from
    only this set of labeled resources should be included in the budget. If
    omitted, the report includes all labeled and unlabeled usage. An object
    containing a single `"key": value` pair. Example: `{ "name": "wrench" }`.
    _Currently, multiple entries or multiple values per entry are not
    allowed._

    Messages:
      AdditionalProperty: An additional property for a LabelsValue object.

    Fields:
      additionalProperties: Additional properties of type LabelsValue
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a LabelsValue object.

      Fields:
        key: Name of the additional property.
        value: A extra_types.JsonValue attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('extra_types.JsonValue', 2, repeated=True)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  calendarPeriod = _messages.EnumField('CalendarPeriodValueValuesEnum', 1)
  creditTypes = _messages.StringField(2, repeated=True)
  creditTypesTreatment = _messages.EnumField('CreditTypesTreatmentValueValuesEnum', 3)
  customPeriod = _messages.MessageField('GoogleCloudBillingBudgetsV1CustomPeriod', 4)
  labels = _messages.MessageField('LabelsValue', 5)
  projects = _messages.StringField(6, repeated=True)
  resourceAncestors = _messages.StringField(7, repeated=True)
  services = _messages.StringField(8, repeated=True)
  subaccounts = _messages.StringField(9, repeated=True)


class GoogleCloudBillingBudgetsV1LastPeriodAmount(_messages.Message):
  r"""Describes a budget amount targeted to the last Filter.calendar_period
  spend. At this time, the amount is automatically 100% of the last calendar
  period's spend; that is, there are no other options yet. LastPeriodAmount
  cannot be set for a budget configured with a Filter.custom_period.
  """



class GoogleCloudBillingBudgetsV1ListBudgetsResponse(_messages.Message):
  r"""Response for ListBudgets

  Fields:
    budgets: List of the budgets owned by the requested billing account.
    nextPageToken: If not empty, indicates that there may be more budgets that
      match the request; this value should be passed in a new
      `ListBudgetsRequest`.
  """

  budgets = _messages.MessageField('GoogleCloudBillingBudgetsV1Budget', 1, repeated=True)
  nextPageToken = _messages.StringField(2)


class GoogleCloudBillingBudgetsV1NotificationsRule(_messages.Message):
  r"""NotificationsRule defines notifications that are sent based on budget
  spend and thresholds.

  Fields:
    disableDefaultIamRecipients: Optional. When set to true, disables default
      notifications sent when a threshold is exceeded. Default notifications
      are sent to those with Billing Account Administrator and Billing Account
      User IAM roles for the target account.
    enableProjectLevelRecipients: Optional. When set to true, and when the
      budget has a single project configured, notifications will be sent to
      project level recipients of that project. This field will be ignored if
      the budget has multiple or no project configured. Currently, project
      level recipients are the users with `Owner` role on a cloud project.
    monitoringNotificationChannels: Optional. Email targets to send
      notifications to when a threshold is exceeded. This is in addition to
      the `DefaultIamRecipients` who receive alert emails based on their
      billing account IAM role. The value is the full REST resource name of a
      Cloud Monitoring email notification channel with the form
      `projects/{project_id}/notificationChannels/{channel_id}`. A maximum of
      5 email notifications are allowed. To customize budget alert email
      recipients with monitoring notification channels, you _must create the
      monitoring notification channels before you link them to a budget_. For
      guidance on setting up notification channels to use with budgets, see
      [Customize budget alert email
      recipients](https://cloud.google.com/billing/docs/how-to/budgets-
      notification-recipients). For Cloud Billing budget alerts, you _must use
      email notification channels_. The other types of notification channels
      are _not_ supported, such as Slack, SMS, or PagerDuty. If you want to
      [send budget notifications to
      Slack](https://cloud.google.com/billing/docs/how-
      to/notify#send_notifications_to_slack), use a pubsubTopic and configure
      [programmatic notifications](https://cloud.google.com/billing/docs/how-
      to/budgets-programmatic-notifications).
    pubsubTopic: Optional. The name of the Pub/Sub topic where budget-related
      messages are published, in the form
      `projects/{project_id}/topics/{topic_id}`. Updates are sent to the topic
      at regular intervals; the timing of the updates is not dependent on the
      [threshold rules](#thresholdrule) you've set. Note that if you want your
      [Pub/Sub JSON object](https://cloud.google.com/billing/docs/how-
      to/budgets-programmatic-notifications#notification_format) to contain
      data for `alertThresholdExceeded`, you need at least one [alert
      threshold rule](#thresholdrule). When you set threshold rules, you must
      also enable at least one of the email notification options, either using
      the default IAM recipients or Cloud Monitoring email notification
      channels. To use Pub/Sub topics with budgets, you must do the following:
      1. Create the Pub/Sub topic before connecting it to your budget. For
      guidance, see [Manage programmatic budget alert
      notifications](https://cloud.google.com/billing/docs/how-to/budgets-
      programmatic-notifications). 2. Grant the API caller the
      `pubsub.topics.setIamPolicy` permission on the Pub/Sub topic. If not
      set, the API call fails with PERMISSION_DENIED. For additional details
      on Pub/Sub roles and permissions, see [Permissions required for this
      task](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-
      notifications#permissions_required_for_this_task).
    schemaVersion: Optional. Required when NotificationsRule.pubsub_topic is
      set. The schema version of the notification sent to
      NotificationsRule.pubsub_topic. Only "1.0" is accepted. It represents
      the JSON schema as defined in https://cloud.google.com/billing/docs/how-
      to/budgets-programmatic-notifications#notification_format.
  """

  disableDefaultIamRecipients = _messages.BooleanField(1)
  enableProjectLevelRecipients = _messages.BooleanField(2)
  monitoringNotificationChannels = _messages.StringField(3, repeated=True)
  pubsubTopic = _messages.StringField(4)
  schemaVersion = _messages.StringField(5)


class GoogleCloudBillingBudgetsV1ThresholdRule(_messages.Message):
  r"""ThresholdRule contains the definition of a threshold. Threshold rules
  define the triggering events used to generate a budget notification email.
  When a threshold is crossed (spend exceeds the specified percentages of the
  budget), budget alert emails are sent to the email recipients you specify in
  the [NotificationsRule](#notificationsrule). Threshold rules also affect the
  fields included in the [JSON data
  object](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-
  notifications#notification_format) sent to a Pub/Sub topic. Threshold rules
  are _required_ if using email notifications. Threshold rules are _optional_
  if only setting a [`pubsubTopic` NotificationsRule](#NotificationsRule),
  unless you want your JSON data object to include data about the thresholds
  you set. For more information, see [set budget threshold rules and
  actions](https://cloud.google.com/billing/docs/how-to/budgets#budget-
  actions).

  Enums:
    SpendBasisValueValuesEnum: Optional. The type of basis used to determine
      if spend has passed the threshold. Behavior defaults to CURRENT_SPEND if
      not set.

  Fields:
    spendBasis: Optional. The type of basis used to determine if spend has
      passed the threshold. Behavior defaults to CURRENT_SPEND if not set.
    thresholdPercent: Required. Send an alert when this threshold is exceeded.
      This is a 1.0-based percentage, so 0.5 = 50%. Validation: non-negative
      number.
  """

  class SpendBasisValueValuesEnum(_messages.Enum):
    r"""Optional. The type of basis used to determine if spend has passed the
    threshold. Behavior defaults to CURRENT_SPEND if not set.

    Values:
      BASIS_UNSPECIFIED: Unspecified threshold basis.
      CURRENT_SPEND: Use current spend as the basis for comparison against the
        threshold.
      FORECASTED_SPEND: Use forecasted spend for the period as the basis for
        comparison against the threshold. FORECASTED_SPEND can only be set
        when the budget's time period is a Filter.calendar_period. It cannot
        be set in combination with Filter.custom_period.
    """
    BASIS_UNSPECIFIED = 0
    CURRENT_SPEND = 1
    FORECASTED_SPEND = 2

  spendBasis = _messages.EnumField('SpendBasisValueValuesEnum', 1)
  thresholdPercent = _messages.FloatField(2)


class GoogleProtobufEmpty(_messages.Message):
  r"""A generic empty message that you can re-use to avoid defining duplicated
  empty messages in your APIs. A typical example is to use it as the request
  or the response type of an API method. For instance: service Foo { rpc
  Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
  """



class GoogleTypeDate(_messages.Message):
  r"""Represents a whole or partial calendar date, such as a birthday. The
  time of day and time zone are either specified elsewhere or are
  insignificant. The date is relative to the Gregorian Calendar. This can
  represent one of the following: * A full date, with non-zero year, month,
  and day values. * A month and day, with a zero year (for example, an
  anniversary). * A year on its own, with a zero month and a zero day. * A
  year and month, with a zero day (for example, a credit card expiration
  date). Related types: * google.type.TimeOfDay * google.type.DateTime *
  google.protobuf.Timestamp

  Fields:
    day: Day of a month. Must be from 1 to 31 and valid for the year and
      month, or 0 to specify a year by itself or a year and month where the
      day isn't significant.
    month: Month of a year. Must be from 1 to 12, or 0 to specify a year
      without a month and day.
    year: Year of the date. Must be from 1 to 9999, or 0 to specify a date
      without a year.
  """

  day = _messages.IntegerField(1, variant=_messages.Variant.INT32)
  month = _messages.IntegerField(2, variant=_messages.Variant.INT32)
  year = _messages.IntegerField(3, variant=_messages.Variant.INT32)


class GoogleTypeMoney(_messages.Message):
  r"""Represents an amount of money with its currency type.

  Fields:
    currencyCode: The three-letter currency code defined in ISO 4217.
    nanos: Number of nano (10^-9) units of the amount. The value must be
      between -999,999,999 and +999,999,999 inclusive. If `units` is positive,
      `nanos` must be positive or zero. If `units` is zero, `nanos` can be
      positive, zero, or negative. If `units` is negative, `nanos` must be
      negative or zero. For example $-1.75 is represented as `units`=-1 and
      `nanos`=-750,000,000.
    units: The whole units of the amount. For example if `currencyCode` is
      `"USD"`, then 1 unit is one US dollar.
  """

  currencyCode = _messages.StringField(1)
  nanos = _messages.IntegerField(2, variant=_messages.Variant.INT32)
  units = _messages.IntegerField(3)


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


encoding.AddCustomJsonFieldMapping(
    StandardQueryParameters, 'f__xgafv', '$.xgafv')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_1', '1')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_2', '2')