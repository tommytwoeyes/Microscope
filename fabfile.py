#!/usr/bin/env python

from fabric.api import local

project_dir		= '/Users/tom/Projects/Meteor/Microscope'


def commit_pull_push_all(msg):
	local("cd " + project_dir)
	local('git commit -am "' + msg + '"')
	local('git pull github master')
	local('git pull bitbucket master')
	local('git push all master')


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