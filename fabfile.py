#!/usr/bin/env python

from fabric.api import local

project_dir = '/Users/tom/Projects/Meteor/Microscope'

def commit_and_push_all(msg):
    local("cd " + project_dir)
    local('git commit -am "' + msg + '"')
    local('git pull github master')
    local('git pull bitbucket master')
    local('git push all master')
