import * as pulumi from "@pulumi/pulumi";

export const loadConfig = () => {
  // Get configuration values
  const config = new pulumi.Config();
  /**
   * These variables will be added through environment variables.
   */
  const frontendPort = config.requireNumber("frontendPort");
  const backendPort = config.requireNumber("backendPort");
  const mongoPort = config.requireNumber("mongoPort");
  const mongoHost = config.require("mongoHost"); // Note that strings are the default, so it's not `config.requireString`, just `config.require`.
  const database = config.require("database");
  const nodeEnvironment = config.require("nodeEnvironment");
  const protocol = config.require("protocol");

  return {
    frontendPort,
    backendPort,
    mongoPort,
    mongoHost,
    database,
    nodeEnvironment,
    protocol,
  };
};
