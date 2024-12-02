import { Injectable, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";

@Injectable()
export class RouteRegisterService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector
  ) {}

  private registeredPaths: any[] = [];

  async onModuleInit() {
    // Get all registered controllers in the application
    const controllers = this.discoveryService.getControllers();

    for (const wrapper of controllers) {
      const { instance } = wrapper;

      if (instance) {
        const controllerPath = Reflect.getMetadata(
          "path",
          instance.constructor
        );

        this.metadataScanner
          .getAllMethodNames(instance)
          .forEach((methodName) => {
            // console.log(methodName);
            const method = instance[methodName];
            const routePath = Reflect.getMetadata("path", method);

            if (controllerPath && routePath) {
              const fullPath = `${controllerPath}${routePath}`;

              console.log("fullPath = ", fullPath);

              // Sync route with Kong
              this.syncRouteWithKong({
                route: fullPath,
                upstreamName: "auth-service",
              });
            }
          });
      }
    }
  }

  private syncRouteWithKong(data: { route: string; upstreamName: string }) {
    this.registeredPaths.push(data);

    console.log(data);
  }
}
