# -*- coding: utf-8 -*- #
# Copyright 2022 Google LLC. All Rights Reserved.
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
"""Update GitLab Enterprise config command."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.cloudbuild import cloudbuild_util
from googlecloudsdk.api_lib.util import waiter
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.cloudbuild import gitlab_flags
from googlecloudsdk.command_lib.cloudbuild import resource_args
from googlecloudsdk.command_lib.util.concepts import concept_parsers
from googlecloudsdk.core import log
from googlecloudsdk.core import properties
from googlecloudsdk.core import resources


@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
class CreateAlpha(base.CreateCommand):
  """Update a GitLab Enterprise config for use by Cloud Build."""

  @staticmethod
  def Args(parser):
    """Register flags for this command.

    Args:
      parser: An argparse.ArgumentParser-like object. It is mocked out in order
        to capture some information, but behaves like an ArgumentParser.
    """
    concept_parsers.ConceptParser.ForResource(
        'CONFIG',
        resource_args.GetGitLabConfigResourceSpec(),
        'GitLab Enterprise config.',
        required=True).AddToParser(parser)

    parser = gitlab_flags.AddGitLabConfigUpdateArgs(parser)

  def Run(self, args):
    """This is what gets called when the user runs this command.

    Args:
      args: an argparse namespace. All the arguments that were provided to this
        command invocation.

    Returns:
      Some value that we want to have printed later.
    """

    client = cloudbuild_util.GetClientInstance()
    messages = cloudbuild_util.GetMessagesModule()
    config_id = args.CONFIG
    gitlab = cloudbuild_util.GitLabConfigFromArgs(args)

    parent = properties.VALUES.core.project.Get(required=True)

    # Get the GitLab Enterprise config ref
    gitlab_resource = resources.REGISTRY.Parse(
        None,
        collection='cloudbuild.projects.locations.gitLabConfigs',
        api_version='v1',
        params={
            'projectsId': parent,
            'locationsId': args.region,
            'gitLabConfigsId': config_id,
        })

    update_mask = cloudbuild_util.MessageToFieldPaths(gitlab)
    req = messages.CloudbuildProjectsLocationsGitLabConfigsPatchRequest(
        name=gitlab_resource.RelativeName(),
        gitLabConfig=gitlab,
        updateMask=','.join(update_mask))
    # Send the Update request
    updated_op = client.projects_locations_gitLabConfigs.Patch(req)
    op_resource = resources.REGISTRY.ParseRelativeName(
        updated_op.name, collection='cloudbuild.projects.locations.operations')

    updated_gitlab = waiter.WaitFor(
        waiter.CloudOperationPoller(client.projects_locations_gitLabConfigs,
                                    client.projects_locations_operations),
        op_resource, 'Updating GitLab Enterprise config')

    log.UpdatedResource(config_id, kind='enterprise_config')
    return updated_gitlab
