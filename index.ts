import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";

// Get configuration values
const config = new pulumi.Config();

/**
 * These variables will be added through environment variables.
 */
const frontendPort = config.requireNumber("frontendPort");
const backendPort = config.requireNumber("backendPort");
const mongoPort = config.requireNumber("mongoPort");

const stack = pulumi.getStack();

const backendImageName = "backend";
const frontendImageName = "frontend";
const databaseImageName = "mongoImage";

// Pull the backend image
const backend = new docker.RemoteImage(`${backendImageName}Image`, {
  // the name of the remote image to pull down
  name: "pulumi/tutorial-pulumi-fundamentals-backend:latest",
});

// Pull the frontend image
const frontend = new docker.RemoteImage(`${frontendImageName}Image`, {
  name: "pulumi/tutorial-pulumi-fundamentals-frontend:latest",
});

// Pull the MongoDB image
const mongoImage = new docker.RemoteImage(databaseImageName, {
  name: "pulumi/tutorial-pulumi-fundamentals-database-local:latest",
});
