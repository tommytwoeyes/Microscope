#!/usr/bin/env python

"""
This is a Fabric file [see http://www.fabfile.org/ for details].
Fabric is a Python command-line utility for automating tedious
deployment/build tasks, etc.

The purpose of this file is to remove some of the tedium of the
Git workflow for me in this project.
"""

from fabric.api import *

# Project configuration
project_dir							= '/Users/tom/Projects/JavaScript/Meteor/Microscope'
git_remote_bitbucket 		= 'bitbucket'
git_remote_github 			= 'github'
git_remote_combined 		= 'all'

def commit_pull_push(msg, branch='master'):
	"""
	Performs the following Git workflow:
	- Commits current state with message
	- Performs a `git pull`
	- Performs a `git push`

	Args:
		msg 		(str)	The commit message
		branch		(Optional[str]) The branch to pull/push to
	"""

	# Escape any quotes, newlines or other special chars in the commit message
	commit_cmd = """git commit -am '{0}'""".format(msg)
	pull_cmd_first = "git pull {0} {1}".format(git_remote_github, branch)
	pull_cmd_second = "git pull {0} {1}".format(git_remote_bitbucket, branch)
	push_cmd = "git push {0} {1}".format(git_remote_combined, branch)

	local( "cd {0}".format(project_dir) )
	local( commit_cmd )
	local( pull_cmd_first )
	local( pull_cmd_second )
	local( push_cmd )


def deploy(key_path):
	local("cd {0}/.deploy".format(project_dir))
	local('eval $(ssh-agent)')
	local("ssh-add {0}".format(key_path))
	local("mup deploy")

def start(key_path):
	local("cd {0}/.deploy".format(project_dir))
	print("Current working directory:")
	local('pwd')
	local('eval $(ssh-agent)')
	local("ssh-add {0}".format(key_path))
	local("mup start")

def stop(key_path):
	local("cd {0}/.deploy".format(project_dir))
	local('eval $(ssh-agent)')
	local("ssh-add {0}".format(key_path))
	local("mup stop")

def restart(key_path):
	local("cd {0}/.deploy".format(project_dir))
	local('eval $(ssh-agent)')
	local("ssh-add {0}".format(key_path))
	local("mup restart")