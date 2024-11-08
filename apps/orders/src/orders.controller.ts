import { Controller, Get, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Get(":orderId")
  public async getOrderById(@Param("orderId") orderId: string) {
    return {
      id: orderId,
      orderName: "test",
      userId: 100,
    };
  }
}
