# -*- coding: utf-8 -*- #
# Copyright 2023 Google LLC. All Rights Reserved.
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

"""Submit a Flink job to a cluster."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.dataproc import util
from googlecloudsdk.command_lib.dataproc.jobs import flink
from googlecloudsdk.command_lib.dataproc.jobs import submitter


class Flink(flink.FlinkBase, submitter.JobSubmitter):
  # pylint: disable=line-too-long
  r"""Submit a Flink job to a cluster.

  Submit a Flink job to a cluster.

  ## EXAMPLES

  To submit a Flink job that runs the main class of a jar, run:

    $ {command} --cluster=my-cluster --region=us-central1 --jar=my_jar.jar -- arg1 arg2

  To submit a Flink job that runs a specific class as an entrypoint:

    $ {command} --cluster=my-cluster --region=us-central1  --class=org.my.main.Class  \
      --jars=my_jar.jar -- arg1 arg2

  To submit a Flink job that runs a jar that is on the cluster, run:

    $ {command} --cluster=my-cluster --region=us-central1 \
        --jar=/usr/lib/flink/examples/streaming/TopSpeedWindowing.jar

  """
  # pylint: enable=line-too-long

  @staticmethod
  def Args(parser):
    flink.FlinkBase.Args(parser)
    submitter.JobSubmitter.Args(parser)
    driver_group = parser.add_argument_group(required=True, mutex=True)
    util.AddJvmDriverFlags(driver_group)

  def ConfigureJob(self, messages, job, args):
    flink.FlinkBase.ConfigureJob(
        messages,
        job,
        self.files_by_type,
        self.BuildLoggingConfig(messages, args.driver_log_levels),
        args,
    )
    submitter.JobSubmitter.ConfigureJob(messages, job, args)
