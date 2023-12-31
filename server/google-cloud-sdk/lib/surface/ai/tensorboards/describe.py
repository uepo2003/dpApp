# -*- coding: utf-8 -*- #
# Copyright 2021 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Command to get a Tensorboard in Vertex AI."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.ai.tensorboards import client
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.ai import constants
from googlecloudsdk.command_lib.ai import endpoint_util
from googlecloudsdk.command_lib.ai import flags


def _Run(args, version):
  tensorboard_ref = args.CONCEPTS.tensorboard.Parse()
  region = tensorboard_ref.AsDict()['locationsId']
  with endpoint_util.AiplatformEndpointOverrides(
      version=version, region=region):
    response = client.TensorboardsClient(version=version).Get(tensorboard_ref)
    return response


@base.ReleaseTracks(base.ReleaseTrack.GA)
class DescribeGa(base.DescribeCommand):
  """Gets detailed Tensorboard information about the given Tensorboard id."""

  detailed_help = {
      'EXAMPLES':
          """\
          To describe a Tensorboard `12345` in region `us-central1` and project `my-project`:

              $ {command} projects/my-project/locations/us-central1/tensorboards/12345

          Or with flags:

              $ {command} 12345
          """,
  }

  @staticmethod
  def Args(parser):
    flags.AddTensorboardResourceArg(parser, 'to describe')

  def Run(self, args):
    return _Run(args, constants.GA_VERSION)


@base.ReleaseTracks(base.ReleaseTrack.BETA, base.ReleaseTrack.ALPHA)
class DescribeBeta(base.DescribeCommand):
  """Gets detailed Tensorboard information about the given Tensorboard id."""

  detailed_help = {
      'EXAMPLES':
          """\
          To describe a Tensorboard `12345` in region `us-central1` and project `my-project`:

              $ {command} projects/my-project/locations/us-central1/tensorboards/12345

          Or with flags:

              $ {command} 12345
          """,
  }

  @staticmethod
  def Args(parser):
    flags.AddTensorboardResourceArg(parser, 'to describe')

  def Run(self, args):
    return _Run(args, constants.BETA_VERSION)
