# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

Vagrant.require_version '>= 2.1'

VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Read YAML config
  host_project_dir = File.dirname(__FILE__)
  project_config = YAML.load_file("#{host_project_dir}/config.yml")

  PROJECT_NAME = project_config['vagrant']['project-name']
  PROJECT_DIR = project_config['vagrant']['project-root-dir'] + PROJECT_NAME
  MACHINE_IP_ADDRESS = project_config['vagrant']['machine-ip-address']
  VAGRANT_BOX_NAME = project_config['vagrant']['box-name']
  SHELL_PROVISIONING_RELATIVE_DIR = project_config['vagrant']['provisioning']['shell-dir-relative-path']

  # Install plugins if missing
  required_plugins = %w(vagrant-vbguest vagrant-hostmanager)
  plugins_to_install = required_plugins.select {|plugin| not Vagrant.has_plugin? plugin}
  if plugins_to_install.any?
    puts "Installing plugins: #{plugins_to_install.join(' ')}"
    if system "vagrant plugin install #{plugins_to_install.join(' ')}"
      exec "vagrant #{ARGV.join(' ')}"
    else
      abort 'Installation of one or more plugins has failed. Aborting.'
    end
  end

  # Configure hosts
  if Vagrant.has_plugin?('vagrant-hostmanager')
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.manage_guest = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.aliases = "#{PROJECT_NAME}.local"
  end

  # Set auto_update to false, if you do NOT want to check the correct virtual-box-guest-additions version when booting VM
  if Vagrant.has_plugin?('vagrant-vbguest')
    config.vbguest.auto_update = false
  end

  # It works also to define the vagrant machine name like this and then use the "config" variable instead of "vm_config"
  # config.vm.define PROJECT_NAME

  # Configure vagrant machine
  config.vm.define "#{PROJECT_NAME}-vagrant", primary: true do |vm_config|
    vm_config.vm.box = VAGRANT_BOX_NAME
    vm_config.vm.box_check_update = true
    vm_config.vm.provider 'virtualbox' do |vb|
      vb.name = "#{PROJECT_NAME}-VM"
      vb.cpus = 2
      vb.memory = 4096
    end

    vm_config.vm.hostname = PROJECT_NAME
    vm_config.vm.network 'private_network', ip: MACHINE_IP_ADDRESS

    vm_config.ssh.insert_key = false

    vm_config.vm.synced_folder '.', '/vagrant', disabled: true
    vm_config.vm.synced_folder '.', PROJECT_DIR, create: true

    # Run vagrant provisioners
    vm_config.vm.provision 'install-packages',
      type: 'shell',
      run: 'once',
      args: ["#{PROJECT_DIR}", "#{SHELL_PROVISIONING_RELATIVE_DIR}"],
      path: "#{SHELL_PROVISIONING_RELATIVE_DIR}/install-packages.sh"

  end
end
