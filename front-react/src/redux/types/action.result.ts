import ApplicationError from "./application.error.type";

export interface ActionResult extends ApplicationError {
  success: boolean;
}
